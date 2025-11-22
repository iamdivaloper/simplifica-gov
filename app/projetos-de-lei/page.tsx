import Link from "next/link"

import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Mic, Star, ArrowRight, Flame, MapPin, Users, Building2 } from "lucide-react"

export default function LawProjectsHub() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <main className="pb-20">
        {/* Hero / Search Section */}
        <section className="bg-white border-b pb-12 pt-8">
          <div className="container mx-auto px-4">
            {/* Hyperlocal Chip */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                <MapPin className="h-4 w-4" />
                <span>
                  Projetos que afetam <strong>São Paulo, SP</strong> (01310-000)
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">O que está acontecendo no Brasil?</h1>
              <p className="text-lg text-gray-600">Digite um tema, uma palavra ou o número da lei. O Simplinho te ajuda a achar.</p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                  <Input
                    className="h-14 pl-12 pr-12 rounded-full text-lg shadow-md border-gray-200 focus-visible:ring-primary"
                    placeholder="Ex: creches, salário mínimo, internet..."
                  />
                  <Button variant="ghost" size="icon" className="absolute right-2 rounded-full hover:bg-gray-100">
                    <Mic className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {[
                  "Saúde",
                  "Trabalho",
                  "Transporte",
                  "Segurança",
                  "Educação",
                  "Meio Ambiente",
                  "Moradia",
                  "Seu Bairro",
                ].map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer transition-colors"
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Top 3 Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="h-7 w-7 text-orange-500 fill-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-900">Top 3 da Semana</h2>
                </div>
                <p className="text-gray-600">Os projetos que mais chamaram atenção dos brasileiros</p>
              </div>
              <Button variant="link" className="text-primary font-semibold">
                Ver todos →
              </Button>
            </div>

            {/* Podium Layout */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  id: "pl-2630",
                  title: "PL 2630 - Regras para Redes Sociais",
                  tag: "Tecnologia",
                  summary:
                    "Define regras para moderação de conteúdo e transparência em redes sociais. Busca combater notícias falsas.",
                  views: "12.5k visualizações",
                  rank: 1,
                  medal: "🥇",
                  color: "bg-blue-100 text-blue-700",
                  borderColor: "border-yellow-400",
                  bgGradient: "from-yellow-50 to-white",
                },
                {
                  id: "pl-creches",
                  title: "Ampliação de Vagas em Creches",
                  tag: "Educação",
                  summary:
                    "Propõe obrigar municípios a zerar filas de creches em até 2 anos, com repasse federal extra.",
                  views: "9.8k visualizações",
                  rank: 2,
                  medal: "🥈",
                  color: "bg-green-100 text-green-700",
                  borderColor: "border-gray-300",
                  bgGradient: "from-gray-50 to-white",
                },
                {
                  id: "pl-transporte",
                  title: "Tarifa Zero no Transporte",
                  tag: "Transporte",
                  summary:
                    "Cria um fundo nacional para subsidiar o transporte público gratuito em cidades com mais de 200 mil habitantes.",
                  views: "7.2k visualizações",
                  rank: 3,
                  medal: "🥉",
                  color: "bg-yellow-100 text-yellow-800",
                  borderColor: "border-orange-300",
                  bgGradient: "from-orange-50 to-white",
                },
              ].map((project, index) => (
                <Link href={`/projetos-de-lei/${project.id}`} key={project.id}>
                  <Card
                    className={`h-full hover:shadow-2xl transition-all border-2 ${project.borderColor} group cursor-pointer relative overflow-hidden bg-gradient-to-b ${project.bgGradient} ${project.rank === 1 ? "md:scale-105 shadow-xl" : ""
                      }`}
                  >
                    {/* Rank Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div
                        className={`text-4xl transform transition-transform group-hover:scale-125 ${project.rank === 1 ? "animate-pulse" : ""
                          }`}
                      >
                        {project.medal}
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-start mb-4">
                        <Badge variant="outline" className={`${project.color} border-none font-bold text-sm`}>
                          {project.tag}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-black text-gray-900">#{project.rank}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent"></div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-orange-600 font-semibold">
                            <Flame className="h-4 w-4 fill-orange-500" />
                            <span>{project.views}</span>
                          </div>
                          {project.rank === 1 && (
                            <Badge className="bg-yellow-500 text-white border-0 text-xs font-bold">
                              🔥 MAIS VISTO
                            </Badge>
                          )}
                        </div>
                        <Button className="w-full group-hover:bg-primary/90 font-semibold shadow-md">
                          Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Favorites Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <h2 className="text-2xl font-bold text-gray-900">Favoritos dos Cidadãos</h2>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
                    ⭐ Aprovado pela Comunidade
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Isenção de IR para até 5 salários</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Projeto que aumenta a faixa de isenção do Imposto de Renda, beneficiando trabalhadores de classe
                    média.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      Afeta 12 milhões de brasileiros
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                      Economia
                    </div>
                  </div>
                  <Button variant="outline" className="border-primary text-primary hover:bg-blue-50 bg-transparent">
                    Ler explicação completa
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-dashed border-gray-300 flex items-center justify-center min-h-[200px]">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">92%</div>
                    <div className="text-sm text-gray-500">de aprovação na enquete pública</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
