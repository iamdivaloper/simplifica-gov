import { normalizeData, NormalizedItem } from './ai-normalizer';
import {
    fetchCamaraDeputados,
    fetchSenadoFederal,
    fetchQueridoDiario,
    fetchBaseDosDados,
    fetchTSE,
    fetchCNJ
} from './external-apis';
import { unstable_cache } from "next/cache";

const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.simplificagov.com';
const PRIMARY_TIMEOUT_MS = 3000;

// Cached version of the data fetching function
const getCachedGovernmentData = unstable_cache(
    async (query: string) => {
        console.log(`[Cache Miss] Fetching fresh data for: "${query}"`);

        // 1. Try Primary API
        try {
            const primaryData = await fetchPrimaryApi(query);
            // The original logic returned normalized data directly if primary API succeeded.
            // Let's ensure primaryData is not empty before normalizing and returning.
            if (primaryData && primaryData.length > 0) {
                console.log('[DataService] Primary API success (within cache)');
                return await normalizeData(primaryData, query);
            }
        } catch (e) {
            console.warn("[DataService] Primary API failed or timed out (within cache). Trying secondary sources...", e);
        }

        // 2. Fallback to Secondary APIs (Parallel)
        const results = await Promise.allSettled([
            fetchCamaraDeputados(query), // Corrected API name
            fetchSenadoFederal(query),   // Corrected API name
            fetchQueridoDiario(query),
            fetchBaseDosDados(query),
            fetchTSE(query),
            fetchCNJ(query)
        ]);
        // Aggregate successful results
        const aggregatedData = results
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
    },
    ['government-data'],
    {
        revalidate: 3600, // 1 hour cache
        tags: ['government-data']
    }
);

export async function fetchGovernmentData(query: string): Promise<NormalizedItem[]> {
    return getCachedGovernmentData(query);
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
