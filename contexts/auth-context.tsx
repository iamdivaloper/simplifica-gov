"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { auth, AuthUser } from "@/lib/auth"

interface AuthContextType {
    user: AuthUser | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, senha: string) => Promise<void>
    register: (data: any) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const storedUser = auth.getUser()
        if (storedUser && auth.isAuthenticated()) {
            setUser(storedUser)
        }
        setIsLoading(false)
    }, [])

    const login = async (email: string, senha: string) => {
        setIsLoading(true)
        try {
            const response = await auth.login({ email, senha })
            setUser(response.user)
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (data: any) => {
        setIsLoading(true)
        try {
            const response = await auth.register(data)
            setUser(response.user)
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        setIsLoading(true)
        try {
            await auth.logout()
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
