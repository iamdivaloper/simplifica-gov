"use client"

import { useState, useEffect } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Check, Heart, Bell, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const prefs = await api.getPreferencias()
                const themes = prefs.map(p => p.tema)
                setSelectedInterests(themes)
                setInitialInterests(themes)
            } catch (error) {
                console.error("Failed to load preferences", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadPreferences()
    }, [])

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
            alert("✅ Preferências salvas com sucesso!")
        } catch (error) {
            console.error("Failed to save preferences", error)
            alert("❌ Erro ao salvar preferências. Tente novamente.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Gradient Hero */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-700 text-white py-12 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-8 w-8 fill-white" />
                                <h1 className="text-4xl font-bold tracking-tight">Treine seu Simplinho</h1>
                            </div>
                            <p className="text-blue-100 text-lg max-w-2xl">
                                Personalize o que você quer acompanhar. Quanto mais específico, melhores serão os alertas! ⭐
                            </p>
                        </div>
                        <Link href="/perfil">
                            <Button variant="ghost" className="text-white hover:bg-white/20 border-2 border-white/30 font-semibold backdrop-blur-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Perfil
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="space-y-6">
                    {/* Simplinho Avatar Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-center mb-4 relative">
                            <div className="absolute inset-0 bg-purple-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            <Image
                                src="/simplinho.png"
                                alt="Simplinho"
                                width={100}
                                height={100}
                                className="rounded-full shadow-xl relative z-10 border-4 border-white"
                            />
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            Olá! Sou o Simplinho e estou aqui para te manter informado sobre as leis que realmente importam para você.
                            Me conte seus interesses! 💜
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        {/* Interests Section */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 rounded-full p-3 shadow-sm">
                                    <Heart className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sobre o que você quer saber?</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        Escolha os temas que mais importam para você. Vou te avisar sempre que houver novidades! 🔔
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.map((interest) => (
                                    <Badge
                                        key={interest}
                                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                                        className={cn(
                                            "cursor-pointer text-sm py-2.5 px-4 transition-all hover:scale-105 rounded-xl font-semibold shadow-sm",
                                            selectedInterests.includes(interest)
                                                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-purple-600 shadow-md"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-purple-500 hover:text-purple-700 hover:bg-purple-50"
                                        )}
                                        onClick={() => toggleInterest(interest)}
                                    >
                                        {selectedInterests.includes(interest) && <Check className="h-4 w-4 mr-1.5" />}
                                        {interest}
                                    </Badge>
                                ))}
                            </div>

                            {selectedInterests.length > 0 && (
                                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-200 shadow-sm animate-in fade-in slide-in-from-top-2">
                                    <p className="text-sm font-bold text-purple-900 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-purple-600 fill-purple-600" />
                                        Ótimo! Você está acompanhando {selectedInterests.length}{" "}
                                        {selectedInterests.length === 1 ? "tema" : "temas"}. Vou te manter atualizado! 📬
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Notification Preferences */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 rounded-full p-3 shadow-sm">
                                    <Bell className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Como você quer ser avisado?</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">Configure a frequência e o tipo de notificações 📱</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors">
                                    <div className="space-y-1">
                                        <Label className="text-base font-bold text-gray-900">Resumo Diário</Label>
                                        <p className="text-sm text-gray-600">Receba um resumo das principais novidades todo dia às 18h 📬</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                                </div>

                                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 hover:border-red-200 transition-colors">
                                    <div className="space-y-1">
                                        <Label className="text-base font-bold text-gray-900">Alertas Urgentes</Label>
                                        <p className="text-sm text-gray-600">Seja avisado imediatamente sobre leis importantes 🚨</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-red-600" />
                                </div>

                                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:border-green-200 transition-colors">
                                    <div className="space-y-1">
                                        <Label className="text-base font-bold text-gray-900">Votações em Andamento</Label>
                                        <p className="text-sm text-gray-600">Saiba quando projetos dos seus temas estão sendo votados 🗳️</p>
                                    </div>
                                    <Switch className="data-[state=checked]:bg-green-600" />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-6 border-t border-gray-200">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving || selectedInterests.length === 0}
                                className="w-full h-14 text-lg font-bold shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {isSaving ? (
                                    <>
                                        <Zap className="mr-2 h-5 w-5 animate-pulse" /> Salvando suas preferências...
                                    </>
                                ) : (
                                    <>
                                        <Check className="mr-2 h-5 w-5" /> Salvar Preferências
                                    </>
                                )}
                            </Button>

                            {selectedInterests.length === 0 && (
                                <p className="text-center text-sm text-gray-500 mt-3 font-medium">
                                    Escolha pelo menos um tema para continuar ⭐
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
