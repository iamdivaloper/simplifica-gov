"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, Bell, LogOut, Settings, Save, Sparkles, Heart, ArrowRight, Star, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

type AlertFilter = "todos" | "nao-lidos" | "urgentes"

import { api, Cidadao } from "@/lib/api"

interface PerfilContentProps {
  cidadao?: Cidadao
}

function PerfilContent({ cidadao }: PerfilContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabFromUrl = searchParams.get("tab") as "dados" | "favoritos" | "alertas" | null

  const [activeTab, setActiveTab] = useState<"dados" | "favoritos" | "alertas">(tabFromUrl || "dados")
  const [alertFilter, setAlertFilter] = useState<AlertFilter>("todos")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  const handleTabChange = (tab: "dados" | "favoritos" | "alertas") => {
    setActiveTab(tab)
    router.push(`/perfil?tab=${tab}`, { scroll: false })
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("✅ Dados salvos com sucesso!")
    }, 1000)
  }

  const favoriteProjects = [
    {
      id: "pl-2630",
      title: "PL 2630 - Regras para Redes Sociais",
      tag: "Tecnologia",
      summary: "Define regras para moderação de conteúdo e transparência em redes sociais. Busca combater notícias falsas.",
      color: "bg-blue-100 text-blue-700",
      date: "Adicionado em 18/05/2024",
    },
    {
      id: "pl-transporte",
      title: "Tarifa Zero no Transporte",
      tag: "Transporte",
      summary: "Propõe gratuidade no transporte público municipal para estudantes e idosos.",
      color: "bg-green-100 text-green-700",
      date: "Adicionado em 10/05/2024",
    },
    {
      id: "pl-saude",
      title: "Ampliação do SUS Digital",
      tag: "Saúde",
      summary: "Expande o atendimento médico online pelo SUS, facilitando consultas remotas.",
      color: "bg-red-100 text-red-700",
      date: "Adicionado em 02/05/2024",
    },
  ]

  const allAlerts = [
    {
      id: "1",
      title: "Votação Importante Hoje!",
      message: "O PL 2630 sobre redes sociais será votado hoje às 14h. Acompanhe ao vivo.",
      type: "urgente" as const,
      category: "Tecnologia",
      time: "Há 2 horas",
      read: false,
    },
    {
      id: "2",
      title: "Nova Lei Aprovada",
      message: "A lei de Tarifa Zero no transporte foi aprovada! Veja como isso te afeta.",
      type: "normal" as const,
      category: "Transporte",
      time: "Ontem às 18h",
      read: false,
    },
    {
      id: "3",
      title: "Seu Resumo Diário",
      message: "3 novos projetos sobre Saúde Pública foram apresentados hoje.",
      type: "normal" as const,
      category: "Saúde",
      time: "Hoje às 18h",
      read: true,
    },
    {
      id: "4",
      title: "Atenção: Prazo Importante",
      message: "Consulta pública sobre educação termina em 3 dias. Participe!",
      type: "urgente" as const,
      category: "Educação",
      time: "Há 5 horas",
      read: false,
    },
    {
      id: "5",
      title: "Atualização de Projeto",
      message: "O PL sobre Crédito e Dívidas teve alterações no texto. Confira.",
      type: "normal" as const,
      category: "Economia",
      time: "Há 1 dia",
      read: true,
    },
  ]

  const filteredAlerts = allAlerts.filter((alert) => {
    if (alertFilter === "nao-lidos") return !alert.read
    if (alertFilter === "urgentes") return alert.type === "urgente"
    return true
  })

  const unreadCount = allAlerts.filter((a) => !a.read).length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Gradient Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Olá, {cidadao?.nome?.split(' ')[0] || 'Maria'}! 👋</h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Aqui você gerencia suas preferências e acompanha as leis que mais importam para você
              </p>
            </div>
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/20 border-2 border-white/30 font-semibold backdrop-blur-sm">
                ← Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Featured: Train Simplinho Card */}
          <Link href="/configuracoes" className="block animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer border border-purple-400/20">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <Image
                    src="/simplinho.png"
                    alt="Simplinho"
                    width={90}
                    height={90}
                    className="rounded-full shadow-lg relative z-10 border-4 border-white"
                  />
                </div>
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-6 w-6 fill-white" />
                    <h2 className="text-2xl font-bold">Treine seu Simplinho</h2>
                  </div>
                  <p className="text-blue-100 text-lg mb-3 leading-relaxed">
                    Personalize os temas que você quer acompanhar e como quer ser avisado
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span>Configurar agora</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-4 animate-in fade-in slide-in-from-left duration-700">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="font-bold text-xl text-gray-900">{cidadao?.nome || "Maria da Silva"}</h2>
                <p className="text-gray-500 text-sm mt-1">Membro desde Nov 2025</p>
              </div>

              <nav className="bg-white p-3 rounded-3xl shadow-lg border border-gray-100 space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("dados")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all",
                    activeTab === "dados" ? "bg-gradient-to-r from-blue-50 to-purple-50 text-primary shadow-sm" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <User className="w-4 h-4 mr-3" /> Meus Dados
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("alertas")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all relative",
                    activeTab === "alertas" ? "bg-gradient-to-r from-blue-50 to-purple-50 text-primary shadow-sm" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <Bell className="w-4 h-4 mr-3" /> Seus Alertas
                  {unreadCount > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 shadow-md">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("favoritos")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all",
                    activeTab === "favoritos" ? "bg-gradient-to-r from-blue-50 to-purple-50 text-primary shadow-sm" : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  <Star className="w-4 h-4 mr-3" /> Projetos Favoritos
                </Button>
                <Link href="/configuracoes" className="block">
                  <Button variant="ghost" className="w-full justify-start font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all">
                    <Sparkles className="w-4 h-4 mr-3" /> Treinar Simplinho
                  </Button>
                </Link>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <LogOut className="w-4 h-4 mr-3" /> Sair
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-right duration-700">
              {activeTab === "dados" && (
                <>
                  {/* Personal Data */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-100 rounded-full p-2.5 shadow-sm">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Seus Dados Pessoais</h3>
                        <p className="text-sm text-gray-600">Mantenha suas informações atualizadas</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Como te chamamos</Label>
                          <Input defaultValue={cidadao?.nome || "Maria da Silva"} className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700 font-semibold">Seu WhatsApp</Label>
                          <Input defaultValue={cidadao?.contato || "(11) 99999-9999"} className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                          <p className="text-xs text-gray-500 ml-1">É aqui que você recebe os resumos diários 📱</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">E-mail (opcional)</Label>
                        <Input defaultValue="maria.silva@exemplo.com" className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-semibold">Seu CEP</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <Input className="h-12 pl-10 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" defaultValue="01001-000" />
                        </div>
                        <p className="text-xs text-gray-500 ml-1">Para te avisar sobre leis da sua região 📍</p>
                      </div>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full md:w-auto h-12 font-bold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Preferences */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-green-100 rounded-full p-2.5 shadow-sm">
                        <Bell className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Preferências de Notificações</h3>
                        <p className="text-sm text-gray-600">Escolha como quer ser avisado</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                        <div className="space-y-1">
                          <Label className="text-base font-bold text-gray-900">Resumo Diário</Label>
                          <p className="text-sm text-gray-600">Um resumo todo dia às 18h no WhatsApp 📬</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 hover:border-red-200 transition-colors">
                        <div className="space-y-1">
                          <Label className="text-base font-bold text-gray-900">Alertas Importantes</Label>
                          <p className="text-sm text-gray-600">Quando houver algo urgente sobre seus temas 🔔</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-red-600" />
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link href="/configuracoes">
                        <Button variant="outline" className="w-full h-12 font-bold border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 rounded-xl transition-all">
                          <Settings className="w-4 h-4 mr-2" />
                          Ver todas as configurações
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "alertas" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2.5 shadow-sm">
                          <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">Seus Alertas</h3>
                          <p className="text-sm text-gray-600">Fique por dentro do que está rolando 🔔</p>
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <Badge className="bg-red-100 text-red-700 border-red-200 text-sm px-3 py-1 font-bold shadow-sm">
                          {unreadCount} {unreadCount === 1 ? "novo" : "novos"}
                        </Badge>
                      )}
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant={alertFilter === "todos" ? "default" : "outline"}
                        onClick={() => setAlertFilter("todos")}
                        className={cn(
                          "font-bold rounded-xl",
                          alertFilter === "todos" ? "shadow-md" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        Todos ({allAlerts.length})
                      </Button>
                      <Button
                        size="sm"
                        variant={alertFilter === "nao-lidos" ? "default" : "outline"}
                        onClick={() => setAlertFilter("nao-lidos")}
                        className={cn(
                          "font-bold rounded-xl",
                          alertFilter === "nao-lidos" ? "shadow-md" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        Não lidos ({unreadCount})
                      </Button>
                      <Button
                        size="sm"
                        variant={alertFilter === "urgentes" ? "default" : "outline"}
                        onClick={() => setAlertFilter("urgentes")}
                        className={cn(
                          "font-bold rounded-xl",
                          alertFilter === "urgentes" ? "bg-red-600 hover:bg-red-700 shadow-md" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        Urgentes ({allAlerts.filter((a) => a.type === "urgente").length})
                      </Button>
                    </div>
                  </div>

                  {/* Alerts List */}
                  {filteredAlerts.length > 0 ? (
                    <div className="space-y-3">
                      {filteredAlerts.map((alert) => (
                        <Card
                          key={alert.id}
                          className={cn(
                            "hover:shadow-lg transition-all border-l-4 rounded-2xl",
                            alert.type === "urgente" ? "border-l-red-500 bg-red-50/50" : "border-l-blue-500",
                            !alert.read && "bg-blue-50/30 shadow-md"
                          )}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "rounded-full p-2.5 flex-shrink-0 shadow-sm",
                                alert.type === "urgente" ? "bg-red-100" : "bg-blue-100"
                              )}>
                                {alert.type === "urgente" ? (
                                  <AlertCircle className="w-5 h-5 text-red-600" />
                                ) : (
                                  <Bell className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-bold text-gray-900">{alert.title}</h4>
                                      {!alert.read && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{alert.message}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div className="flex items-center gap-3">
                                    <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs font-semibold">
                                      {alert.category}
                                    </Badge>
                                    <span className="text-xs text-gray-500 font-medium">{alert.time}</span>
                                  </div>
                                  {!alert.read && (
                                    <Button size="sm" variant="ghost" className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold rounded-lg">
                                      Marcar como lido
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Tudo em dia! 🎉</h3>
                      <p className="text-gray-600 text-lg">
                        {alertFilter === "nao-lidos" && "Você não tem alertas não lidos"}
                        {alertFilter === "urgentes" && "Não há alertas urgentes no momento"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "favoritos" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-100 rounded-full p-2.5 shadow-sm">
                        <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Seus Projetos Favoritos</h3>
                        <p className="text-sm text-gray-600">Acompanhe de perto as propostas que mais importam para você ⭐</p>
                      </div>
                    </div>
                  </div>

                  {/* Favorites List */}
                  {favoriteProjects.length > 0 ? (
                    <div className="grid gap-4">
                      {favoriteProjects.map((project) => (
                        <Card key={project.id} className="hover:shadow-xl transition-all border-gray-100 rounded-2xl">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start gap-3">
                                  <Badge className={`${project.color} border-0 font-bold shadow-sm`}>{project.tag}</Badge>
                                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{project.summary}</p>
                                <p className="text-xs text-gray-500 font-medium">{project.date}</p>
                                <div className="flex gap-3 pt-2 flex-wrap">
                                  <Link href={`/projetos-de-lei/${project.id}`}>
                                    <Button size="sm" className="font-bold shadow-md hover:shadow-lg transition-all rounded-xl">
                                      Ver Detalhes <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                  </Link>
                                  <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 border-red-200 font-bold rounded-xl">
                                    <Trash2 className="w-4 h-4 mr-1" /> Remover
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center">
                      <div className="bg-gradient-to-br from-yellow-100 to-amber-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <Star className="h-12 w-12 text-yellow-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Você ainda não tem favoritos</h3>
                      <p className="text-gray-600 mb-6 text-lg">Explore os projetos de lei e clique na estrela para salvar ⭐</p>
                      <Link href="/projetos-de-lei">
                        <Button className="font-bold shadow-lg hover:shadow-xl transition-all rounded-xl h-12">
                          Explorar Projetos <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default async function PerfilPage() {
  let cidadao: Cidadao | undefined

  try {
    const cidadaos = await api.getCidadaos()
    if (cidadaos && cidadaos.length > 0) {
      cidadao = cidadaos[0]
    }
  } catch (error) {
    console.error("Failed to fetch citizen data", error)
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div></div>}>
      <PerfilContent cidadao={cidadao} />
    </Suspense>
  )
}
