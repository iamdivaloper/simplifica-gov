import { auth } from "./auth";

export const API_BASE_URL = "https://simplificagov.com/api";

export interface Tramitacao {
    data: string;
    descricao: string;
    local: string;
}

export interface Lei {
    id: string;
    numero: number;
    ano: number;
    tipo: string;
    ementa: string;
    autores: string[];
    situacao: string;
    data_apresentacao: string;
    link_inteiro_teor: string;
    historico_tramitacoes?: Tramitacao[];
    traducao?: {
        resumo: string;
        impacto_social: string;
        pontos_positivos: string[];
        pontos_negativos: string[];
    };
}

export interface Cidadao {
    id: string;
    nome: string;
    contato: string;
    faixa_etaria?: string;
    regiao?: string;
    preferencia_midia: "voz" | "texto";
}

export interface Parlamentar {
    id: string;
    nome: string;
    partido: string;
    uf: string;
    foto_url: string;
    cargo: "Deputado Federal" | "Senador";
    email: string;
    telefone: string;
    projetos_apresentados: number;
    projetos_aprovados: number;
    presenca_sessoes: number; // percentual
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// Mock data for fallback
const MOCK_LEIS: Lei[] = [
    {
        id: "pl-2630-2020",
        numero: 2630,
        ano: 2020,
        tipo: "PL",
        ementa: "Lei das Fake News - Estabelece regras para redes sociais e aplicativos de mensagens",
        autores: ["Alessandro Molon", "Orlando Silva"],
        situacao: "Em tramitação",
        data_apresentacao: "2020-05-04",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2256735",
        historico_tramitacoes: [
            { data: "2024-11-15", descricao: "Aprovado na Comissão de Constituição e Justiça", local: "CCJ" },
            { data: "2024-10-20", descricao: "Audiência pública realizada", local: "Plenário" },
            { data: "2024-09-10", descricao: "Parecer favorável do relator", local: "Comissão" }
        ],
        traducao: {
            resumo: "Este projeto cria regras para combater notícias falsas nas redes sociais, exigindo transparência das plataformas e responsabilização por conteúdos enganosos.",
            impacto_social: "Pode reduzir a disseminação de desinformação, mas há preocupações sobre possível censura.",
            pontos_positivos: ["Combate às fake news", "Mais transparência das plataformas", "Proteção aos usuários"],
            pontos_negativos: ["Risco de censura", "Dificuldade de implementação", "Possível impacto na liberdade de expressão"]
        }
    },
    {
        id: "pl-118-2007",
        numero: 118,
        ano: 2007,
        tipo: "PL",
        ementa: "Tarifa Zero - Gratuidade no transporte público para estudantes e idosos",
        autores: ["Chico Alencar"],
        situacao: "Aprovado",
        data_apresentacao: "2007-03-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=345678",
        historico_tramitacoes: [
            { data: "2024-11-01", descricao: "Sancionado pelo Presidente", local: "Presidência" },
            { data: "2024-10-15", descricao: "Aprovado no Senado", local: "Senado Federal" },
            { data: "2024-09-20", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Garante transporte público gratuito para estudantes e idosos em todo o país.",
            impacto_social: "Facilita o acesso à educação e mobilidade para grupos vulneráveis.",
            pontos_positivos: ["Inclusão social", "Acesso à educação", "Economia para famílias"],
            pontos_negativos: ["Custo para municípios", "Necessidade de compensação financeira"]
        }
    },
    {
        id: "pl-3142-2021",
        numero: 3142,
        ano: 2021,
        tipo: "PL",
        ementa: "Marco Legal da Inteligência Artificial - Regulamenta o uso de IA no Brasil",
        autores: ["Eduardo Bismarck"],
        situacao: "Em tramitação",
        data_apresentacao: "2021-09-28",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2298356",
        historico_tramitacoes: [
            { data: "2024-11-10", descricao: "Em análise na Comissão de Ciência e Tecnologia", local: "CCT" },
            { data: "2024-10-05", descricao: "Emendas apresentadas", local: "Comissão" }
        ]
    }
];

const MOCK_CIDADAOS: Cidadao[] = [
    {
        id: "1",
        nome: "Maria da Silva",
        contato: "(11) 99999-9999",
        faixa_etaria: "25-34",
        regiao: "Sudeste",
        preferencia_midia: "texto"
    }
];

const MOCK_PARLAMENTARES: Parlamentar[] = [
    {
        id: "dep-1",
        nome: "João Silva",
        partido: "PT",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "joao.silva@camara.leg.br",
        telefone: "(61) 3215-5000",
        projetos_apresentados: 45,
        projetos_aprovados: 12,
        presenca_sessoes: 92
    },
    {
        id: "dep-2",
        nome: "Maria Santos",
        partido: "PSOL",
        uf: "RJ",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "maria.santos@camara.leg.br",
        telefone: "(61) 3215-5001",
        projetos_apresentados: 38,
        projetos_aprovados: 15,
        presenca_sessoes: 95
    },
    {
        id: "sen-1",
        nome: "Carlos Oliveira",
        partido: "MDB",
        uf: "MG",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "carlos.oliveira@senado.leg.br",
        telefone: "(61) 3303-6000",
        projetos_apresentados: 28,
        projetos_aprovados: 8,
        presenca_sessoes: 88
    }
];

const MOCK_FAVORITOS: Set<string> = new Set();

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = auth.getToken();

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || `API Error: ${res.statusText}`);
    }

    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success) {
        throw new Error(json.message || json.error || "Unknown API error");
    }

    return json.data;
}

export const api = {
    getLeis: async (params?: {
        limit?: number;
        offset?: number;
        tipo?: string;
        numero?: number;
        ano?: number;
    }) => {
        try {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) searchParams.append(key, String(value));
                });
            }
            return await fetchApi<Lei[]>(`/leis?${searchParams.toString()}`);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            // Aplicar filtros nos dados mockados
            let filtered = [...MOCK_LEIS];
            if (params?.tipo) filtered = filtered.filter(l => l.tipo === params.tipo);
            if (params?.numero) filtered = filtered.filter(l => l.numero === params.numero);
            if (params?.ano) filtered = filtered.filter(l => l.ano === params.ano);
            if (params?.limit) filtered = filtered.slice(params.offset || 0, (params.offset || 0) + params.limit);
            return filtered;
        }
    },

    getLeiById: async (id: string) => {
        try {
            return await fetchApi<Lei>(`/leis/${id}`);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const lei = MOCK_LEIS.find(l => l.id === id);
            if (!lei) throw new Error("Lei não encontrada");
            return lei;
        }
    },

    translateLei: async (id: string) => {
        try {
            return await fetchApi<{
                resumo: string;
                toolkit: {
                    frases_chave: string[];
                    roteiro_video: string;
                };
            }>(`/leis/${id}/traduzir`, { method: "POST" });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const lei = MOCK_LEIS.find(l => l.id === id);
            if (!lei || !lei.traducao) {
                throw new Error("Tradução não disponível");
            }
            return {
                resumo: lei.traducao.resumo,
                toolkit: {
                    frases_chave: lei.traducao.pontos_positivos.slice(0, 3),
                    roteiro_video: `Introdução: ${lei.ementa}\n\nPontos principais: ${lei.traducao.pontos_positivos.join(", ")}\n\nImpacto: ${lei.traducao.impacto_social}`
                }
            };
        }
    },

    getCidadaos: async () => {
        try {
            return await fetchApi<Cidadao[]>("/cidadao");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return MOCK_CIDADAOS;
        }
    },

    createCidadao: async (data: {
        nome: string;
        contato: string;
        faixa_etaria?: string;
        regiao?: string;
        preferencia_midia?: "voz" | "texto";
    }) => {
        try {
            return await fetchApi<Cidadao>("/cidadao", {
                method: "POST",
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const novoCidadao: Cidadao = {
                id: String(Date.now()),
                ...data,
                preferencia_midia: data.preferencia_midia || "texto"
            };
            MOCK_CIDADAOS.push(novoCidadao);
            return novoCidadao;
        }
    },

    updatePreferencia: async (id: string, preferencia: "voz" | "texto") => {
        try {
            return await fetchApi<Cidadao>(`/cidadao/${id}/preferencia`, {
                method: "POST",
                body: JSON.stringify({ preferencia }),
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const cidadao = MOCK_CIDADAOS.find(c => c.id === id);
            if (!cidadao) throw new Error("Cidadão não encontrado");
            cidadao.preferencia_midia = preferencia;
            return cidadao;
        }
    },

    // Parlamentares endpoints
    getParlamentares: async (params?: {
        limit?: number;
        offset?: number;
        partido?: string;
        uf?: string;
        cargo?: "Deputado Federal" | "Senador";
    }) => {
        try {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) searchParams.append(key, String(value));
                });
            }
            return await fetchApi<Parlamentar[]>(`/parlamentares?${searchParams.toString()}`);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            let filtered = [...MOCK_PARLAMENTARES];
            if (params?.partido) filtered = filtered.filter(p => p.partido === params.partido);
            if (params?.uf) filtered = filtered.filter(p => p.uf === params.uf);
            if (params?.cargo) filtered = filtered.filter(p => p.cargo === params.cargo);
            if (params?.limit) filtered = filtered.slice(params.offset || 0, (params.offset || 0) + params.limit);
            return filtered;
        }
    },

    getParlamentarById: async (id: string) => {
        try {
            return await fetchApi<Parlamentar>(`/parlamentares/${id}`);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const parlamentar = MOCK_PARLAMENTARES.find(p => p.id === id);
            if (!parlamentar) throw new Error("Parlamentar não encontrado");
            return parlamentar;
        }
    },

    // Favoritos endpoints
    addFavorito: async (cidadaoId: string, leiId: string) => {
        try {
            return await fetchApi<{ success: boolean }>(`/cidadao/${cidadaoId}/favoritos`, {
                method: "POST",
                body: JSON.stringify({ lei_id: leiId }),
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            MOCK_FAVORITOS.add(leiId);
            return { success: true };
        }
    },

    removeFavorito: async (cidadaoId: string, leiId: string) => {
        try {
            return await fetchApi<{ success: boolean }>(`/cidadao/${cidadaoId}/favoritos/${leiId}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            MOCK_FAVORITOS.delete(leiId);
            return { success: true };
        }
    },

    getFavoritos: async (cidadaoId: string) => {
        try {
            return await fetchApi<Lei[]>(`/cidadao/${cidadaoId}/favoritos`);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const favoritoIds = Array.from(MOCK_FAVORITOS);
            return MOCK_LEIS.filter(lei => favoritoIds.includes(lei.id));
        }
    },

    isFavorito: async (cidadaoId: string, leiId: string) => {
        try {
            const favoritos = await api.getFavoritos(cidadaoId);
            return favoritos.some(lei => lei.id === leiId);
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return MOCK_FAVORITOS.has(leiId);
        }
    },
};
