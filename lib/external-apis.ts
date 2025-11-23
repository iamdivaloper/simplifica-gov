export interface ExternalData {
    source: string;
    data: any;
}

export async function fetchCamaraDeputados(query: string): Promise<ExternalData> {
    try {
        const response = await fetch(
            `https://dadosabertos.camara.leg.br/api/v2/proposicoes?keywords=${encodeURIComponent(query)}&ordem=DESC&ordenarPor=id`,
            { headers: { Accept: 'application/json' } }
        );
        if (!response.ok) throw new Error('Camara API failed');
        const data = await response.json();
        return { source: 'Camara dos Deputados', data: data.dados };
    } catch (error) {
        console.error('Error fetching Camara:', error);
        return { source: 'Camara dos Deputados', data: [] };
    }
}

export async function fetchSenadoFederal(query: string): Promise<ExternalData> {
    try {
        // Senado API often requires specific headers or has different endpoints. 
        // Using a simplified search endpoint for demonstration.
        const response = await fetch(
            `https://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista?palavraChave=${encodeURIComponent(query)}`,
            { headers: { Accept: 'application/json' } }
        );
        if (!response.ok) throw new Error('Senado API failed');
        const data = await response.json();
        return { source: 'Senado Federal', data: data.PesquisaBasicaMateria?.Materia || [] };
    } catch (error) {
        console.error('Error fetching Senado:', error);
        return { source: 'Senado Federal', data: [] };
    }
}

// Mocked/Simplified implementations for other sources to avoid complex auth/setup in this demo
// In a real scenario, these would be full implementations
export async function fetchQueridoDiario(query: string): Promise<ExternalData> {
    // Simulating a fetch
    return {
        source: 'Querido Diário',
        data: [{ title: `Diário Oficial: ${query}`, date: new Date().toISOString() }]
    };
}

export async function fetchBaseDosDados(query: string): Promise<ExternalData> {
    return {
        source: 'Base dos Dados',
        data: [{ dataset: 'Eleições 2024', description: `Dados sobre ${query}` }]
    };
}

export async function fetchTSE(query: string): Promise<ExternalData> {
    // TSE API (Dados Abertos) usually requires specific endpoints for candidates/elections.
    // Simulating a search for demonstration.
    return {
        source: 'TSE',
        data: [{ type: 'Candidatura', description: `Resultados eleitorais relacionados a ${query}` }]
    };
}

export async function fetchCNJ(query: string): Promise<ExternalData> {
    // DataJud API requires an API Key and complex query structure (Elasticsearch).
    // Simulating a response.
    return {
        source: 'CNJ (DataJud)',
        data: [{ tribunal: 'STF', process: `Processo relacionado a ${query}` }]
    };
}
