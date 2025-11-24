"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Sparkles, Check, Heart, Bell, Zap, ArrowLeft, Mail, MessageCircle, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ProtectedRoute } from "@/components/protected-route"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const INTERESTS = [
    "Salário e Benefícios Trabalhistas",
    "Impostos",
    "Aposentadoria",
    "Plano de Saúde",
    "Saúde Pública",
    "Educação Infantil",
    "Educação Superior e Profissional",
    "Contas de Luz, Água e Internet",
    "Transporte Particular",
    "Transporte Público",
    "Crédito e Dívidas",
    "Casa e Habitação",
    "Compras e Direitos do Consumidor",
    "Segurança Pública",
    "Negócio e Empreendedorismo",
    "Programas Sociais",
    "Saúde da Mulher",
    "Cuidado com Idosos",
    "Pessoas com Deficiência",
    "Crianças e Adolescentes",
    "Justiça",
    "Tecnologia e Privacidade",
    "Animais de Estimação",
    "Cultura e Entretenimento",
    "Viagens e Turismo",
    "Esporte e Lazer",
    "Agricultura Familiar",
    "Direitos Políticos e Participação",
    "Administração Pública",
    "Orçamento Público",
    "Comércio e Economia",
    "Relações Internacionais",
    "Ciência e Inovação",
    "Defesa e Forças Armadas",
    "Outros",
]

export default function ConfiguracoesPage() {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([])
    const [initialInterests, setInitialInterests] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [whatsappEnabled, setWhatsappEnabled] = useState(false)
    const [emailEnabled, setEmailEnabled] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const prefs = await api.getPreferencias()
                const themes = prefs.map(p => p.tema)
                setSelectedInterests(themes)
                setInitialInterests(themes)
            } catch (error) {
                console.error("Failed to load preferences", error)
                toast({
                    title: "Ops! Algo deu errado",
                    description: "Não conseguimos carregar suas preferências. Tente recarregar a página.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }
        loadPreferences()
    }, [toast])

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        )
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Find added interests
            const added = selectedInterests.filter(i => !initialInterests.includes(i))
            // Find removed interests
            const removed = initialInterests.filter(i => !selectedInterests.includes(i))

            // Execute updates
            await Promise.all([
                ...added.map(interest => api.addPreferencia(interest)),
                ...removed.map(interest => api.removePreferencia(interest))
            ])

            // Update initial state to match current
            setInitialInterests(selectedInterests)

            toast({
                title: (
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Tudo certo!</span>
                    </div>
                ),
                description: `Suas preferências foram salvas. Agora você receberá alertas sobre ${selectedInterests.length} ${selectedInterests.length === 1 ? 'tema' : 'temas'} que importam para você.`,
                className: "border-green-200 bg-green-50",
            })
        } catch (error) {
            console.error("Failed to save preferences", error)
            toast({
                title: (
                    <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span>Não conseguimos salvar</span>
                    </div>
                ),
                description: "Verifique sua conexão e tente novamente. Se o problema persistir, entre em contato conosco.",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 font-sans">
                {/* Gradient Hero */}
                <header className="bg-white border-b py-12 px-4" role="banner">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-8 w-8 text-blue-600" aria-hidden="true" />
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Personalize suas preferências</h1>
                                </div>
                                <p className="text-gray-600 text-lg max-w-2xl">
                                    Configure o que você quer acompanhar. Quanto mais específico, melhores serão os alertas!
                                </p>
                            </div>
                            <Link href="/perfil" aria-label="Voltar para o perfil">
                                <Button variant="outline" className="text-gray-700 hover:bg-gray-50 border-gray-200 font-semibold rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Voltar ao Perfil
                                </Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-8 max-w-4xl" role="main">
                    <div className="space-y-6">
                        {/* Simplinho Avatar Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 border border-blue-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                                {/* Hero Section */}
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-blue-100">
                                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                                        Configurações
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                        Personalize sua Experiência
                                    </h2>
                                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                        Escolha os temas que mais importam para você. Vamos filtrar e traduzir apenas o que realmente impacta sua vida.
                                    </p>
                                </div>

                                {/* Notification Preferences */}
                                <div className="mb-12 pb-12 border-b border-gray-200">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <Bell className="h-5 w-5 text-blue-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Notificações</h3>
                                            <p className="text-sm text-gray-600">Como você prefere receber atualizações?</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg">
                                                    <MessageCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="whatsapp-switch" className="font-semibold text-gray-900 text-base">WhatsApp</Label>
                                                    <p className="text-sm text-gray-600">Receba resumos direto no seu celular</p>
                                                </div>
                                            </div>
                                            <Switch
                                                id="whatsapp-switch"
                                                checked={whatsappEnabled}
                                                onCheckedChange={setWhatsappEnabled}
                                                className="data-[state=checked]:bg-green-600"
                                                aria-label="Ativar notificações por WhatsApp"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <Mail className="h-5 w-5 text-blue-600" aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <Label htmlFor="email-switch" className="font-semibold text-gray-900 text-base">E-mail</Label>
                                                    <p className="text-sm text-gray-600">Resumos semanais na sua caixa de entrada</p>
                                                </div>
                                            </div>
                                            <Switch
                                                id="email-switch"
                                                checked={emailEnabled}
                                                onCheckedChange={setEmailEnabled}
                                                className="data-[state=checked]:bg-blue-600"
                                                aria-label="Ativar notificações por E-mail"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Interest Selection */}
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <Heart className="h-5 w-5 text-purple-600" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Seus Interesses</h3>
                                            <p className="text-sm text-gray-600">Selecione os temas que você quer acompanhar</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8" role="group" aria-label="Seleção de interesses">
                                        {INTERESTS.map((interest) => {
                                            const isSelected = selectedInterests.includes(interest)
                                            return (
                                                <button
                                                    key={interest}
                                                    onClick={() => toggleInterest(interest)}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                                                        isSelected
                                                            ? "border-blue-500 bg-blue-50 shadow-sm"
                                                            : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/50"
                                                    )}
                                                    aria-pressed={isSelected}
                                                >
                                                    <span className={cn(
                                                        "font-semibold text-sm",
                                                        isSelected ? "text-blue-900" : "text-gray-700"
                                                    )}>
                                                        {interest}
                                                    </span>
                                                    {isSelected && (
                                                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                            <Check className="h-4 w-4 text-white" aria-hidden="true" />
                                                        </div>
                                                    )}
                                                </button>
                                            )
                                        })}
                                    </div>

                                    <Button
                                        onClick={handleSave}
                                        disabled={selectedInterests.length === 0 || isSaving}
                                        className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md rounded-full focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {isSaving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                                                Salvando...
                                            </>
                                        ) : (
                                            <>
                                                <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
                                                Salvar Preferências
                                            </>
                                        )}
                                    </Button>

                                    {selectedInterests.length === 0 && (
                                        <p className="text-center text-sm text-gray-500 mt-3 font-medium" role="alert">
                                            Escolha pelo menos um tema para continuar ⭐
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    )
}
