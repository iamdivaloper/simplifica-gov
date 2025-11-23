// Authentication API module for SimplificaGov
// Handles login, registration, token refresh, and logout

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.simplificagov.com";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    nome: string;
    email: string;
    password: string;
    whatsapp?: string;
    faixa_etaria?: string;
    regiao?: string;
}

export interface User {
    id: string;
    nome: string;
    email: string;
    whatsapp?: string;
    faixa_etaria?: string;
    regiao?: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

async function fetchAuthApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
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

export const authApi = {
    /**
     * Login with email and password
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            return await fetchAuthApi<AuthResponse>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
            });
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },

    /**
     * Register a new user
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        try {
            return await fetchAuthApi<AuthResponse>("/auth/register", {
                method: "POST",
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    },

    /**
     * Refresh access token using refresh token
     */
    refreshToken: async (refreshToken: string): Promise<{ access_token: string }> => {
        try {
            return await fetchAuthApi<{ access_token: string }>("/auth/refresh", {
                method: "POST",
                body: JSON.stringify({ refresh_token: refreshToken }),
            });
        } catch (error) {
            console.error("Token refresh failed:", error);
            throw error;
        }
    },

    /**
     * Logout (invalidate tokens on server)
     */
    logout: async (refreshToken: string): Promise<{ success: boolean }> => {
        try {
            return await fetchAuthApi<{ success: boolean }>("/auth/logout", {
                method: "POST",
                body: JSON.stringify({ refresh_token: refreshToken }),
            });
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if server logout fails, we should clear local tokens
            return { success: true };
        }
    },

    /**
     * Get current user profile
     */
    getProfile: async (token: string): Promise<User> => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch profile");
            }

            const json = (await res.json()) as ApiResponse<User>;
            if (!json.success) {
                throw new Error(json.message || "Failed to fetch profile");
            }

            return json.data;
        } catch (error) {
            console.error("Get profile failed:", error);
            throw error;
        }
    },
};
