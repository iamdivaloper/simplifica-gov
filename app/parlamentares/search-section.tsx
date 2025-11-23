"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mic, MapPin } from "lucide-react"

interface SearchSectionProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    filterType: string
    onFilterChange: (value: "todos" | "deputados" | "senadores" | "estado") => void
}

export function SearchSection({ searchTerm, onSearchChange, filterType, onFilterChange }: SearchSectionProps) {
    return (
        <section className="bg-white border-b pb-12 pt-8">
            <div className="container mx-auto px-4">
                {/* Hyperlocal Chip */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                        <MapPin className="h-4 w-4" />
                        <span>
                            Mostrando representantes de <strong>São Paulo, SP</strong>
                        </span>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Quem representa você?</h1>
                    <p className="text-lg text-gray-600">Acompanhe de perto o trabalho de quem cria as leis do nosso país.</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="h-14 pl-12 pr-12 rounded-full text-lg shadow-md border-gray-200 focus-visible:ring-primary"
                                placeholder="Busque por nome, partido ou estado..."
                            />
                            <Button variant="ghost" size="icon" className="absolute right-2 rounded-full hover:bg-gray-100">
                                <Mic className="h-5 w-5 text-primary" />
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {[
                            { key: "todos", label: "Todos" },
                            { key: "deputados", label: "Deputados" },
                            { key: "senadores", label: "Senadores" },
                            { key: "estado", label: "Seu Estado (SP)" },
                        ].map((filter) => (
                            <Badge
                                key={filter.key}
                                variant={filterType === filter.key ? "default" : "secondary"}
                                onClick={() => onFilterChange(filter.key as any)}
                                className={`px-4 py-2 text-sm cursor-pointer transition-colors ${filterType === filter.key
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "hover:bg-primary hover:text-white"
                                    }`}
                            >
                                {filter.label}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
