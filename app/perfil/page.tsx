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
import { ProtectedRoute } from "@/components/protected-route"

type AlertFilter = "todos" | "nao-lidos" | "urgentes"

import { api, Cidadao, Lei, Alerta } from "@/lib/api"

interface PerfilContentProps {
  cidadao?: Cidadao
  favoritos: Lei[]
  alertas: Alerta[]
}

interface UIAlert {
  id: string
  title: string
  message: string
  type: "normal" | "urgente"
  category: string
  time: string
  read: boolean
}

function PerfilContent({ cidadao, favoritos, alertas }: PerfilContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tabFromUrl = searchParams.get("tab") as "dados" | "favoritos" | "alertas" | null

  const [activeTab, setActiveTab] = useState<"dados" | "favoritos" | "alertas">(tabFromUrl || "dados")
  const [alertFilter, setAlertFilter] = useState<AlertFilter>("todos")
  const [isSaving, setIsSaving] = useState(false)

  // Local state for optimistic updates
  const [localFavoritos, setLocalFavoritos] = useState<Lei[]>(favoritos)
  const [localAlertas, setLocalAlertas] = useState<UIAlert[]>(alertas.map(a => ({
    id: a.id,
    title: `Alerta: ${a.termo}`,
    message: "Nova atualização detectada para este tema.",
    type: "normal",
    category: a.termo,
    time: new Date(a.created_at).toLocaleDateString("pt-BR"),
    read: false
  })))

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl, activeTab])

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

  const handleRemoveFavorito = async (id: string) => {
    try {
      await api.removeFavorito(id)
      setLocalFavoritos(prev => prev.filter(f => f.id !== id))
    } catch (error) {
      console.error("Failed to remove favorite", error)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.markAlertaAsRead(id)
      setLocalAlertas(prev => prev.map(a => a.id === id ? { ...a, read: true } : a))
    } catch (error) {
      console.error("Failed to mark alert as read", error)
    }
  }

  const filteredAlerts = localAlertas.filter((alert) => {
    if (alertFilter === "nao-lidos") return !alert.read
    if (alertFilter === "urgentes") return alert.type === "urgente"
    return true
  })

  const unreadCount = localAlertas.filter((a) => !a.read).length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Gradient Hero */}
      <header className="bg-white border-b py-12 px-4" role="banner">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Olá, {cidadao?.nome?.split(' ')[0] || 'Maria'}! 👋</h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Aqui você gerencia suas preferências e acompanha as leis que mais importam para você
              </p>
            </div>
            <Link href="/" aria-label="Voltar para a página inicial">
              <Button variant="outline" className="text-gray-700 hover:bg-gray-50 border-gray-200 font-semibold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                ← Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8" role="main">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Featured: Train Simplinho Card */}
          <Link
            href="/configuracoes"
            className="block animate-in fade-in slide-in-from-bottom-4 duration-500 focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-3xl"
            aria-label="Personalizar preferências e treinar o Simplinho"
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] cursor-pointer border border-blue-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <Sparkles className="h-10 w-10 text-white fill-white" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">Personalize suas preferências</h2>
                  </div>
                  <p className="text-gray-600 text-lg mb-3 leading-relaxed">
                    Configure os temas que você quer acompanhar e como quer ser avisado ⚙️
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold">
                    <span>Configurar agora</span>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
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
                  <User className="w-12 h-12 text-primary" aria-hidden="true" />
                </div>
                <h2 className="font-bold text-xl text-gray-900">{cidadao?.nome || "Maria da Silva"}</h2>
                <p className="text-gray-500 text-sm mt-1">Membro desde Nov 2025</p>
              </div>

              <nav className="bg-white p-3 rounded-3xl shadow-lg border border-gray-100 space-y-1" aria-label="Menu do perfil">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("dados")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    activeTab === "dados" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  aria-current={activeTab === "dados" ? "page" : undefined}
                >
                  <User className="w-4 h-4 mr-3" aria-hidden="true" /> Meus Dados
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("alertas")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all relative focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    activeTab === "alertas" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  aria-current={activeTab === "alertas" ? "page" : undefined}
                >
                  <Bell className="w-4 h-4 mr-3" aria-hidden="true" /> Seus Alertas
                  {unreadCount > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 shadow-md" aria-label={`${unreadCount} alertas não lidos`}>
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange("favoritos")}
                  className={cn(
                    "w-full justify-start font-semibold rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    activeTab === "favoritos" ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  aria-current={activeTab === "favoritos" ? "page" : undefined}
                >
                  <Star className="w-4 h-4 mr-3" aria-hidden="true" /> Projetos Favoritos
                </Button>
                <Link href="/configuracoes" className="block w-full">
                  <Button variant="ghost" className="w-full justify-start font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Sparkles className="w-4 h-4 mr-3" aria-hidden="true" /> Treinar Simplinho
                  </Button>
                </Link>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <Link href="/login" className="block w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <LogOut className="w-4 h-4 mr-3" aria-hidden="true" /> Sair
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-6 animate-in fade-in slide-in-from-right duration-700" role="region" aria-label="Conteúdo da aba selecionada">
              {activeTab === "dados" && (
                <>
                  {/* Personal Data */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-100 rounded-full p-2.5 shadow-sm">
                        <User className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Seus Dados Pessoais</h3>
                        <p className="text-sm text-gray-600">Mantenha suas informações atualizadas</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome" className="text-gray-700 font-semibold">Como te chamamos</Label>
                          <Input id="nome" defaultValue={cidadao?.nome || "Maria da Silva"} className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp" className="text-gray-700 font-semibold">Seu WhatsApp</Label>
                          <Input id="whatsapp" defaultValue={cidadao?.contato || "(11) 99999-9999"} className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                          <p className="text-xs text-gray-500 ml-1">É aqui que você recebe os resumos diários 📱</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-semibold">E-mail (opcional)</Label>
                        <Input id="email" defaultValue="maria.silva@exemplo.com" className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cep" className="text-gray-700 font-semibold">Seu CEP</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input id="cep" className="h-12 pl-10 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl" defaultValue="01001-000" />
                        </div>
                        <p className="text-xs text-gray-500 ml-1">Para te avisar sobre leis da sua região 📍</p>
                      </div>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full md:w-auto h-12 font-bold shadow-md bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </div>
                  </div>

                  {/* Quick Preferences */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-green-100 rounded-full p-2.5 shadow-sm">
                        <Bell className="w-5 h-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Preferências de Notificações</h3>
                        <p className="text-sm text-gray-600">Escolha como quer ser avisado</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                        <div className="space-y-1">
                          <Label htmlFor="switch-resumo" className="text-base font-bold text-gray-900">Resumo Diário</Label>
                          <p className="text-sm text-gray-600">Um resumo todo dia às 18h no WhatsApp 📬</p>
                        </div>
                        <Switch id="switch-resumo" defaultChecked className="data-[state=checked]:bg-blue-600" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 hover:border-red-200 transition-colors">
                        <div className="space-y-1">
                          <Label htmlFor="switch-urgente" className="text-base font-bold text-gray-900">Alertas Importantes</Label>
                          <p className="text-sm text-gray-600">Quando houver algo urgente sobre seus temas 🔔</p>
                        </div>
                        <Switch id="switch-urgente" defaultChecked className="data-[state=checked]:bg-red-600" />
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <Link href="/configuracoes">
                        <Button variant="outline" className="w-full h-12 font-bold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-full transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
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
                          <Bell className="w-5 h-5 text-blue-600" aria-hidden="true" />
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
                    <div className="flex gap-2 flex-wrap" role="toolbar" aria-label="Filtros de alertas">
                      <Button
                        size="sm"
                        variant={alertFilter === "todos" ? "default" : "outline"}
                        onClick={() => setAlertFilter("todos")}
                        className={cn(
                          "font-bold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                          alertFilter === "todos" ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300"
                        )}
                        aria-pressed={alertFilter === "todos"}
                      >
                        Todos ({localAlertas.length})
                      </Button>
                      <Button
                        size="sm"
                        variant={alertFilter === "nao-lidos" ? "default" : "outline"}
                        onClick={() => setAlertFilter("nao-lidos")}
                        className={cn(
                          "font-bold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                          alertFilter === "nao-lidos" ? "bg-blue-600 hover:bg-blue-700 shadow-md" : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300"
                        )}
                        aria-pressed={alertFilter === "nao-lidos"}
                      >
                        Não lidos ({unreadCount})
                      </Button>
                      <Button
                        size="sm"
                        variant={alertFilter === "urgentes" ? "default" : "outline"}
                        onClick={() => setAlertFilter("urgentes")}
                        className={cn(
                          "font-bold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                          alertFilter === "urgentes" ? "bg-red-600 hover:bg-red-700 shadow-md" : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-red-300"
                        )}
                        aria-pressed={alertFilter === "urgentes"}
                      >
                        Urgentes ({localAlertas.filter((a) => a.type === "urgente").length})
                      </Button>
                    </div>
                  </div>

                  {/* Alerts List */}
                  {filteredAlerts.length > 0 ? (
                    <div className="space-y-3">
                      {filteredAlerts.map((alert) => (
                        <article
                          key={alert.id}
                          className={cn(
                            "hover:shadow-lg transition-all border border-gray-100 rounded-2xl bg-white relative overflow-hidden",
                            alert.type === "urgente" && "border-red-100",
                            !alert.read && "shadow-md"
                          )}
                        >
                          <CardContent className="p-5">
                            {alert.type === "urgente" && (
                              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                            )}
                            {!alert.read && alert.type !== "urgente" && (
                              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            )}
                            <div className="flex items-start gap-4">
                              <div className={cn(
                                "rounded-full p-2.5 flex-shrink-0 shadow-sm",
                                alert.type === "urgente" ? "bg-red-100" : "bg-blue-100"
                              )}>
                                {alert.type === "urgente" ? (
                                  <AlertCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
                                ) : (
                                  <Bell className="w-5 h-5 text-blue-600" aria-hidden="true" />
                                )}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-bold text-gray-900">{alert.title}</h4>
                                      {!alert.read && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" aria-label="Não lido"></div>
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
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                      onClick={() => handleMarkAsRead(alert.id)}
                                    >
                                      Marcar como lido
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center">
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <CheckCircle className="h-12 w-12 text-green-600" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Tudo em dia! 🎉</h3>
                      <p className="text-gray-600 text-lg">
                        {alertFilter === "nao-lidos" && "Você não tem alertas não lidos"}
                        {alertFilter === "urgentes" && "Não há alertas urgentes no momento"}
                        {alertFilter === "todos" && "Você não tem nenhum alerta"}
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
                        <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Seus Projetos Favoritos</h3>
                        <p className="text-sm text-gray-600">Acompanhe de perto as propostas que mais importam para você ⭐</p>
                      </div>
                    </div>
                  </div>

                  {/* Favorites List */}
                  {localFavoritos.length > 0 ? (
                    <div className="grid gap-4">
                      {localFavoritos.map((project) => (
                        <article key={project.id} className="hover:shadow-xl transition-all border-gray-100 rounded-2xl bg-white border shadow-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start gap-3">
                                  <Badge className="bg-blue-50 text-blue-700 border border-blue-100 font-bold shadow-sm">{project.tipo}</Badge>
                                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" aria-hidden="true" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">{project.ementa}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{project.traducao?.resumo || project.ementa}</p>
                                <p className="text-xs text-gray-500 font-medium">{project.data_apresentacao}</p>
                                <div className="flex gap-3 pt-2 flex-wrap">
                                  <Link href={`/projetos-de-lei/${project.id}`}>
                                    <Button size="sm" className="font-bold shadow-md hover:shadow-lg transition-all rounded-full bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                      Ver Detalhes <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                                    </Button>
                                  </Link>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:bg-red-50 border-red-200 font-bold rounded-full focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    onClick={() => handleRemoveFavorito(project.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" /> Remover
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-3xl shadow-lg border border-gray-100 text-center">
                      <div className="bg-gradient-to-br from-yellow-100 to-amber-100 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <Star className="h-12 w-12 text-yellow-600" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Você ainda não tem favoritos</h3>
                      <p className="text-gray-600 mb-6 text-lg">Explore os projetos de lei e clique na estrela para salvar ⭐</p>
                      <Link href="/projetos-de-lei">
                        <Button className="font-bold shadow-md hover:shadow-lg transition-all rounded-full h-12 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Explorar Projetos <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
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
  let favoritos: Lei[] = []
  let alertas: Alerta[] = []

  try {
    const cidadaos = await api.getCidadaos()
    if (cidadaos && cidadaos.length > 0) {
      cidadao = cidadaos[0]
    }
    favoritos = await api.getFavoritos()
    alertas = await api.getAlertas()
  } catch (error) {
    console.error("Failed to fetch data", error)
  }

  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" role="status" aria-label="Carregando"></div></div>}>
        <PerfilContent cidadao={cidadao} favoritos={favoritos} alertas={alertas} />
      </Suspense>
    </ProtectedRoute>
  )
}
