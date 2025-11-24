import { auth } from "./auth";
import { addFavoritoLocal, removeFavoritoLocal, getFavoritos as getLocalFavoritos, isFavoritoLocal, addPreferenciaLocal, removePreferenciaLocal, getPreferencias as getLocalPreferencias, addAlertaLocal, removeAlertaLocal, getAlertas as getLocalAlertas, markAlertaAsReadLocal, savePendingAction } from "./storage";
import { fetchRecentProjects } from "./data-service";
import { cache, TTL } from "./cache";

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
    // ============================================================================
    // MOCK INTERCEPTOR - Activated when NEXT_PUBLIC_USE_MOCKS=true
    // ============================================================================
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('[API] Using MOCK data (NEXT_PUBLIC_USE_MOCKS=true)');
        const { mockFetch } = await import('./mocks');
        return mockFetch<T>(endpoint, options);
    }

    // ============================================================================
    // ORIGINAL API CODE (Preserved - No changes below this line)
    // ============================================================================
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
        // Create cache key from params
        const cacheKey = `leis_${JSON.stringify(params || {})}`;

        // Try cache first
        const cached = await cache.get<Lei[]>("leis", cacheKey);
        if (cached) {
            console.log("[API] Cache hit for leis");
            return cached;
        }

        try {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) searchParams.append(key, String(value));
                });
            }
            const data = await fetchApi<Lei[]>(`/leis?${searchParams.toString()}`);

            // Cache the result
            await cache.set("leis", cacheKey, data, TTL.LEIS);

            return data;
        } catch (error) {
            console.warn("API falhou, tentando fontes secundárias:", error);
            try {
                const normalizedData = await fetchRecentProjects();
                const data = normalizedData.map(item => ({
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

                // Cache fallback data
                await cache.set("leis", cacheKey, data, TTL.LEIS);

                return data;
            } catch (fallbackError) {
                console.error("Todas as fontes falharam:", fallbackError);
                return []; // Return empty array instead of mock data
            }
        }
    },

    getLeiById: async (id: string) => {
        // Try cache first
        const cached = await cache.get<Lei>("leis", `lei_${id}`);
        if (cached) {
            console.log(`[API] Cache hit for lei ${id}`);
            return cached;
        }

        try {
            const data = await fetchApi<Lei>(`/leis/${id}`);

            // Cache the result
            await cache.set("leis", `lei_${id}`, data, TTL.LEIS);

            return data;
        } catch (error) {
            console.warn("API falhou, tentando buscar via fontes secundárias:", error);
            try {
                // Try to find by ID or similar in the resilient search
                const normalizedData = await fetchRecentProjects();
                const searchResults = await import("./data-service").then(m => m.fetchGovernmentData(id));
                const found = searchResults.find(item => item.id === id || item.title.includes(id));

                if (found) {
                    const data = {
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

                    // Cache fallback data
                    await cache.set("leis", `lei_${id}`, data, TTL.LEIS);

                    return data;
                }
                throw new Error("Lei não encontrada nas fontes secundárias");
            } catch (fallbackError) {
                throw new Error("Lei não encontrada");
            }
        }
    },

    translateLei: async (id: string) => {
        // Try cache first (permanent cache for AI translations to save tokens)
        const cached = await cache.get<{
            resumo: string;
            toolkit: {
                frases_chave: string[];
                roteiro_video: string;
            };
        }>("traducoes", `traducao_${id}`);

        if (cached) {
            console.log(`[API] Cache hit for traducao ${id} (saving AI tokens!)`);
            return cached;
        }

        try {
            // First, try to get the lei details
            const lei = await api.getLeiById(id);

            // Use SimplificaGov AI to analyze the lei
            const { analisarLei } = await import("./simplificagov-ai");
            const analise = await analisarLei(lei.ementa, lei.link_inteiro_teor);

            // Transform SimplificaGov analysis to expected format
            const data = {
                resumo: analise.roteiro_audio_whatsapp,
                toolkit: {
                    frases_chave: analise.tags_mapa_afetos,
                    roteiro_video: `${analise.titulo_simples}\n\n${analise.cards_visuais.impacto_bolso}\n${analise.cards_visuais.impacto_direitos}\n\nStatus: ${analise.cards_visuais.status_projeto}\n\nÍndice de Complexidade: ${analise.auditoria_ia_responsavel.nota_complexidade_original}/100\nFonte: ${analise.auditoria_ia_responsavel.fonte_citada}`
                }
            };

            // Cache permanently (no TTL) to save AI tokens
            await cache.set("traducoes", `traducao_${id}`, data, TTL.TRADUCOES);

            return data;
        } catch (error) {
            console.warn("[API] SimplificaGov AI falhou, tentando backend:", error);

            // Fallback to backend API if AI fails
            try {
                const data = await fetchApi<{
                    resumo: string;
                    toolkit: {
                        frases_chave: string[];
                        roteiro_video: string;
                    };
                }>(`/leis/${id}/traduzir`, { method: "POST" });

                // Cache permanently (no TTL) to save AI tokens
                await cache.set("traducoes", `traducao_${id}`, data, TTL.TRADUCOES);

                return data;
            } catch (backendError) {
                console.error("[API] Backend também falhou:", backendError);
                throw new Error("Tradução não disponível no momento");
            }
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
        // Create cache key from params
        const cacheKey = `parlamentares_${JSON.stringify(params || {})}`;

        // Try cache first
        const cached = await cache.get<Parlamentar[]>("parlamentares", cacheKey);
        if (cached) {
            console.log("[API] Cache hit for parlamentares");
            return cached;
        }

        try {
            const searchParams = new URLSearchParams();
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined) searchParams.append(key, String(value));
                });
            }
            const data = await fetchApi<Parlamentar[]>(`/parlamentares?${searchParams.toString()}`);

            // Cache the result
            await cache.set("parlamentares", cacheKey, data, TTL.PARLAMENTARES);

            return data;
        } catch (error) {
            console.warn("API falhou, tentando fontes secundárias:", error);
            try {
                const { fetchParlamentares } = await import("./data-service");
                const normalizedData = await fetchParlamentares();

                const data = normalizedData.map((item, index) => ({
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

                // Cache fallback data
                await cache.set("parlamentares", cacheKey, data, TTL.PARLAMENTARES);

                return data;
            } catch (fallbackError) {
                console.error("Todas as fontes falharam:", fallbackError);
                return [];
            }
        }
    },

    getParlamentarById: async (id: string) => {
        // Try cache first
        const cached = await cache.get<Parlamentar>("parlamentares", `parlamentar_${id}`);
        if (cached) {
            console.log(`[API] Cache hit for parlamentar ${id}`);
            return cached;
        }

        try {
            const data = await fetchApi<Parlamentar>(`/parlamentares/${id}`);

            // Cache the result
            await cache.set("parlamentares", `parlamentar_${id}`, data, TTL.PARLAMENTARES);

            return data;
        } catch (error) {
            console.warn("API falhou, tentando buscar via fontes secundárias:", error);
            try {
                const { fetchParlamentares } = await import("./data-service");
                const normalizedData = await fetchParlamentares();
                const found = normalizedData.find(item => item.id === id || item.title.includes(id));

                if (found) {
                    const data = {
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

                    // Cache fallback data
                    await cache.set("parlamentares", `parlamentar_${id}`, data, TTL.PARLAMENTARES);

                    return data;
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
            savePendingAction({
                id: `fav-${leiId}-${Date.now()}`,
                type: "ADD_FAVORITO",
                payload: { leiId },
                timestamp: Date.now()
            });
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
            savePendingAction({
                id: `unfav-${leiId}-${Date.now()}`,
                type: "REMOVE_FAVORITO",
                payload: { leiId },
                timestamp: Date.now()
            });
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
            savePendingAction({
                id: `alert-${termo}-${Date.now()}`,
                type: "CREATE_ALERTA",
                payload: { termo },
                timestamp: Date.now()
            });
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
            savePendingAction({
                id: `del-alert-${id}-${Date.now()}`,
                type: "DELETE_ALERTA",
                payload: { id },
                timestamp: Date.now()
            });
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
            savePendingAction({
                id: `pref-${tema}-${Date.now()}`,
                type: "ADD_PREFERENCIA",
                payload: { tema },
                timestamp: Date.now()
            });
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
            savePendingAction({
                id: `unpref-${tema}-${Date.now()}`,
                type: "REMOVE_PREFERENCIA",
                payload: { tema },
                timestamp: Date.now()
            });
            return { success: true };
        }
    },

    // Estatisticas endpoints
    getEstatisticas: async () => {
        // Try cache first
        const cached = await cache.get<Estatisticas>("estatisticas", "stats");
        if (cached) {
            console.log("[API] Cache hit for estatisticas");
            return cached;
        }

        try {
            const data = await fetchApi<Estatisticas>("/estatisticas");

            // Cache with short TTL (30 minutes)
            await cache.set("estatisticas", "stats", data, TTL.ESTATISTICAS);

            return data;
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
