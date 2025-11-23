import { Suspense } from "react"
import { notFound } from "next/navigation"
import { api } from "@/lib/api"
import ProjectDetailsClient from "./client-page"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailsPage({ params }: PageProps) {
    const { id } = await params

    let lei
    let isFavorited = false

    try {
        lei = await api.getLeiById(id)
        isFavorited = await api.isFavorito(id)
    } catch (error) {
        console.error("Failed to fetch project details", error)
        notFound()
    }

    if (!lei) {
        notFound()
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <ProjectDetailsClient lei={lei} initialIsFavorited={isFavorited} />
        </Suspense>
    )
}
