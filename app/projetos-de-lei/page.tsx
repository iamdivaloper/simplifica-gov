import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Mic, Star, ArrowRight, Flame, MapPin, Users, Building2 } from "lucide-react"

export default function LawProjectsHub() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SiteHeader />

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
              <p className="text-lg text-gray-600">Busque por temas, palavras simples ou número do PL...</p>

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
          {/* Top 10 Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-500 fill-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Mais vistos da semana</h2>
              </div>
              <Button variant="link" className="text-primary">
                Ver todos
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: "pl-2630",
                  title: "PL 2630 — Regras para Redes Sociais",
                  tag: "Tecnologia",
                  summary:
                    "Define regras para moderação de conteúdo e transparência em redes sociais. Busca combater notícias falsas.",
                  views: "Alta procura",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  id: "pl-creches",
                  title: "Ampliação de Vagas em Creches",
                  tag: "Educação",
                  summary:
                    "Propõe obrigar municípios a zerar filas de creches em até 2 anos, com repasse federal extra.",
                  views: "Tendência",
                  color: "bg-green-100 text-green-700",
                },
                {
                  id: "pl-transporte",
                  title: "Tarifa Zero no Transporte",
                  tag: "Transporte",
                  summary:
                    "Cria um fundo nacional para subsidiar o transporte público gratuito em cidades com mais de 200 mil habitantes.",
                  views: "Muito acessado",
                  color: "bg-yellow-100 text-yellow-800",
                },
              ].map((project) => (
                <Link href={`/projetos-de-lei/${project.id}`} key={project.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-gray-200 group cursor-pointer">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className={`${project.color} border-none font-bold`}>
                          {project.tag}
                        </Badge>
                        <div className="flex items-center text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          <Flame className="h-3 w-3 mr-1" /> {project.views}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{project.summary}</p>
                      <Button className="w-full group-hover:bg-primary/90">
                        Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
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
