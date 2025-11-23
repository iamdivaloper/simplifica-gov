"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type AccessibilityMode = "default" | "minimalist" | "high-contrast"

interface AccessibilityContextType {
    mode: AccessibilityMode
    setMode: (mode: AccessibilityMode) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<AccessibilityMode>("default")

    useEffect(() => {
        // Load preference from localStorage
        const storedMode = localStorage.getItem("accessibility-mode") as AccessibilityMode
        if (storedMode) {
            setMode(storedMode)
        }
    }, [])

    useEffect(() => {
        // Apply mode to document body
        const root = document.documentElement
        root.classList.remove("minimalist", "high-contrast")

        if (mode !== "default") {
            root.classList.add(mode)
        }

        // Save preference
        localStorage.setItem("accessibility-mode", mode)
    }, [mode])

    return (
        <AccessibilityContext.Provider value={{ mode, setMode }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext)
    if (context === undefined) {
        throw new Error("useAccessibility must be used within an AccessibilityProvider")
    }
    return context
}
