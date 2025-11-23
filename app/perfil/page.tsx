"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  LogOut,
  Bell,
  Heart,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Calendar,
  Trash2,
  Home,
  FileText,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth, AuthUser } from "@/lib/auth"
import { api, Alerta, Lei } from "@/lib/api"
import { ProtectedRoute } from "@/components/protected-route"

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [favoritos, setFavoritos] = useState<Lei[]>([])
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [novoAlerta, setNovoAlerta] = useState("")

  useEffect(() => {
    const loadData = async () => {
      const currentUser = auth.getUser()
      setUser(currentUser)

      if (currentUser) {
        try {
          const [favs, alerts] = await Promise.all([
            api.getFavoritos(),
            api.getAlertas()
          ])
          setFavoritos(favs)
          setAlertas(alerts)
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        }
      }
    }
    loadData()
  }, [])

  const handleLogout = async () => {
    await auth.logout()
    router.push("/login")
  }

  const handleRemoveFavorito = async (id: string) => {
    await api.removeFavorito(id)
    setFavoritos(prev => prev.filter(f => f.id !== id))
  }

  const handleAddAlerta = async () => {
    if (!novoAlerta.trim()) return
    const alerta = await api.createAlerta(novoAlerta)
    setAlertas(prev => [...prev, alerta])
    setNovoAlerta("")
  }

  const handleRemoveAlerta = async (id: string) => {
    await api.deleteAlerta(id)
    setAlertas(prev => prev.filter(a => a.id !== id))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0 font-sans">
        {/* Header Mobile */}
        <header className="bg-white shadow-sm sticky top-0 z-10 md:hidden" role="banner">
          <div className="px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">Meu Perfil</h1>
            <Button variant="ghost" size="icon" className="text-gray-500" aria-label="Configurações">
              <Settings className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:py-8 md:px-4 gap-6">
          {/* Sidebar Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0" aria-label="Menu lateral">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 text-2xl font-bold shadow-inner" aria-hidden="true">
                  {user?.nome?.charAt(0) || "U"}
                </div>
                <h2 className="font-bold text-gray-900">{user?.nome || "Usuário"}</h2>
                <p className="text-sm text-gray-500">{user?.email || "usuario@email.com"}</p>
              </div>

              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-blue-600 bg-blue-50 font-medium" aria-current="page">
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  Meu Perfil
                </Button>
                <Link href="/configuracoes" className="w-full">
                  <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                    Configurações
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Sair
                </Button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-4 py-6 md:p-0 space-y-6" role="main">
            {/* User Info Card */}
            <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8" aria-labelledby="user-info-heading">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner mx-auto md:mx-0" aria-hidden="true">
                  <span className="text-3xl font-bold text-blue-600">{user?.nome?.charAt(0) || "U"}</span>
                </div>
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h2 id="user-info-heading" className="text-2xl font-bold text-gray-900">{user?.nome || "Carregando..."}</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Conta Verificada
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Plano Gratuito
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium">
                  <Edit2 className="mr-2 h-4 w-4" aria-hidden="true" />
                  Editar Perfil
                </Button>
              </div>
            </section>

            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
              <Tabs defaultValue="dados" className="w-full">
                <div className="border-b border-gray-100 px-6 pt-6">
                  <TabsList className="w-full justify-start h-auto p-0 bg-transparent space-x-6 overflow-x-auto flex-nowrap">
                    <TabsTrigger
                      value="dados"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-3 px-1 font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Meus Dados
                    </TabsTrigger>
                    <TabsTrigger
                      value="favoritos"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-3 px-1 font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Favoritos
                    </TabsTrigger>
                    <TabsTrigger
                      value="alertas"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none pb-3 px-1 font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Meus Alertas
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="dados" className="space-y-6 mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome" className="text-gray-700 font-medium">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input id="nome" defaultValue={user?.nome} className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl" readOnly />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input id="email" defaultValue={user?.email} className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl" readOnly />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="whatsapp" className="text-gray-700 font-medium">WhatsApp</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input id="whatsapp" defaultValue={user?.contato} className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl" readOnly />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="regiao" className="text-gray-700 font-medium">Região</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <Input id="regiao" defaultValue={user?.regiao || "Não informado"} className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors rounded-xl" readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-4">Preferências de Notificação</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="space-y-0.5">
                            <Label htmlFor="notif-whatsapp" className="text-base font-medium text-gray-900 cursor-pointer">Notificações no WhatsApp</Label>
                            <p className="text-sm text-gray-500">Receber resumos diários e alertas urgentes</p>
                          </div>
                          <Switch id="notif-whatsapp" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="space-y-0.5">
                            <Label htmlFor="notif-email" className="text-base font-medium text-gray-900 cursor-pointer">Notificações por E-mail</Label>
                            <p className="text-sm text-gray-500">Receber resumo semanal das atividades</p>
                          </div>
                          <Switch id="notif-email" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="favoritos" className="space-y-6 mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                    {favoritos.length > 0 ? (
                      <div className="grid gap-4">
                        {favoritos.map((lei) => (
                          <article key={lei.id} className="p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white group">
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md uppercase tracking-wide">
                                    {lei.numero}
                                  </span>
                                  <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                    <Calendar className="h-3 w-3" aria-hidden="true" /> {lei.data}
                                  </span>
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                  {lei.ementa}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {lei.explicacao}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full flex-shrink-0"
                                onClick={() => handleRemoveFavorito(lei.id)}
                                aria-label={`Remover ${lei.numero} dos favoritos`}
                              >
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                          <Heart className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">Nenhum favorito ainda</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mb-6">
                          Salve projetos de lei para acompanhar seu andamento de perto.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                          Explorar Projetos
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="alertas" className="space-y-6 mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <Bell className="h-5 w-5" aria-hidden="true" />
                        Criar novo alerta
                      </h3>
                      <p className="text-sm text-blue-700 mb-4">
                        Seja avisado quando surgirem novos projetos sobre temas do seu interesse.
                      </p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ex: Educação, Saúde, Transporte..."
                          className="bg-white border-blue-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl"
                          value={novoAlerta}
                          onChange={(e) => setNovoAlerta(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddAlerta()}
                        />
                        <Button
                          onClick={handleAddAlerta}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm rounded-xl px-6"
                        >
                          Criar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900 px-1">Seus alertas ativos</h3>
                      {alertas.length > 0 ? (
                        <div className="grid gap-3">
                          {alertas.map((alerta) => (
                            <article key={alerta.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 flex-shrink-0">
                                  <Bell className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 capitalize">{alerta.termo}</p>
                                  <p className="text-xs text-gray-500">Criado em {new Date(alerta.created_at).toLocaleDateString('pt-BR')}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Switch checked={alerta.ativo} aria-label={`Ativar alerta para ${alerta.termo}`} />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                                  onClick={() => handleRemoveAlerta(alerta.id)}
                                  aria-label={`Excluir alerta para ${alerta.termo}`}
                                >
                                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                                </Button>
                              </div>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                          Você ainda não tem alertas configurados.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </main>
        </div>

        {/* Mobile Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 pb-safe" aria-label="Navegação inferior">
          <div className="grid grid-cols-4 h-16">
            <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
              <Home className="h-6 w-6 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-medium">Início</span>
            </Link>
            <Link href="/projetos-de-lei" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
              <FileText className="h-6 w-6 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-medium">Projetos</span>
            </Link>
            <Link href="/resumo-diario" className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
              <Zap className="h-6 w-6 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-medium">Resumo</span>
            </Link>
            <Link href="/perfil" className="flex flex-col items-center justify-center text-blue-600 font-medium">
              <User className="h-6 w-6 mb-1" aria-hidden="true" />
              <span className="text-[10px]">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </ProtectedRoute>
  )
}
