/**
 * Mock Interceptor - Routes API calls to mock data when NEXT_PUBLIC_USE_MOCKS=true
 * 
 * This interceptor simulates network delays and provides realistic responses
 * for all API endpoints without modifying the original API code.
 */

import type { ApiResponse } from "../api";
import {
    MOCK_LEIS,
    MOCK_PARLAMENTARES,
    MOCK_CIDADAOS,
    MOCK_ALERTAS,
    MOCK_PREFERENCIAS,
    MOCK_ESTATISTICAS,
    MOCK_FAVORITOS_IDS
} from "./mock-data";

// ============================================================================
// CONFIGURATION
// ============================================================================

const MOCK_NETWORK_DELAY_MIN = 100; // ms
const MOCK_NETWORK_DELAY_MAX = 300; // ms

/**
 * Check if mocks should be used based on environment variable
 */
export function shouldUseMocks(): boolean {
    return process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
}

/**
 * Simulate network delay for realistic UX
 */
async function simulateNetworkDelay(): Promise<void> {
    const delay = MOCK_NETWORK_DELAY_MIN + Math.random() * (MOCK_NETWORK_DELAY_MAX - MOCK_NETWORK_DELAY_MIN);
    await new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Parse endpoint and method to determine route
 */
interface ParsedRoute {
    resource: string;
    id?: string;
    action?: string;
    method: string;
    params?: URLSearchParams;
}

function parseEndpoint(endpoint: string, method: string = 'GET'): ParsedRoute {
    // Remove leading slash and query params
    const [path, queryString] = endpoint.replace(/^\//, '').split('?');
    const params = queryString ? new URLSearchParams(queryString) : undefined;

    // Split path into segments
    const segments = path.split('/').filter(Boolean);

    return {
        resource: segments[0] || '',
        id: segments[1],
        action: segments[2],
        method: method.toUpperCase(),
        params
    };
}

// ============================================================================
// MOCK RESPONSE HANDLERS
// ============================================================================

/**
 * Handle /leis endpoints
 */
function handleLeis(route: ParsedRoute): any {
    const { id, action, method, params } = route;

    // GET /leis/:id/traduzir or POST /leis/:id/traduzir
    if (id && action === 'traduzir') {
        const lei = MOCK_LEIS.find(l => l.id === id);
        if (!lei) throw new Error('Lei não encontrada');

        return {
            resumo: lei.traducao?.resumo || 'Resumo não disponível',
            toolkit: {
                frases_chave: lei.traducao?.pontos_positivos || [],
                roteiro_video: `${lei.ementa}\n\nImpacto: ${lei.traducao?.impacto_social || 'Em análise'}`
            }
        };
    }

    // GET /leis/:id
    if (id && method === 'GET') {
        const lei = MOCK_LEIS.find(l => l.id === id);
        if (!lei) throw new Error('Lei não encontrada');
        return lei;
    }

    // GET /leis (with filters)
    if (method === 'GET') {
        let filtered = [...MOCK_LEIS];

        if (params) {
            const tipo = params.get('tipo');
            const ano = params.get('ano');
            const numero = params.get('numero');
            const limit = parseInt(params.get('limit') || '10');
            const offset = parseInt(params.get('offset') || '0');

            if (tipo) filtered = filtered.filter(l => l.tipo === tipo);
            if (ano) filtered = filtered.filter(l => l.ano === parseInt(ano));
            if (numero) filtered = filtered.filter(l => l.numero === parseInt(numero));

            // Apply pagination
            filtered = filtered.slice(offset, offset + limit);
        }

        return filtered;
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /parlamentares endpoints
 */
function handleParlamentares(route: ParsedRoute): any {
    const { id, method, params } = route;

    // GET /parlamentares/:id
    if (id && method === 'GET') {
        const parlamentar = MOCK_PARLAMENTARES.find(p => p.id === id);
        if (!parlamentar) throw new Error('Parlamentar não encontrado');
        return parlamentar;
    }

    // GET /parlamentares (with filters)
    if (method === 'GET') {
        let filtered = [...MOCK_PARLAMENTARES];

        if (params) {
            const partido = params.get('partido');
            const uf = params.get('uf');
            const cargo = params.get('cargo');
            const limit = parseInt(params.get('limit') || '10');
            const offset = parseInt(params.get('offset') || '0');

            if (partido) filtered = filtered.filter(p => p.partido === partido);
            if (uf) filtered = filtered.filter(p => p.uf === uf);
            if (cargo) filtered = filtered.filter(p => p.cargo === cargo);

            // Apply pagination
            filtered = filtered.slice(offset, offset + limit);
        }

        return filtered;
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /favoritos endpoints
 */
function handleFavoritos(route: ParsedRoute): any {
    const { id, action, method } = route;

    // GET /favoritos/verificar/:id
    if (action === 'verificar' && method === 'GET') {
        return { is_favorito: MOCK_FAVORITOS_IDS.includes(id || '') };
    }

    // POST /favoritos/:id (add)
    if (id && method === 'POST') {
        if (!MOCK_FAVORITOS_IDS.includes(id)) {
            MOCK_FAVORITOS_IDS.push(id);
        }
        return { success: true };
    }

    // DELETE /favoritos/:id (remove)
    if (id && method === 'DELETE') {
        const index = MOCK_FAVORITOS_IDS.indexOf(id);
        if (index > -1) {
            MOCK_FAVORITOS_IDS.splice(index, 1);
        }
        return { success: true };
    }

    // GET /favoritos (list)
    if (method === 'GET') {
        return MOCK_LEIS.filter(l => MOCK_FAVORITOS_IDS.includes(l.id));
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /alertas endpoints
 */
function handleAlertas(route: ParsedRoute): any {
    const { id, action, method } = route;

    // POST /alertas/:id/read
    if (id && action === 'read' && method === 'POST') {
        const alerta = MOCK_ALERTAS.find(a => a.id === id);
        if (alerta) alerta.read = true;
        return { success: true };
    }

    // DELETE /alertas/:id
    if (id && method === 'DELETE') {
        const index = MOCK_ALERTAS.findIndex(a => a.id === id);
        if (index > -1) {
            MOCK_ALERTAS.splice(index, 1);
        }
        return { success: true };
    }

    // POST /alertas (create)
    if (method === 'POST') {
        // Body would be in the request, but we'll create a mock one
        const novoAlerta = {
            id: String(Date.now()),
            termo: "Novo Termo",
            ativo: true,
            read: false,
            created_at: new Date().toISOString(),
            type: "normal" as const,
            category: "Geral",
            title: "Novo Alerta",
            message: "Alerta criado com sucesso"
        };
        MOCK_ALERTAS.push(novoAlerta);
        return novoAlerta;
    }

    // GET /alertas (list)
    if (method === 'GET') {
        return MOCK_ALERTAS;
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /preferencias-temas endpoints
 */
function handlePreferencias(route: ParsedRoute): any {
    const { id, method } = route;

    // DELETE /preferencias-temas/:tema
    if (id && method === 'DELETE') {
        const index = MOCK_PREFERENCIAS.findIndex(p => p.tema === id);
        if (index > -1) {
            MOCK_PREFERENCIAS.splice(index, 1);
        }
        return { success: true };
    }

    // POST /preferencias-temas (create)
    if (method === 'POST') {
        const novaPref = {
            tema: "Novo Tema",
            nivel_interesse: 3,
            created_at: new Date().toISOString()
        };
        MOCK_PREFERENCIAS.push(novaPref);
        return novaPref;
    }

    // GET /preferencias-temas (list)
    if (method === 'GET') {
        return MOCK_PREFERENCIAS;
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /cidadao endpoints
 */
function handleCidadaos(route: ParsedRoute): any {
    const { id, action, method } = route;

    // POST /cidadao/:id/preferencia
    if (id && action === 'preferencia' && method === 'POST') {
        const cidadao = MOCK_CIDADAOS.find(c => c.id === id);
        if (!cidadao) throw new Error('Cidadão não encontrado');
        // Would update preferencia_midia here
        return cidadao;
    }

    // POST /cidadao (create)
    if (method === 'POST') {
        const novoCidadao = {
            id: String(Date.now()),
            nome: "Novo Cidadão",
            contato: "novo@email.com",
            preferencia_midia: "texto" as const
        };
        MOCK_CIDADAOS.push(novoCidadao);
        return novoCidadao;
    }

    // GET /cidadao (list)
    if (method === 'GET') {
        return MOCK_CIDADAOS;
    }

    throw new Error('Endpoint não suportado');
}

/**
 * Handle /estatisticas endpoints
 */
function handleEstatisticas(route: ParsedRoute): any {
    if (route.method === 'GET') {
        return MOCK_ESTATISTICAS;
    }
    throw new Error('Endpoint não suportado');
}

// ============================================================================
// MAIN MOCK FETCH FUNCTION
// ============================================================================

/**
 * Main mock fetch function that intercepts API calls
 */
export async function mockFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    console.log(`[MOCK] ${options?.method || 'GET'} ${endpoint}`);

    // Simulate network delay
    await simulateNetworkDelay();

    try {
        const route = parseEndpoint(endpoint, options?.method);
        let data: any;

        // Route to appropriate handler
        switch (route.resource) {
            case 'leis':
                data = handleLeis(route);
                break;
            case 'parlamentares':
                data = handleParlamentares(route);
                break;
            case 'favoritos':
                data = handleFavoritos(route);
                break;
            case 'alertas':
                data = handleAlertas(route);
                break;
            case 'preferencias-temas':
                data = handlePreferencias(route);
                break;
            case 'cidadao':
                data = handleCidadaos(route);
                break;
            case 'estatisticas':
                data = handleEstatisticas(route);
                break;
            default:
                throw new Error(`Mock não implementado para: ${route.resource}`);
        }

        console.log(`[MOCK] ✓ Response:`, data);
        return data as T;

    } catch (error) {
        console.error(`[MOCK] ✗ Error:`, error);
        throw error;
    }
}
