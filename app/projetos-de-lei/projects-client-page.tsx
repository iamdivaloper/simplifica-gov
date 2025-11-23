"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, ArrowRight, Star, Users, Building2, Search, AlertCircle } from "lucide-react"
import { SearchSection } from "./search-section"
import { Lei } from "@/lib/api"

interface ProjectsClientPageProps {
    initialLeis: Lei[]
}

export function ProjectsClientPage({ initialLeis }: ProjectsClientPageProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilter, setActiveFilter] = useState("Todos")

    // Mock visual data augmentation
    const augmentedLeis = initialLeis.map((lei, index) => ({
        ...lei,
        views: `${(12 - index * 2.5).toFixed(1)}k visualizações`,
        rank: index + 1,
        medal: index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉",
        color: index === 0 ? "bg-yellow-100 text-yellow-800" : index === 1 ? "bg-cyan-100 text-cyan-700" : "bg-blue-100 text-blue-700",
        borderColor: index === 0 ? "border-yellow-400" : index === 1 ? "border-cyan-400" : "border-blue-400",
        bgGradient: index === 0 ? "from-yellow-50 to-white" : index === 1 ? "from-cyan-50 to-white" : "from-blue-50 to-white",
        category: ["Saúde", "Educação", "Economia", "Segurança", "Transporte"][index % 5] // Mock category for filtering
    }))

    const filteredLeis = augmentedLeis.filter(lei => {
        const matchesSearch =
            lei.ementa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lei.traducao?.resumo || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${lei.tipo} ${lei.numero}/${lei.ano}`.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter =
            activeFilter === "Todos" ||
            lei.category === activeFilter

        return matchesSearch && matchesFilter
    })

    const podiumLeis = filteredLeis.slice(0, 3)
    const isSearching = searchTerm !== "" || activeFilter !== "Todos"

    return (
        <>
            <SearchSection
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <div className="container mx-auto px-4 py-12 space-y-16">
                {filteredLeis.length > 0 ? (
                    <>
                        {/* Top 3 Section */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Flame className="h-7 w-7 text-orange-500 fill-orange-500" />
                                        <h2 className="text-3xl font-bold text-gray-900">
                                            {isSearching ? "Resultados da Busca" : "Top 3 da Semana"}
                                        </h2>
                                    </div>
                                    <p className="text-gray-600">
                                        {isSearching
                                            ? `Encontramos ${filteredLeis.length} projetos para sua pesquisa`
                                            : "Os projetos que mais chamaram atenção dos brasileiros"}
                                    </p>
                                </div>
                                {!isSearching && (
                                    <Button variant="link" className="text-primary font-semibold">
                                        Ver todos →
                                    </Button>
                                )}
                            </div>

                            {/* Podium Layout */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {podiumLeis.map((project) => (
                                    <Link href={`/projetos-de-lei/${project.id}`} key={project.id}>
                                        <Card
                                            className={`h-full hover:shadow-2xl transition-all border-2 ${project.borderColor} group cursor-pointer relative overflow-hidden bg-gradient-to-b ${project.bgGradient} ${project.rank === 1 && !isSearching ? "md:scale-105 shadow-xl" : ""
                                                }`}
                                        >
                                            {/* Rank Badge (only show if not searching or if it's still top ranked) */}
                                            {!isSearching && (
                                                <div className="absolute top-4 right-4 z-10">
                                                    <div
                                                        className={`text-4xl transform transition-transform group-hover:scale-125 ${project.rank === 1 ? "animate-pulse" : ""
                                                            }`}
                                                    >
                                                        {project.medal}
                                                    </div>
                                                </div>
                                            )}

                                            <CardContent className="p-6 flex flex-col h-full">
                                                <div className="flex items-start mb-4">
                                                    <Badge variant="outline" className={`${project.color} border-none font-bold text-sm`}>
                                                        {project.tipo} {project.numero}/{project.ano}
                                                    </Badge>
                                                </div>

                                                <div className="mb-3">
                                                    {!isSearching && (
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-2xl font-black text-gray-900">#{project.rank}</span>
                                                            <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent"></div>
                                                        </div>
                                                    )}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                                        {project.ementa}
                                                    </h3>
                                                </div>

                                                <p className="text-gray-700 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                                                    {project.traducao?.resumo || project.ementa}
                                                </p>

                                                <div className="space-y-3 mt-auto">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-1 text-cyan-600 font-semibold">
                                                            <Flame className="h-4 w-4 fill-cyan-500" />
                                                            <span>{project.views}</span>
                                                        </div>
                                                        {project.rank === 1 && !isSearching && (
                                                            <Badge className="bg-yellow-500 text-white border-0 text-xs font-bold">
                                                                🔥 MAIS VISTO
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-md">
                                                        Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Favorites Section (Hide when searching to focus on results) */}
                        {!isSearching && (
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <Star className="h-7 w-7 text-yellow-500 fill-yellow-500 animate-pulse" />
                                    <h2 className="text-2xl font-bold text-gray-900">O Queridinho da Galera</h2>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl border-2 border-yellow-400 p-8 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                                    <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                                        <div>
                                            <Badge className="mb-4 bg-yellow-400 text-yellow-900 hover:bg-yellow-500 border-none px-3 py-1 text-sm font-bold shadow-sm">
                                                ⭐ Aprovado pela Comunidade
                                            </Badge>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                                Isenção de IR para até 5 salários
                                            </h3>
                                            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                                                Esse é o projeto que todo mundo tá falando! Ele propõe aumentar a faixa de isenção do Imposto de Renda, o que significa mais dinheiro no bolso para a classe média.
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                                <div className="flex items-center text-sm font-medium text-gray-600 bg-white/80 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
                                                    <Users className="h-4 w-4 mr-2 text-yellow-600" />
                                                    Impacta 12 milhões de pessoas
                                                </div>
                                                <div className="flex items-center text-sm font-medium text-gray-600 bg-white/80 px-3 py-1.5 rounded-full border border-yellow-200 shadow-sm">
                                                    <Building2 className="h-4 w-4 mr-2 text-yellow-600" />
                                                    Economia
                                                </div>
                                            </div>

                                            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold shadow-md text-lg h-12 px-8">
                                                Entender o projeto
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>

                                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border-2 border-yellow-200 flex flex-col items-center justify-center text-center shadow-inner">
                                            <div className="text-lg font-semibold text-gray-600 mb-2">Aprovação Popular</div>
                                            <div className="text-6xl font-black text-yellow-500 mb-2 tracking-tighter">92%</div>
                                            <div className="text-sm text-gray-500 mb-6">baseado em 15.432 votos</div>

                                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                                                <div
                                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-1000 ease-out"
                                                    style={{ width: "92%" }}
                                                ></div>
                                            </div>
                                            <p className="mt-4 text-sm text-gray-600 italic">
                                                "Finalmente uma proposta que ajuda quem trabalha!"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 bg-blue-50 rounded-2xl border border-blue-100 px-4 animate-in fade-in slide-in-from-top-4">
                        <div className="flex justify-center mb-6">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <Search className="h-10 w-10 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Poxa, não encontramos nada com "{searchTerm}" 😕
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            Que tal tentar palavras mais gerais como "Saúde", "Educação" ou limpar os filtros?
                        </p>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("")
                                setActiveFilter("Todos")
                            }}
                            className="bg-white hover:bg-gray-50 border-blue-200 text-blue-700 font-bold shadow-sm"
                        >
                            Limpar busca e filtros
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}
