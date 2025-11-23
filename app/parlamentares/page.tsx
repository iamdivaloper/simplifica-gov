import { Suspense } from "react"
import ParliamentariansClient from "./client-page"
import { api } from "@/lib/api"

export default async function ParliamentariansPage() {
    let parliamentarians: any[] = []

    try {
        parliamentarians = await api.getParlamentares()
    } catch (error) {
        console.error("Failed to fetch parliamentarians", error)
    }

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
            <ParliamentariansClient initialData={parliamentarians} />
        </Suspense>
    )
}
