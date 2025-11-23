import { normalizeData, NormalizedItem } from './ai-normalizer';
import {
    fetchCamaraDeputados,
    fetchSenadoFederal,
    fetchQueridoDiario,
    fetchBaseDosDados,
    fetchTSE,
    fetchCNJ
} from './external-apis';

const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.simplificagov.com';
const PRIMARY_TIMEOUT_MS = 3000;

export async function fetchGovernmentData(query: string): Promise<NormalizedItem[]> {
    console.log(`[DataService] Starting search for: "${query}"`);

    try {
        // 1. Attempt Primary API with timeout
        const primaryData = await fetchPrimaryApi(query);
        console.log('[DataService] Primary API success');
        return normalizeData(primaryData, query);
    } catch (error) {
        console.warn('[DataService] Primary API failed or timed out. Initiating fallback strategy.', error);

        // 2. Fallback: Parallel fetch from secondary sources
        const fallbackResults = await Promise.allSettled([
            fetchCamaraDeputados(query),
            fetchSenadoFederal(query),
            fetchQueridoDiario(query),
            fetchBaseDosDados(query),
            fetchTSE(query),
            fetchCNJ(query)
        ]);

        // Aggregate successful results
        const aggregatedData = fallbackResults
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<any>).value)
            .flatMap(res => res.data || []); // Flatten data arrays

        if (aggregatedData.length === 0) {
            console.error('[DataService] All sources failed.');
            return [];
        }

        console.log(`[DataService] Fallback success. Found ${aggregatedData.length} raw items. Normalizing...`);

        // 3. Normalize aggregated data with AI
        return normalizeData(aggregatedData, query);
    }
}

export async function fetchRecentProjects(): Promise<NormalizedItem[]> {
    // Strategy: Search for recent/common terms to populate the "feed"
    // In a real scenario, we would hit a "list" endpoint.
    const query = "projeto de lei educação saúde segurança";
    return fetchGovernmentData(query);
}

export async function fetchParlamentares(): Promise<NormalizedItem[]> {
    // Strategy: Search for "deputado" and "senador" to populate the list
    const query = "deputado senador";
    return fetchGovernmentData(query);
}

async function fetchPrimaryApi(query: string): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PRIMARY_TIMEOUT_MS);

    try {
        const response = await fetch(`${PRIMARY_API_URL}/search?q=${encodeURIComponent(query)}`, {
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Primary API responded with ${response.status}`);
        }

        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}
