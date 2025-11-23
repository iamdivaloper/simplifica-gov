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
              <Badge className="bg-cyan-100 text-cyan-700 border-cyan-200 font-semibold">
                Tecnologia
              </Badge>
              <Badge variant="outline" className="text-gray-700 border-gray-400 font-medium">
                {lei.tipo} {lei.numero}/{lei.ano}
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-medium">
                {lei.situacao}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {lei.ementa}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Atualizado recentement
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Câmara dos Deputados
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Apresentado em {new Date(lei.data_apresentacao).toLocaleDateString('pt-BR')}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={handleFavorite}
                className="font-semibold"
              >
                <Star className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
                {isFavorited ? "Favoritado" : "Favoritar"}
              </Button>
              <Button
                variant={isFollowing ? "default" : "outline"}
                onClick={() => setIsFollowing(!isFollowing)}
                className="font-semibold"
              >
                <Bell className="h-4 w-4 mr-2" />
                {isFollowing ? "Seguindo" : "Seguir Atualizações"}
              </Button>
              <Button variant="outline" onClick={handleShare} className="font-semibold">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* What Changes for You - Highlight */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    O que muda para você?
                  </h2>
                  <p className="text-lg text-gray-800 mb-4">
                    {lei.traducao?.resumo}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" /> Pontos Positivos
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {lei.traducao?.pontos_positivos?.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" /> Pontos de Atenção
                      </h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
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

          {/* Author Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quem propôs esta lei?</h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-gray-200">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {lei.autores[0]?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">{lei.autores[0]}</h4>
                  <p className="text-gray-600">Deputado Federal</p>
                </div>
                <Link href="/parlamentares">
                  <Button variant="outline" className="font-semibold">
                    <User className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardContent className="p-6">
              <button
                onClick={() => toggleSection("timeline")}
                className="w-full flex items-center justify-between mb-4 hover:text-primary transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900">Linha do Tempo da Tramitação</h3>
                {expandedSections.timeline ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSections.timeline && (
                <div className="space-y-4">
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
                          className={`w-3 h-3 rounded-full ${item.current ? "bg-blue-600 ring-4 ring-blue-200" : "bg-gray-300"
                            }`}
                        />
                        {index < 1 && <div className="w-0.5 h-12 bg-gray-200" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                          <Badge
                            className={
                              item.current
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resumo do Projeto</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {lei.traducao?.resumo || lei.ementa}
              </p>
            </CardContent>
          </Card>

          {/* Full Text - Collapsible */}
          <Card>
            <CardContent className="p-6">
              <button
                onClick={() => toggleSection("fullText")}
                className="w-full flex items-center justify-between mb-4 hover:text-primary transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Texto Completo do Projeto
                </h3>
                {expandedSections.fullText ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {expandedSections.fullText && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {lei.ementa}
                  </p>
                  <div className="mt-6">
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={lei.link_inteiro_teor} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Ver texto oficial no site da Câmara
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Projects */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Projetos Relacionados</h3>
              <div className="space-y-3">
                {[
                  { title: "PL 2768/2022 - Regulamentação de IA", tag: "Tecnologia" },
                  { title: "PL 1234/2023 - Proteção de Dados Pessoais", tag: "Privacidade" },
                ].map((project, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="bg-blue-100 text-blue-800 border-0 mb-2">{project.tag}</Badge>
                        <p className="font-semibold text-gray-900">{project.title}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
