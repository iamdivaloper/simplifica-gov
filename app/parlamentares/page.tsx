"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, MapPin, FileText, TrendingUp, Award, ExternalLink, Filter } from "lucide-react"
import Image from "next/image"

export default function ParliamentariansPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState<"todos" | "deputados" | "senadores" | "estado">("todos")
    const parliamentarians = [
        {
            id: "dep-maria-silva",
            name: "Maria Silva",
            party: "PT",
            state: "SP",
            role: "Deputada Federal",
            photo: "/placeholder-avatar.jpg",
            proposals: 42,
            approved: 8,
            trending: true,
            focus: ["Educação", "Saúde"],
            recentLaw: "PL 2630 - Regras para Redes Sociais",
            engagement: "Alta",
        },
        {
            id: "sen-joao-santos",
            name: "João Santos",
            party: "PSDB",
            state: "RJ",
            role: "Senador",
            photo: "/placeholder-avatar.jpg",
            proposals: 28,
            approved: 12,
            trending: false,
            focus: ["Economia", "Infraestrutura"],
            recentLaw: "Tarifa Zero no Transporte",
            engagement: "Média",
        },
        {
            id: "dep-ana-costa",
            name: "Ana Costa",
            party: "PSOL",
            state: "MG",
            role: "Deputada Federal",
            photo: "/placeholder-avatar.jpg",
            proposals: 35,
            approved: 6,
            trending: true,
            focus: ["Meio Ambiente", "Direitos Humanos"],
            recentLaw: "Ampliação de Vagas em Creches",
            engagement: "Alta",
        },
        {
            id: "sen-carlos-lima",
            name: "Carlos Lima",
            party: "PL",
            state: "RS",
            role: "Senador",
            photo: "/placeholder-avatar.jpg",
            proposals: 31,
            approved: 9,
            trending: false,
            focus: ["Segurança", "Agricultura"],
            recentLaw: "Reforma Tributária",
            engagement: "Média",
        },
        {
            id: "dep-julia-rocha",
            name: "Júlia Rocha",
            party: "PDT",
            state: "BA",
            role: "Deputada Federal",
            photo: "/placeholder-avatar.jpg",
            proposals: 38,
            approved: 11,
            trending: true,
            focus: ["Cultura", "Tecnologia"],
            recentLaw: "Incentivo à Cultura Digital",
            engagement: "Alta",
        },
        {
            id: "sen-roberto-alves",
            name: "Roberto Alves",
            party: "MDB",
            state: "PR",
            role: "Senador",
            photo: "/placeholder-avatar.jpg",
            proposals: 25,
            approved: 7,
            trending: false,
            focus: ["Transporte", "Energia"],
            recentLaw: "Energia Renovável",
            engagement: "Baixa",
        },
    ]

    // Filter logic
    const filteredParliamentarians = parliamentarians.filter(p => {
        const matchesSearch =
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.state.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter =
            filterType === "todos" ||
            (filterType === "deputados" && p.role.includes("Deputad")) ||
            (filterType === "senadores" && p.role.includes("Senador")) ||
            (filterType === "estado" && p.state === "SP")

        return matchesSearch && matchesFilter
    })

    const topPerformers = parliamentarians
        .sort((a, b) => b.approved - a.approved)
        .slice(0, 3)

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pb-20">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Users className="h-12 w-12" />
                                <h1 className="text-4xl md:text-5xl font-bold">Quem representa você?</h1>
                            </div>
                            <p className="text-xl text-blue-100 leading-relaxed">
                                Acompanhe de perto o trabalho de quem cria as leis do nosso país. Transparência total, sem complicação.
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-2xl mx-auto mt-8">
                                <div className="relative flex items-center">
                                    <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                                    <Input
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-14 pl-12 pr-4 rounded-full text-lg bg-white text-gray-900 border-0 shadow-xl"
                                        placeholder="Encontre seu representante por nome..."
                                    />
                                </div>
                            </div>

                            {/* Quick Filters */}
                            <div className="flex flex-wrap justify-center gap-2 pt-4">
                                {[
                                    { key: "todos", label: "Todos" },
                                    { key: "deputados", label: "Deputados" },
                                    { key: "senadores", label: "Senadores" },
                                    { key: "estado", label: "Seu Estado (SP)" },
                                ].map((filter) => (
                                    <Button
                                        key={filter.key}
                                        variant="outline"
                                        onClick={() => setFilterType(filter.key as typeof filterType)}
                                        className={`font-semibold ${filterType === filter.key
                                            ? "bg-white text-blue-700 border-white"
                                            : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                                            } backdrop-blur-sm`}
                                    >
                                        {filter.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12 space-y-12">
                    {/* Top Performers */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="h-7 w-7 text-yellow-600" />
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">Quem trabalhou mais este mês?</h2>
                                <p className="text-gray-600">Parlamentares com maior número de leis aprovadas recentemente</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {topPerformers.map((person, index) => (
                                <Card
                                    key={person.id}
                                    className={`relative overflow-hidden border-2 ${index === 0
                                        ? "border-yellow-400 bg-gradient-to-b from-yellow-50 to-white shadow-xl"
                                        : index === 1
                                            ? "border-gray-300 bg-gradient-to-b from-gray-50 to-white"
                                            : "border-orange-300 bg-gradient-to-b from-orange-50 to-white"
                                        }`}
                                >
                                    {/* Medal */}
                                    <div className="absolute top-4 right-4 text-4xl">
                                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                                    </div>

                                    <CardContent className="p-6 text-center">
                                        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white shadow-lg">
                                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                                                {person.name.split(" ").map((n) => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>

                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {person.role} • {person.party}/{person.state}
                                        </p>

                                        <div className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-lg mb-4">
                                            {person.approved} leis aprovadas
                                        </div>

                                        <Link href={`/parlamentares/${person.id}`}>
                                            <Button className="w-full font-semibold">Ver Perfil</Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* All Parliamentarians */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Todos os Parlamentares</h2>
                                <p className="text-gray-600">Veja a lista completa e filtre como preferir</p>
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filtros
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {filteredParliamentarians.length > 0 ? (
                                filteredParliamentarians.map((person) => (
                                    <Card key={person.id} className="hover:shadow-xl transition-all border-2 border-gray-200 group">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Avatar & Basic Info */}
                                                <div className="flex items-start gap-4 md:w-1/3">
                                                    <Avatar className="h-20 w-20 border-4 border-gray-100 shadow-md flex-shrink-0">
                                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                                                            {person.name.split(" ").map((n) => n[0]).join("")}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                                            {person.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            {person.role}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <Badge className="bg-blue-100 text-blue-700 border-0 font-semibold">
                                                                {person.party}
                                                            </Badge>
                                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                                <MapPin className="h-3 w-3" />
                                                                {person.state}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Stats */}
                                                <div className="md:w-1/3 space-y-3">
                                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                            <FileText className="h-4 w-4 text-blue-600" />
                                                            Projetos criados
                                                        </div>
                                                        <span className="text-lg font-bold text-blue-700">{person.proposals}</span>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                                            <Award className="h-4 w-4 text-green-600" />
                                                            Leis aprovadas
                                                        </div>
                                                        <span className="text-lg font-bold text-green-700">{person.approved}</span>
                                                    </div>

                                                    {person.trending && (
                                                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                                                            <TrendingUp className="h-4 w-4" />
                                                            Em alta esta semana
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Focus Areas & Actions */}
                                                <div className="md:w-1/3 space-y-3">
                                                    <div>
                                                        <p className="text-xs font-semibold text-gray-600 mb-2">Áreas de atuação:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {person.focus.map((area) => (
                                                                <Badge key={area} variant="outline" className="text-xs">
                                                                    {area}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="pt-2">
                                                        <p className="text-xs text-gray-600 mb-1">Última proposta:</p>
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{person.recentLaw}</p>
                                                    </div>

                                                    <Link href={`/parlamentares/${person.id}`}>
                                                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white font-semibold">
                                                            Ver ficha completa
                                                            <ExternalLink className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 text-lg mb-4">
                                        Poxa, não encontramos ninguém com esses filtros. Tente buscar de outra forma.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSearchTerm("")
                                            setFilterType("todos")
                                        }}
                                    >
                                        Limpar Filtros
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Quer saber tudo sobre um político?</h2>
                        <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                            Salve seus favoritos e o Simplinho te avisa sempre que eles propuserem algo novo.
                        </p>
                        <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-xl">
                            Criar minha lista de acompanhamento
                        </Button>
                    </section>
                </div>
            </main>
        </div>
    )
}
