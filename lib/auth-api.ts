import { API_BASE_URL } from "./api";
import { AuthUser, LoginCredentials, RegisterData, AuthResponse } from "./auth";

/**
 * Helper for making authenticated requests
 */
async function authFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // ============================================================================
    // MOCK INTERCEPTOR - Activated when NEXT_PUBLIC_USE_MOCKS=true
    // ============================================================================
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        console.log('[AUTH-API] Using MOCK data (NEXT_PUBLIC_USE_MOCKS=true)');
        const { mockFetch } = await import('./mocks');
        return mockFetch<T>(endpoint, options);
    }

    // ============================================================================
    // ORIGINAL CODE (Preserved)
    // ============================================================================
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || `Auth Error: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.success === false) {
        throw new Error(json.message || json.error || "Unknown Auth error");
    }

    return json.data;
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return await authFetch<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        return await authFetch<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    me: async (token: string): Promise<AuthUser> => {
        return await authFetch<AuthUser>("/auth/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    refreshToken: async (token: string): Promise<string> => {
        const data = await authFetch<{ token: string }>("/auth/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return data.token;
    }
};
