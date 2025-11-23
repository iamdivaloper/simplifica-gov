"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Algo deu errado</h1>
                <p className="text-gray-600 mb-8">
                    Ops! Algo não saiu como planejado. Nossa equipe de esquilos digitais já foi avisada e está correndo para resolver. Que tal tentar de novo em alguns instantes?
                </p>
                <Button
                    onClick={() => reset()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-xl"
                >
                    Tentar novamente
                </Button>
            </div>
        </div>
    )
}
