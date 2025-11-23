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
        // Mock implementation - will be replaced with real API call
        console.warn("Using mock login - backend not implemented yet");

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock successful login
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

        return {
            token: mockToken,
            user: mockUser
        };
    },

    // Register
    register: async (data: RegisterData): Promise<AuthResponse> => {
        // Mock implementation - will be replaced with real API call
        console.warn("Using mock register - backend not implemented yet");

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock successful registration
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

        return {
            token: mockToken,
            user: mockUser
        };
    },

    // Logout
    logout: async (): Promise<void> => {
        // Mock implementation - will be replaced with real API call
        console.warn("Using mock logout - backend not implemented yet");

        auth.removeToken();
        auth.removeUser();
    },

    // Get current user from API
    me: async (): Promise<AuthUser> => {
        // Mock implementation - will be replaced with real API call
        const user = auth.getUser();
        if (!user) {
            throw new Error("Not authenticated");
        }
        return user;
    },

    // Refresh token
    refreshToken: async (): Promise<string> => {
        // Mock implementation - will be replaced with real API call
        console.warn("Using mock refresh token - backend not implemented yet");

        const newToken = `mock_token_${Date.now()}`;
        auth.setToken(newToken);
        return newToken;
    }
};
