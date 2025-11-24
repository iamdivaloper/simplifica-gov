import { authApi } from "./auth-api";

export interface AuthUser {
    id: string;
    nome: string;
    email: string;
    contato: string;
    faixa_etaria?: string;
    regiao?: string;
    preferencia_midia: "voz" | "texto";
}

export interface LoginCredentials {
    email: string;
    senha: string;
}

export interface RegisterData {
    nome: string;
    email: string;
    senha: string;
    contato: string;
    faixa_etaria?: string;
    regiao?: string;
    preferencia_midia?: "voz" | "texto";
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}

const TOKEN_KEY = "simplificagov_token";
const USER_KEY = "simplificagov_user";

export const auth = {
    // Get stored token
    getToken: (): string | null => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    // Set token
    setToken: (token: string): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Remove token
    removeToken: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(TOKEN_KEY);
    },

    // Get stored user
    getUser: (): AuthUser | null => {
        if (typeof window === "undefined") return null;
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    // Set user
    setUser: (user: AuthUser): void => {
        if (typeof window === "undefined") return;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    // Remove user
    removeUser: (): void => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(USER_KEY);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!auth.getToken();
    },

    // Login
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const data = await authApi.login(credentials);

            auth.setToken(data.token);
            auth.setUser(data.user);

            return data;
        } catch (error) {
            // Fallback for demo/development if API is down
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                const mockUser: AuthUser = {
                    id: "1",
                    nome: "Maria da Silva",
                    email: credentials.email,
                    contato: "(11) 99999-9999",
                    faixa_etaria: "25-34",
                    regiao: "Sudeste",
                    preferencia_midia: "texto"
                };
                const mockToken = `mock_token_${Date.now()}`;
                auth.setToken(mockToken);
                auth.setUser(mockUser);
                return { token: mockToken, user: mockUser };
            }
            throw error;
        }
    },

    // Register
    register: async (data: RegisterData): Promise<AuthResponse> => {
        try {
            const response = await authApi.register(data);

            auth.setToken(response.token);
            auth.setUser(response.user);

            return response;
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                const mockUser: AuthUser = {
                    id: String(Date.now()),
                    nome: data.nome,
                    email: data.email,
                    contato: data.contato,
                    faixa_etaria: data.faixa_etaria,
                    regiao: data.regiao,
                    preferencia_midia: data.preferencia_midia || "texto"
                };
                const mockToken = `mock_token_${Date.now()}`;
                auth.setToken(mockToken);
                auth.setUser(mockUser);
                return { token: mockToken, user: mockUser };
            }
            throw error;
        }
    },

    // Logout
    logout: async (): Promise<void> => {
        auth.removeToken();
        auth.removeUser();
    },

    // Get current user from API
    me: async (): Promise<AuthUser> => {
        const token = auth.getToken();
        if (!token) throw new Error("Not authenticated");

        try {
            const user = await authApi.me(token);
            auth.setUser(user); // Update stored user
            return user;
        } catch (error) {
            // If API fails, try to return stored user, otherwise throw
            const storedUser = auth.getUser();
            if (storedUser) return storedUser;
            throw error;
        }
    },

    // Refresh token
    refreshToken: async (): Promise<string> => {
        const token = auth.getToken();
        if (!token) throw new Error("No token to refresh");

        try {
            const newToken = await authApi.refreshToken(token);
            auth.setToken(newToken);
            return newToken;
        } catch (error) {
            throw error;
        }
    }
};
