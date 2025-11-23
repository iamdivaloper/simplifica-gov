'use server';

import { fetchGovernmentData } from '@/lib/data-service';
import { NormalizedItem } from '@/lib/ai-normalizer';

export type SearchResult =
    | { success: true; data: NormalizedItem[] }
    | { success: false; error: string };

export async function searchGovernmentData(query: string): Promise<SearchResult> {
    if (!query || query.trim().length < 2) {
        return { success: false, error: 'A busca deve ter pelo menos 2 caracteres.' };
    }

    try {
        const data = await fetchGovernmentData(query);
        return { success: true, data };
    } catch (error) {
        console.error('Server Action Error:', error);
        return {
            success: false,
            error: 'Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.'
        };
    }
}
