export interface NormalizedItem {
    id: string;
    title: string;
    summary: string;
    date: string;
    source: string;
    link: string;
    tags: string[];
}

export async function normalizeData(rawData: any, context: string): Promise<NormalizedItem[]> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.warn('OPENROUTER_API_KEY not found. Returning raw data as best effort.');
        return fallbackNormalization(rawData);
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemma-3-27b-it:free',
                messages: [
                    {
                        role: 'system',
                        content: `Analise estes dados brutos governamentais e formate-os em um JSON estrito e otimizado para renderização em UI.
            O output deve ser APENAS um array JSON de objetos com a seguinte estrutura:
            [
              {
                "id": "string",
                "title": "Título claro e conciso",
                "summary": "Resumo de 1-2 frases removendo redundâncias",
                "date": "ISO 8601 date string",
                "source": "Nome da fonte original",
                "link": "URL original se disponível",
                "tags": ["tag1", "tag2"]
              }
            ]
            Se não houver dados úteis, retorne um array vazio [].
            Contexto da busca: "${context}"`
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(rawData).substring(0, 15000) // Limit context window
                    }
                ],
                temperature: 0.2, // Low temperature for consistent formatting
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.statusText}`);
        }

        const completion = await response.json();
        const content = completion.choices[0]?.message?.content;

        // Extract JSON from markdown code blocks if present
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;

        return JSON.parse(jsonString);
    } catch (error) {
        console.error('AI Normalization failed:', error);
        return fallbackNormalization(rawData);
    }
}

function fallbackNormalization(rawData: any): NormalizedItem[] {
    // Simple heuristic fallback if AI fails
    if (Array.isArray(rawData)) {
        return rawData.map((item: any, index: number) => ({
            id: item.id || `fallback-${index}`,
            title: item.title || item.nome || 'Sem título',
            summary: item.description || item.ementa || 'Sem descrição disponível',
            date: new Date().toISOString(),
            source: 'Fonte desconhecida',
            link: '#',
            tags: ['fallback']
        }));
    }
    return [];
}
