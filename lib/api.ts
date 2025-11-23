import { auth } from "./auth";
import { addFavoritoLocal, removeFavoritoLocal, getFavoritos as getLocalFavoritos, isFavoritoLocal, addPreferenciaLocal, removePreferenciaLocal, getPreferencias as getLocalPreferencias } from "./storage";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.simplificagov.com";

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

export interface Alerta {
    id: string;
    termo: string;
    ativo: boolean;
    read?: boolean;
    created_at: string;
}

export interface PreferenciaTema {
    tema: string;
    nivel_interesse?: number;
    created_at?: string;
}

export interface Estatisticas {
    total_leis: number;
    total_cidadaos: number;
    total_parlamentares: number;
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
const MOCK_ALERTAS: Alerta[] = [];
const MOCK_PREFERENCIAS: PreferenciaTema[] = [];

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
    addFavorito: async (leiId: string) => {
        // Add to localStorage immediately for offline support
        addFavoritoLocal(leiId);

        try {
            return await fetchApi<{ success: boolean }>(`/favoritos/${leiId}`, {
                method: "POST",
            });
        } catch (error) {
            console.warn("API falhou, favorito salvo localmente:", error);
            MOCK_FAVORITOS.add(leiId);
            return { success: true };
        }
    },

    removeFavorito: async (leiId: string) => {
        // Remove from localStorage immediately
        removeFavoritoLocal(leiId);

        try {
            return await fetchApi<{ success: boolean }>(`/favoritos/${leiId}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.warn("API falhou, favorito removido localmente:", error);
            MOCK_FAVORITOS.delete(leiId);
            return { success: true };
        }
    },

    getFavoritos: async () => {
        try {
            const backendFavoritos = await fetchApi<Lei[]>("/favoritos");
            // Update localStorage with backend data
            const favoritoIds = backendFavoritos.map(f => f.id);
            const localFavoritos = getLocalFavoritos();
            // Merge: keep all local + backend
            const merged = Array.from(new Set([...favoritoIds, ...localFavoritos]));
            // Save merged back to localStorage
            return backendFavoritos;
        } catch (error) {
            console.warn("API falhou, usando favoritos locais:", error);
            const localFavoritoIds = getLocalFavoritos();
            return MOCK_LEIS.filter(lei => localFavoritoIds.includes(lei.id));
        }
    },

    isFavorito: async (leiId: string) => {
        // Check localStorage first for instant response
        const isLocal = isFavoritoLocal(leiId);

        try {
            const res = await fetchApi<{ is_favorito: boolean }>(`/favoritos/verificar/${leiId}`);
            return res.is_favorito;
        } catch (error) {
            console.warn("API falhou, usando dados locais:", error);
            return isLocal;
        }
    },

    // Alertas endpoints
    getAlertas: async () => {
        try {
            return await fetchApi<Alerta[]>("/alertas");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return MOCK_ALERTAS;
        }
    },

    createAlerta: async (termo: string) => {
        try {
            return await fetchApi<Alerta>("/alertas", {
                method: "POST",
                body: JSON.stringify({ termo }),
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const novoAlerta: Alerta = {
                id: String(Date.now()),
                termo,
                ativo: true,
                created_at: new Date().toISOString()
            };
            MOCK_ALERTAS.push(novoAlerta);
            return novoAlerta;
        }
    },

    deleteAlerta: async (id: string) => {
        try {
            return await fetchApi<{ success: boolean }>(`/alertas/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const index = MOCK_ALERTAS.findIndex(a => a.id === id);
            if (index !== -1) MOCK_ALERTAS.splice(index, 1);
            return { success: true };
        }
    },

    markAlertaAsRead: async (id: string) => {
        try {
            return await fetchApi<{ success: boolean }>(`/alertas/${id}/read`, {
                method: "POST",
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            // In a real app we would update the read status, but our mock Alerta doesn't have 'read' property yet.
            // We'll assume the UI handles the visual state.
            return { success: true };
        }
    },

    // Preferencias endpoints
    getPreferencias: async () => {
        try {
            return await fetchApi<PreferenciaTema[]>("/preferencias-temas");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return MOCK_PREFERENCIAS;
        }
    },

    addPreferencia: async (tema: string) => {
        // Add to localStorage immediately
        addPreferenciaLocal(tema);

        try {
            return await fetchApi<PreferenciaTema>("/preferencias-temas", {
                method: "POST",
                body: JSON.stringify({ tema }),
            });
        } catch (error) {
            console.warn("API falhou, preferência salva localmente:", error);
            const novaPref: PreferenciaTema = { tema, created_at: new Date().toISOString() };
            MOCK_PREFERENCIAS.push(novaPref);
            return novaPref;
        }
    },

    removePreferencia: async (tema: string) => {
        // Remove from localStorage immediately
        removePreferenciaLocal(tema);

        try {
            return await fetchApi<{ success: boolean }>(`/preferencias-temas/${tema}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.warn("API falhou, preferência removida localmente:", error);
            const index = MOCK_PREFERENCIAS.findIndex(p => p.tema === tema);
            if (index !== -1) MOCK_PREFERENCIAS.splice(index, 1);
            return { success: true };
        }
    },

    // Estatisticas endpoints
    getEstatisticas: async () => {
        try {
            return await fetchApi<Estatisticas>("/estatisticas");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return {
                total_leis: MOCK_LEIS.length,
                total_cidadaos: MOCK_CIDADAOS.length,
                total_parlamentares: MOCK_PARLAMENTARES.length
            };
        }
    }
};
