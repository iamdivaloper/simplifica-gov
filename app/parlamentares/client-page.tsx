"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, FileText, TrendingUp, Award, ExternalLink, Filter, MapPin, ArrowRight } from "lucide-react"
import { SearchSection } from "./search-section"
import { Parlamentar } from "@/lib/api"

// Extended interface for UI purposes (combining API data with UI-specific fields)
export interface UIParlamentar extends Parlamentar {
    trending?: boolean;
    focus?: string[];
    recentLaw?: string;
    engagement?: "Alta" | "Média" | "Baixa";
    medal?: string;
    color?: string;
    borderColor?: string;
    bgGradient?: string;
}

interface ParliamentariansClientProps {
    initialData: Parlamentar[]
}

export default function ParliamentariansClient({ initialData }: ParliamentariansClientProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState<"todos" | "deputados" | "senadores" | "estado">("todos")

    // Map API data to UI data, adding mock fields for missing UI elements
    const parliamentarians: UIParlamentar[] = initialData.map(p => ({
        ...p,
        trending: p.projetos_aprovados > 10, // Example logic
        focus: ["Educação", "Saúde"], // Mock data as API doesn't provide this yet
        recentLaw: "PL em tramitação", // Mock data
        engagement: p.presenca_sessoes > 90 ? "Alta" : p.presenca_sessoes > 70 ? "Média" : "Baixa",
    }))

    // Filter logic
    const filteredParliamentarians = parliamentarians.filter(p => {
        const matchesSearch =
            p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.partido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.uf.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter =
            filterType === "todos" ||
            (filterType === "deputados" && p.cargo === "Deputado Federal") ||
            (filterType === "senadores" && p.cargo === "Senador") ||
            (filterType === "estado" && p.uf === "SP") // Example hardcoded state filter

        return matchesSearch && matchesFilter
    })

    const topPerformers = parliamentarians
        .sort((a, b) => b.projetos_aprovados - a.projetos_aprovados)
        .slice(0, 3)
        .map((p, index) => ({
            ...p,
            medal: index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉",
            color: index === 0 ? "bg-blue-100 text-blue-700" : index === 1 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800",
            borderColor: index === 0 ? "border-yellow-400" : index === 1 ? "border-gray-300" : "border-orange-300",
            bgGradient: index === 0 ? "from-yellow-50 to-white" : index === 1 ? "from-gray-50 to-white" : "from-orange-50 to-white",
        }))

    const isSearching = searchTerm !== "" || filterType !== "todos"

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="pb-20" role="main">
                <SearchSection
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filterType={filterType}
                    onFilterChange={setFilterType}
                />

                <div className="container mx-auto px-4 py-12 space-y-16">
                    {isSearching ? (
                        <>
                            {/* All Parliamentarians (Search Results) */}
                            <section aria-labelledby="search-results-heading">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 id="search-results-heading" className="text-3xl font-bold text-gray-900 mb-2">Resultados da Busca</h2>
                                        <p className="text-gray-600">Encontramos {filteredParliamentarians.length} parlamentares</p>
                                    </div>
                                    <Button variant="outline" className="gap-2 border-gray-200 hover:bg-gray-50" aria-label="Filtrar resultados">
                                        <Filter className="h-4 w-4 text-gray-500" aria-hidden="true" />
                                        <span className="hidden sm:inline text-gray-700">Filtros</span>
                                    </Button>
                                </div>

                                <div className="grid gap-6" role="list">
                                    {filteredParliamentarians.length > 0 ? (
                                        filteredParliamentarians.map((person) => (
                                            <article key={person.id} role="listitem">
                                                <Card className="hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group overflow-hidden bg-white">
                                                    <CardContent className="p-6">
                                                        <div className="flex flex-col md:flex-row gap-8">
                                                            {/* Avatar & Basic Info */}
                                                            <div className="flex items-center gap-6 md:w-2/5">
                                                                <div className="relative">
                                                                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                                                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-400 text-white text-2xl font-bold">
                                                                            {person.nome.split(" ").map((n) => n[0]).join("")}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <Badge className="absolute -bottom-2 -right-2 bg-white text-gray-900 border border-gray-200 shadow-sm px-2 py-0.5 text-xs">
                                                                        {person.partido}
                                                                    </Badge>
                                                                </div>

                                                                <div className="flex-1">
                                                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                                        {person.nome}
                                                                    </h3>
                                                                    <div className="flex items-center gap-2 text-gray-500 mb-3">
                                                                        <span className="font-medium">{person.cargo}</span>
                                                                        <span className="text-gray-300">•</span>
                                                                        <div className="flex items-center gap-1 text-sm">
                                                                            <MapPin className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                                                                            {person.uf}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {person.focus?.slice(0, 2).map((area) => (
                                                                            <Badge key={area} variant="secondary" className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200">
                                                                                {area}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Stats */}
                                                            <div className="md:w-2/5 flex items-center justify-around bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold text-gray-900 mb-1">{person.projetos_apresentados}</div>
                                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-1">
                                                                        <FileText className="h-3 w-3" aria-hidden="true" />
                                                                        Projetos
                                                                    </div>
                                                                </div>
                                                                <div className="w-px h-10 bg-gray-200"></div>
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold text-green-600 mb-1">{person.projetos_aprovados}</div>
                                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-1">
                                                                        <Award className="h-3 w-3" aria-hidden="true" />
                                                                        Aprovados
                                                                    </div>
                                                                </div>
                                                                <div className="w-px h-10 bg-gray-200"></div>
                                                                <div className="text-center">
                                                                    <div className="text-sm font-bold text-blue-600 mb-1 bg-blue-50 px-2 py-1 rounded-full">
                                                                        {person.engagement}
                                                                    </div>
                                                                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center justify-center gap-1">
                                                                        <TrendingUp className="h-3 w-3" aria-hidden="true" />
                                                                        Engajamento
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Actions */}
                                                            <div className="md:w-1/5 flex items-center">
                                                                <Link href={`/parlamentares/${person.id}`} className="w-full" aria-label={`Ver trajetória de ${person.nome}`}>
                                                                    <Button className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-100 hover:border-blue-200 font-bold shadow-sm h-12">
                                                                        Conhecer trajetória
                                                                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </article>
                                        ))
                                    ) : (
                                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200" role="alert">
                                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum político encontrado</h3>
                                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                                Não encontramos ninguém com esses critérios. Tente buscar pelo nome ou limpar os filtros para ver todos.
                                            </p>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSearchTerm("")
                                                    setFilterType("todos")
                                                }}
                                                className="font-semibold"
                                            >
                                                Limpar busca e filtros
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            {/* Top Performers (Default First) */}
                            <section aria-labelledby="top-performers-heading">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Award className="h-7 w-7 text-yellow-600" aria-hidden="true" />
                                            <h2 id="top-performers-heading" className="text-3xl font-bold text-gray-900">Quem trabalhou mais este mês?</h2>
                                        </div>
                                        <p className="text-gray-600">Parlamentares com maior número de leis aprovadas recentemente</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 mb-8" role="list">
                                    {topPerformers.map((person, index) => (
                                        <article key={person.id} role="listitem">
                                            <Card
                                                className="h-full hover:shadow-xl transition-all border border-gray-100 group cursor-pointer bg-white relative overflow-visible"
                                            >
                                                {/* Red Dot for Top 1 */}
                                                {index === 0 && (
                                                    <div className="absolute top-4 right-4 z-10">
                                                        <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-sm" aria-label="Destaque"></div>
                                                    </div>
                                                )}

                                                <CardContent className="p-6 flex flex-col h-full text-center">
                                                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white shadow-lg ring-2 ring-gray-50">
                                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                                                            {person.nome.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="mb-4">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                            {person.nome}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 font-medium">
                                                            {person.cargo} • {person.partido}/{person.uf}
                                                        </p>
                                                    </div>

                                                    <div className="bg-green-50 text-green-700 font-bold py-2 px-4 rounded-lg mb-6 inline-block mx-auto border border-green-100">
                                                        {person.projetos_aprovados} leis aprovadas
                                                    </div>

                                                    <div className="mt-auto w-full pt-4 border-t border-gray-50">
                                                        <Link href={`/parlamentares/${person.id}`} aria-label={`Ver perfil de ${person.nome}`}>
                                                            <Button className="w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-100 font-semibold shadow-sm hover:shadow-md transition-all">
                                                                Ver Perfil
                                                                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            {/* All Parliamentarians */}
                            <section aria-labelledby="all-parliamentarians-heading">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 id="all-parliamentarians-heading" className="text-3xl font-bold text-gray-900 mb-2">Todos os Parlamentares</h2>
                                        <p className="text-gray-600">Veja a lista completa e filtre como preferir</p>
                                    </div>
                                    <Button variant="outline" className="gap-2" aria-label="Filtrar parlamentares">
                                        <Filter className="h-4 w-4" aria-hidden="true" />
                                        <span className="hidden sm:inline">Filtros</span>
                                    </Button>
                                </div>

                                <div className="grid gap-6" role="list">
                                    {filteredParliamentarians.length > 0 ? (
                                        filteredParliamentarians.map((person) => (
                                            <article key={person.id} role="listitem">
                                                <Card className="hover:shadow-xl transition-all border border-gray-100 group overflow-hidden bg-white">
                                                    <CardContent className="p-6">
                                                        <div className="flex flex-col md:flex-row gap-6">
                                                            {/* Avatar & Basic Info */}
                                                            <div className="flex items-start gap-4 md:w-1/3">
                                                                <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-white shadow-md flex-shrink-0 ring-1 ring-gray-100">
                                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xl font-bold">
                                                                        {person.nome.split(" ").map((n) => n[0]).join("")}
                                                                    </AvatarFallback>
                                                                </Avatar>

                                                                <div className="flex-1">
                                                                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                                        {person.nome}
                                                                    </h3>
                                                                    <p className="text-sm text-gray-500 mb-2 font-medium">
                                                                        {person.cargo}
                                                                    </p>
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge className="bg-blue-50 text-blue-700 border-blue-100 font-semibold hover:bg-blue-100">
                                                                            {person.partido}
                                                                        </Badge>
                                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                            <MapPin className="h-3 w-3" aria-hidden="true" />
                                                                            {person.uf}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Stats */}
                                                            <div className="md:w-1/3 space-y-3">
                                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                                        <FileText className="h-4 w-4 text-blue-500" aria-hidden="true" />
                                                                        Projetos criados
                                                                    </div>
                                                                    <span className="text-lg font-bold text-gray-900">{person.projetos_apresentados}</span>
                                                                </div>

                                                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                                        <Award className="h-4 w-4 text-green-600" aria-hidden="true" />
                                                                        Leis aprovadas
                                                                    </div>
                                                                    <span className="text-lg font-bold text-green-700">{person.projetos_aprovados}</span>
                                                                </div>
                                                            </div>

                                                            {/* Focus Areas & Actions */}
                                                            <div className="md:w-1/3 flex flex-col justify-between">
                                                                <div>
                                                                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Áreas de atuação:</p>
                                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                                        {person.focus?.map((area) => (
                                                                            <Badge key={area} variant="outline" className="text-xs bg-white text-gray-600 border-gray-200">
                                                                                {area}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <Link href={`/parlamentares/${person.id}`} aria-label={`Ver ficha completa de ${person.nome}`}>
                                                                    <Button className="w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-100 font-semibold shadow-sm hover:shadow-md transition-all">
                                                                        Ver ficha completa
                                                                        <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </article>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-blue-50 rounded-xl border border-blue-100 p-8 animate-in fade-in slide-in-from-top-4" role="alert">
                                            <div className="flex justify-center mb-4">
                                                <div className="bg-blue-100 p-3 rounded-full">
                                                    <Search className="h-8 w-8 text-blue-600" aria-hidden="true" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum parlamentar encontrado</h3>
                                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                                Poxa, não encontramos ninguém com esse nome ou filtro. 😕 Que tal tentar apenas o primeiro nome ou limpar os filtros?
                                            </p>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSearchTerm("")
                                                    setFilterType("todos")
                                                }}
                                                className="bg-white hover:bg-gray-50 border-blue-200 text-blue-600 font-semibold"
                                            >
                                                Limpar Filtros
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    )}

                    {/* CTA Section */}
                    <section className="bg-white rounded-2xl p-8 md:p-12 text-center border border-blue-100 shadow-lg relative overflow-hidden" aria-labelledby="cta-heading">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"></div>
                        <div className="relative z-10">
                            <h2 id="cta-heading" className="text-3xl font-bold mb-4 text-gray-900">Quer saber tudo sobre um político?</h2>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Salve seus favoritos e o Simplinho te avisa sempre que eles propuserem algo novo.
                                <span className="block text-sm mt-2 text-blue-600 font-medium">Sem spam, prometemos! 🤞</span>
                            </p>
                            <Button size="lg" className="font-bold shadow-xl bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-full transition-all hover:scale-105">
                                Criar minha lista de acompanhamento
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
