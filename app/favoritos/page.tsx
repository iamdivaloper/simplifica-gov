import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Trash2 } from "lucide-react"

export default function FavoritosPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SiteHeader />

      <main className="pb-20">
        <section className="bg-white border-b py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="h-8 w-8 text-yellow-600 fill-yellow-600" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Seus Projetos Favoritos</h1>
              <p className="text-lg text-gray-600">
                Acompanhe de perto as propostas que mais importam para você. Você receberá atualizações quando houver
                novidades.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Empty State (Hidden for demo purposes) */}
          {/* 
          <div className="text-center py-20">
            <div className="bg-gray-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Você ainda não tem favoritos</h2>
            <p className="text-gray-500 mb-8">Explore os projetos de lei e clique na estrela para salvar.</p>
            <Link href="/projetos-de-lei">
              <Button size="lg">Explorar Projetos</Button>
            </Link>
          </div> 
          */}

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
                date: "Adicionado em 18/05/2024",
              },
              {
                id: "pl-transporte",
                title: "Tarifa Zero no Transporte",
                tag: "Transporte",
                summary:
                  "Cria um fundo nacional para subsidiar o transporte público gratuito em cidades com mais de 200 mil habitantes.",
                views: "Muito acessado",
                color: "bg-yellow-100 text-yellow-800",
                date: "Adicionado hoje",
              },
            ].map((project) => (
              <div key={project.id} className="relative group">
                <Link href={`/projetos-de-lei/${project.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow border-gray-200 cursor-pointer">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className={`${project.color} border-none font-bold`}>
                          {project.tag}
                        </Badge>
                        <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" /> Salvo
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{project.summary}</p>
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                        <span>{project.date}</span>
                        <Button variant="ghost" className="h-8 px-2 text-primary group-hover:bg-blue-50">
                          Ver atualizações <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red-50 hover:text-red-600"
                  title="Remover dos favoritos"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
