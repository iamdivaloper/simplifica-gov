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

export default function ProjectDetails() {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    fullText: false,
    timeline: true,
    impact: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "PL 2630 - Regras para Redes Sociais",
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
                { label: "PL 2630/2020" },
              ]}
              className="mb-6"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-blue-600 text-white border-0 font-semibold">
                Tecnologia
              </Badge>
              <Badge variant="outline" className="text-gray-700 border-gray-400 font-medium">
                PL 2630/2020
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 border-0">
                Em tramitação
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Regras para Redes Sociais e Combate às Fake News
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Atualizado há 2 dias
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Câmara dos Deputados
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Apresentado em 03/05/2020
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={() => setIsFavorited(!isFavorited)}
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
                  <ul className="space-y-3 text-gray-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>Mais transparência:</strong> Redes sociais terão que explicar por que removeram seu conteúdo
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>Direito de recurso:</strong> Você poderá contestar a remoção de posts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong>Combate a fake news:</strong> Plataformas terão que identificar e reduzir alcance de desinformação
                      </span>
                    </li>
                  </ul>
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
                    AS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">Alessandro Molon</h4>
                  <p className="text-gray-600">Deputado Federal • PSB/RJ</p>
                  <p className="text-sm text-gray-500 mt-1">42 projetos propostos • 8 aprovados</p>
                </div>
                <Link href="/parlamentares/alessandro-molon">
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
                      date: "15/11/2024",
                      status: "Em análise",
                      description: "Aguardando votação no Plenário",
                      current: true,
                    },
                    {
                      date: "20/08/2024",
                      status: "Aprovado",
                      description: "Aprovado na Comissão de Constituição e Justiça",
                      current: false,
                    },
                    {
                      date: "10/03/2024",
                      status: "Em análise",
                      description: "Enviado para Comissão de Ciência e Tecnologia",
                      current: false,
                    },
                    {
                      date: "03/05/2020",
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
                        {index < 3 && <div className="w-0.5 h-12 bg-gray-200" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{item.date}</span>
                          <Badge
                            className={
                              item.current
                                ? "bg-blue-600 text-white"
                                : item.status === "Aprovado"
                                  ? "bg-green-100 text-green-800"
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
                O PL 2630/2020, conhecido como "Lei das Fake News", estabelece regras para o funcionamento de redes
                sociais e plataformas de mensagens no Brasil. O objetivo principal é combater a desinformação e
                garantir mais transparência nas decisões de moderação de conteúdo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Entre os pontos principais, o projeto exige que as plataformas expliquem suas decisões de remoção de
                conteúdo, permitam recursos dos usuários, e implementem medidas para reduzir o alcance de informações
                falsas verificadas.
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
                    <strong>Art. 1º</strong> Esta Lei estabelece normas, diretrizes e mecanismos de transparência para
                    provedores de redes sociais e de serviços de mensageria privada...
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    [Texto legal completo seria exibido aqui]
                  </p>
                  <div className="mt-6">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Ver texto oficial no site da Câmara
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
