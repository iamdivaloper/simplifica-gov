"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/auth"

interface ProtectedRouteProps {
    children: React.ReactNode
    redirectTo?: string
}

/**
 * ProtectedRoute component
 * Wraps pages that require authentication
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = auth.isAuthenticated()
            setIsAuthenticated(authenticated)

            if (!authenticated) {
                // Store the intended destination to redirect after login
                if (typeof window !== "undefined") {
                    sessionStorage.setItem("redirectAfterLogin", pathname)
                }
                router.replace(redirectTo)
            }
        }

        // Check immediately
        checkAuth()

        // Listen for storage events (in case of logout in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "simplificagov_token") {
                checkAuth()
            }
        }

        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [pathname, redirectTo, router])

    // Show nothing while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        )
    }

    // Show nothing if not authenticated (will redirect)
    if (!isAuthenticated) {
        return null
    }

    // Show protected content if authenticated
    return <>{children}</>
}
