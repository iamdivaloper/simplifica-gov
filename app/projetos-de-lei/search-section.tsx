"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mic, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSectionProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    activeFilter: string
    onFilterChange: (value: string) => void
}

export function SearchSection({ searchTerm, onSearchChange, activeFilter, onFilterChange }: SearchSectionProps) {
    return (
        <section className="bg-white border-b pb-12 pt-8" aria-label="Busca e Filtros">
            <div className="container mx-auto px-4">
                {/* Hyperlocal Chip */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span>
                            Projetos que afetam <strong>São Paulo, SP</strong> (01310-000)
                        </span>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">O que está acontecendo no Brasil?</h1>
                    <p className="text-lg text-gray-600">Digite um tema, uma palavra ou o número da lei. O Simplinho te ajuda a achar.</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto" role="search">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="h-14 pl-12 pr-12 rounded-full text-lg shadow-md border-gray-200 focus-visible:ring-blue-600"
                                placeholder="Ex: creches, salário mínimo, internet..."
                                aria-label="Buscar projetos de lei por tema, palavra ou número"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 rounded-full hover:bg-gray-100"
                                aria-label="Busca por voz"
                            >
                                <Mic className="h-5 w-5 text-blue-600" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2" role="group" aria-label="Filtros de projetos">
                        {[
                            "Todos",
                            "Saúde",
                            "Trabalho",
                            "Transporte",
                            "Segurança",
                            "Educação",
                            "Meio Ambiente",
                            "Moradia",
                            "Seu Bairro",
                        ].map((filter) => (
                            <Button
                                key={filter}
                                variant={activeFilter === filter ? "default" : "outline"}
                                onClick={() => onFilterChange(filter)}
                                aria-pressed={activeFilter === filter}
                                className={cn(
                                    "px-4 py-2 text-sm rounded-full transition-all border-2",
                                    activeFilter === filter
                                        ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50"
                                )}
                            >
                                {filter}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
