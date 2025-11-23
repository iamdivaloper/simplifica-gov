"use client"

import React from "react"
import Link from "next/link"

/**
 * Skip links for keyboard navigation accessibility
 * Allows users to skip to main content or navigation
 */
export function SkipLinks() {
    return (
        <div className="sr-only focus-within:not-sr-only">
            <Link
                href="#main-content"
                className="fixed top-4 left-4 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 transition-all"
            >
                Pular para o conteúdo principal
            </Link>
            <Link
                href="#navigation"
                className="fixed top-4 left-48 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 transition-all ml-2"
            >
                Pular para a navegação
            </Link>
        </div>
    )
}
