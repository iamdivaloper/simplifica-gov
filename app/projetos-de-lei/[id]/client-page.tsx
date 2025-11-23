"use client"

import { useState } from "react"
import Link from "next/link"
import { Breadcrumb } from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Share2,
  FileText,
  ShieldCheck,
  ExternalLink,
  Star,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
} from "lucide-react"
import { Lei, api } from "@/lib/api"

interface ProjectDetailsClientProps {
  lei: Lei
  initialIsFavorited: boolean
}

export default function ProjectDetailsClient({ lei, initialIsFavorited }: ProjectDetailsClientProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isFollowing, setIsFollowing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    fullText: false,
    timeline: true,
    impact: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFavorite = async () => {
    try {
      if (isFavorited) {
        await api.removeFavorito(lei.id)
      } else {
        await api.addFavorito(lei.id)
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error("Failed to toggle favorite", error)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${lei.tipo} ${lei.numero}/${lei.ano} - ${lei.ementa}`,
        text: "Confira este projeto de lei no SimplificaGov",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="pb-20">
        {/* Header / Title Area */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: "Projetos de Lei", href: "/projetos-de-lei" },
                { label: `${lei.tipo} ${lei.numero}/${lei.ano}` },
              ]}
              className="mb-6"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-50 text-blue-700 border border-blue-100 font-semibold">
                Tecnologia
              </Badge>
              <Badge variant="outline" className="font-medium border-gray-200">
                {lei.tipo} {lei.numero}/{lei.ano}
              </Badge>
              <Badge className="bg-green-50 text-green-700 border border-green-100 font-medium">
                {lei.situacao}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {lei.ementa}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Atualizado recentemente
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Câmara dos Deputados
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Apresentado em {new Date(lei.data_apresentacao).toLocaleDateString('pt-BR')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={handleFavorite}
                aria-pressed={isFavorited}
                aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                className={`font-semibold rounded-full ${isFavorited ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <Star className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} aria-hidden="true" />
                {isFavorited ? "Favoritado" : "Favoritar"}
              </Button>
              <Button
                variant={isFollowing ? "default" : "outline"}
                onClick={() => setIsFollowing(!isFollowing)}
                aria-pressed={isFollowing}
                aria-label={isFollowing ? "Deixar de seguir atualizações" : "Seguir atualizações deste projeto"}
                className={`font-semibold rounded-full ${isFollowing ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <Bell className="h-4 w-4 mr-2" aria-hidden="true" />
                {isFollowing ? "Seguindo" : "Seguir Atualizações"}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="font-semibold rounded-full border-gray-200 hover:border-blue-300"
                aria-label="Compartilhar este projeto"
              >
                <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* What Changes for You - Highlight */}
              <section aria-labelledby="impact-heading">
                <Card className="border border-blue-100 bg-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 id="impact-heading" className="text-2xl font-bold text-gray-900 mb-3">
                          O que muda para você?
                        </h2>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                          {lei.traducao?.resumo}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Pontos Positivos
                            </h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {lei.traducao?.pontos_positivos?.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5" aria-hidden="true" /> Pontos de Atenção
                            </h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              {lei.traducao?.pontos_negativos?.map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Timeline */}
              <section aria-labelledby="timeline-heading">
                <Card className="border border-gray-100">
                  <CardContent className="p-6">
                    <button
                      onClick={() => toggleSection("timeline")}
                      aria-expanded={expandedSections.timeline}
                      aria-controls="timeline-content"
                      className="w-full flex items-center justify-between mb-4 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                    >
                      <h3 id="timeline-heading" className="text-lg font-bold text-gray-900">Linha do Tempo da Tramitação</h3>
                      {expandedSections.timeline ? (
                        <ChevronUp className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>

                    {expandedSections.timeline && (
                      <div id="timeline-content" className="space-y-4">
                        {[
                          {
                            date: new Date().toLocaleDateString('pt-BR'),
                            status: lei.situacao,
                            description: "Situação atual do projeto",
                            current: true,
                          },
                          {
                            date: new Date(lei.data_apresentacao).toLocaleDateString('pt-BR'),
                            status: "Apresentado",
                            description: "Projeto apresentado na Câmara dos Deputados",
                            current: false,
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-3 h-3 rounded-full ${item.current ? "bg-blue-600 ring-4 ring-blue-100" : "bg-gray-300"
                                  }`}
                                aria-hidden="true"
                              />
                              {index < 1 && <div className="w-0.5 h-12 bg-gray-200" aria-hidden="true" />}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                                <Badge
                                  className={
                                    item.current
                                      ? "bg-blue-600 text-white hover:bg-blue-700"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Summary */}
              <section aria-labelledby="summary-heading">
                <Card className="border border-gray-100">
                  <CardContent className="p-6">
                    <h3 id="summary-heading" className="text-lg font-bold text-gray-900 mb-4">Resumo do Projeto</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {lei.traducao?.resumo || lei.ementa}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Full Text - Collapsible */}
              <section aria-labelledby="fulltext-heading">
                <Card className="border border-gray-100">
                  <CardContent className="p-6">
                    <button
                      onClick={() => toggleSection("fullText")}
                      aria-expanded={expandedSections.fullText}
                      aria-controls="fulltext-content"
                      className="w-full flex items-center justify-between mb-4 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                    >
                      <h3 id="fulltext-heading" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5" aria-hidden="true" />
                        Texto Completo do Projeto
                      </h3>
                      {expandedSections.fullText ? (
                        <ChevronUp className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>

                    {expandedSections.fullText && (
                      <div id="fulltext-content" className="prose max-w-none">
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {lei.ementa}
                        </p>
                        <div className="mt-6">
                          <Button variant="outline" className="gap-2 rounded-full border-gray-200 hover:border-blue-300" asChild>
                            <a href={lei.link_inteiro_teor} target="_blank" rel="noopener noreferrer" aria-label="Ver texto oficial no site da Câmara (abre em nova aba)">
                              <ExternalLink className="h-4 w-4" aria-hidden="true" />
                              Ver texto oficial no site da Câmara
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Related Projects */}
              <section aria-labelledby="related-heading">
                <Card className="border border-gray-100">
                  <CardContent className="p-6">
                    <h3 id="related-heading" className="text-lg font-bold text-gray-900 mb-4">Projetos Relacionados</h3>
                    <div className="space-y-3">
                      {[
                        { title: "PL 2768/2022 - Regulamentação de IA", tag: "Tecnologia" },
                        { title: "PL 1234/2023 - Proteção de Dados Pessoais", tag: "Privacidade" },
                      ].map((project, index) => (
                        <Link
                          key={index}
                          href="#"
                          className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                          aria-label={`Ver projeto relacionado: ${project.title}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge className="mb-2 bg-blue-50 text-blue-700 border border-blue-100">{project.tag}</Badge>
                              <p className="font-semibold text-gray-900">{project.title}</p>
                            </div>
                            <ExternalLink className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Author Info */}
              <Card className="border border-gray-100 sticky top-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quem propôs esta lei?</h3>
                  <div className="flex flex-col items-center text-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg ring-2 ring-gray-100">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                        {lei.autores[0]?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{lei.autores[0]}</h4>
                      <p className="text-gray-600 text-sm">Deputado Federal</p>
                    </div>
                    <Link href="/parlamentares" className="w-full">
                      <Button variant="outline" className="w-full font-semibold rounded-full border-gray-200 hover:border-blue-300">
                        <User className="h-4 w-4 mr-2" aria-hidden="true" />
                        Ver Perfil Completo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border border-gray-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Informações Rápidas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-50 text-green-700 border border-green-100">
                        {lei.situacao}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tipo</span>
                      <span className="text-sm font-semibold text-gray-900">{lei.tipo}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Número</span>
                      <span className="text-sm font-semibold text-gray-900">{lei.numero}/{lei.ano}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Apresentação</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {new Date(lei.data_apresentacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Card */}
              <Card className="border border-blue-100 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Compartilhe este projeto</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Ajude mais pessoas a entenderem esta lei 📢
                  </p>
                  <Button onClick={handleShare} className="w-full font-semibold rounded-full bg-blue-600 hover:bg-blue-700">
                    <Share2 className="h-4 w-4 mr-2" aria-hidden="true" />
                    Compartilhar
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
