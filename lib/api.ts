import { auth } from "./auth";
import { addFavoritoLocal, removeFavoritoLocal, getFavoritos as getLocalFavoritos, isFavoritoLocal, addPreferenciaLocal, removePreferenciaLocal, getPreferencias as getLocalPreferencias, addAlertaLocal, removeAlertaLocal, getAlertas as getLocalAlertas, markAlertaAsReadLocal } from "./storage";
import { fetchRecentProjects } from "./data-service";

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
    read: boolean;
    created_at: string;
    type?: "normal" | "urgente";
    category?: string;
    message?: string;
    title?: string;
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
// Mocks removed in favor of resilient data fetching

// Mocks removed
// const MOCK_CIDADAOS ...
// const MOCK_PARLAMENTARES ...
// const MOCK_FAVORITOS ...
// const MOCK_ALERTAS ...
// const MOCK_PREFERENCIAS ...

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
            console.warn("API falhou, tentando fontes secundárias:", error);
            try {
                const normalizedData = await fetchRecentProjects();
                return normalizedData.map(item => ({
                    id: item.id,
                    numero: 0,
                    ano: new Date(item.date).getFullYear(),
                    tipo: "PL",
                    ementa: item.title,
                    autores: [item.source],
                    situacao: "Em tramitação",
                    data_apresentacao: item.date,
                    link_inteiro_teor: item.link,
                    traducao: {
                        resumo: item.summary,
                        impacto_social: "Análise em andamento",
                        pontos_positivos: item.tags || [],
                        pontos_negativos: []
                    }
                }));
            } catch (fallbackError) {
                console.error("Todas as fontes falharam:", fallbackError);
                return []; // Return empty array instead of mock data
            }
        }
    },

    getLeiById: async (id: string) => {
        try {
            return await fetchApi<Lei>(`/leis/${id}`);
        } catch (error) {
            console.warn("API falhou, tentando buscar via fontes secundárias:", error);
            try {
                // Try to find by ID or similar in the resilient search
                // Since we don't have a direct "get by id" in the resilient layer, we search for the ID
                const normalizedData = await fetchRecentProjects(); // Or search by ID if possible
                // In a real scenario, we would search for the specific ID. 
                // For now, let's assume if we can't find it, we return error, 
                // OR we try to search for it.
                // Let's try to search for the ID if it looks like a keyword
                const searchResults = await import("./data-service").then(m => m.fetchGovernmentData(id));
                const found = searchResults.find(item => item.id === id || item.title.includes(id));

                if (found) {
                    return {
                        id: found.id,
                        numero: 0,
                        ano: new Date(found.date).getFullYear(),
                        tipo: "PL",
                        ementa: found.title,
                        autores: [found.source],
                        situacao: "Em tramitação",
                        data_apresentacao: found.date,
                        link_inteiro_teor: found.link,
                        traducao: {
                            resumo: found.summary,
                            impacto_social: "Análise em andamento",
                            pontos_positivos: found.tags || [],
                            pontos_negativos: []
                        }
                    };
                }
                throw new Error("Lei não encontrada nas fontes secundárias");
            } catch (fallbackError) {
                throw new Error("Lei não encontrada");
            }
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
            throw new Error("Tradução não disponível nas fontes secundárias");

        }
    },

    getCidadaos: async () => {
        try {
            return await fetchApi<Cidadao[]>("/cidadao");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return [];
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
            throw new Error("Não foi possível criar cidadão (API offline)");
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
            throw new Error("Não foi possível atualizar preferência (API offline)");
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
            console.warn("API falhou, tentando fontes secundárias:", error);
            try {
                const { fetchParlamentares } = await import("./data-service");
                const normalizedData = await fetchParlamentares();

                return normalizedData.map((item, index) => ({
                    id: item.id,
                    nome: item.title, // Assuming title is the name
                    partido: "Sem Partido", // AI might not parse this yet, default
                    uf: "BR",
                    foto_url: "/placeholder-avatar.png",
                    cargo: item.title.toLowerCase().includes("senad") ? "Senador" : "Deputado Federal",
                    email: "contato@camara.leg.br",
                    telefone: "(61) 3000-0000",
                    projetos_apresentados: 0,
                    projetos_aprovados: 0,
                    presenca_sessoes: 100
                }));
            } catch (fallbackError) {
                console.error("Todas as fontes falharam:", fallbackError);
                return [];
            }
        }
    },

    getParlamentarById: async (id: string) => {
        try {
            return await fetchApi<Parlamentar>(`/parlamentares/${id}`);
        } catch (error) {
            console.warn("API falhou, tentando buscar via fontes secundárias:", error);
            try {
                const { fetchParlamentares } = await import("./data-service");
                const normalizedData = await fetchParlamentares();
                const found = normalizedData.find(item => item.id === id || item.title.includes(id));

                if (found) {
                    return {
                        id: found.id,
                        nome: found.title,
                        partido: "Sem Partido",
                        uf: "BR",
                        foto_url: "/placeholder-avatar.png",
                        cargo: found.title.toLowerCase().includes("senad") ? "Senador" : "Deputado Federal",
                        email: "contato@camara.leg.br",
                        telefone: "(61) 3000-0000",
                        projetos_apresentados: 0,
                        projetos_aprovados: 0,
                        presenca_sessoes: 100
                    };
                }
                throw new Error("Parlamentar não encontrado nas fontes secundárias");
            } catch (fallbackError) {
                throw new Error("Parlamentar não encontrado");
            }
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
            // MOCK_FAVORITOS.add(leiId);
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
            // MOCK_FAVORITOS.delete(leiId);
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
            console.warn("API falhou, recuperando favoritos locais:", error);
            const localFavoritoIds = getLocalFavoritos();

            // Fetch details for each favorite ID in parallel
            const results = await Promise.allSettled(
                localFavoritoIds.map(id => api.getLeiById(id))
            );

            return results
                .filter(r => r.status === 'fulfilled')
                .map(r => (r as PromiseFulfilledResult<Lei>).value);
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
            const backendAlertas = await fetchApi<Alerta[]>("/alertas");
            // Merge with local alerts if needed, or just return backend
            // For now, we'll assume backend is source of truth but we might want to support offline alerts later
            return backendAlertas;
        } catch (error) {
            console.warn("API falhou, usando dados locais/mockados:", error);
            const localAlertas = getLocalAlertas();
            return localAlertas;
        }
    },

    createAlerta: async (termo: string) => {
        try {
            const novoAlerta = await fetchApi<Alerta>("/alertas", {
                method: "POST",
                body: JSON.stringify({ termo }),
            });
            addAlertaLocal(novoAlerta);
            return novoAlerta;
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            const novoAlerta: Alerta = {
                id: String(Date.now()),
                termo,
                ativo: true,
                read: false,
                created_at: new Date().toISOString(),
                type: "normal",
                title: `Alerta: ${termo}`,
                message: "Novo alerta criado",
                category: termo
            };
            // MOCK_ALERTAS.push(novoAlerta);
            addAlertaLocal(novoAlerta);
            return novoAlerta;
        }
    },

    deleteAlerta: async (id: string) => {
        try {
            removeAlertaLocal(id);
            return await fetchApi<{ success: boolean }>(`/alertas/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            // const index = MOCK_ALERTAS.findIndex(a => a.id === id);
            // if (index !== -1) MOCK_ALERTAS.splice(index, 1);
            removeAlertaLocal(id);
            return { success: true };
        }
    },

    markAlertaAsRead: async (id: string) => {
        try {
            markAlertaAsReadLocal(id);
            return await fetchApi<{ success: boolean }>(`/alertas/${id}/read`, {
                method: "POST",
            });
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            // In a real app we would update the read status, but our mock Alerta doesn't have 'read' property yet.
            // We'll assume the UI handles the visual state.
            markAlertaAsReadLocal(id);
            return { success: true };
        }
    },

    // Preferencias endpoints
    getPreferencias: async () => {
        try {
            return await fetchApi<PreferenciaTema[]>("/preferencias-temas");
        } catch (error) {
            console.warn("API falhou, usando dados mockados:", error);
            return [];
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
            // MOCK_PREFERENCIAS.push(novaPref);
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
            // const index = MOCK_PREFERENCIAS.findIndex(p => p.tema === tema);
            // if (index !== -1) MOCK_PREFERENCIAS.splice(index, 1);
            return { success: true };
        }
    },

    // Estatisticas endpoints
    getEstatisticas: async () => {
        try {
            return await fetchApi<Estatisticas>("/estatisticas");
        } catch (error) {
            console.warn("API falhou, retornando zeros:", error);
            return {
                total_leis: 0,
                total_cidadaos: 0,
                total_parlamentares: 0
            };
        }
    }
};
