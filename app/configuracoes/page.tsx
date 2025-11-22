"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sparkles, Check, Heart, Bell, Zap } from "lucide-react"
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
    const [selectedInterests, setSelectedInterests] = useState<string[]>([
        "Saúde Pública",
        "Educação Infantil",
        "Transporte Público",
    ])
    const [isSaving, setIsSaving] = useState(false)

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        )
    }

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Image src="/simplinho.png" alt="Simplinho" width={100} height={100} className="rounded-full shadow-lg" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                            <Sparkles className="h-8 w-8 text-yellow-500" />
                            Treine seu Simplinho
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Personalize o que você quer acompanhar. Quanto mais específico, melhores serão os alertas!
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 space-y-8">
                    {/* Interests Section */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 rounded-full p-3">
                                <Heart className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Sobre o que você quer saber?</h2>
                                <p className="text-gray-600">
                                    Escolha os temas que mais importam para você. Vou te avisar sempre que houver novidades!
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {INTERESTS.map((interest) => (
                                <Badge
                                    key={interest}
                                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                                    className={cn(
                                        "cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105",
                                        selectedInterests.includes(interest)
                                            ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-500 hover:text-purple-700"
                                    )}
                                    onClick={() => toggleInterest(interest)}
                                >
                                    {selectedInterests.includes(interest) && <Check className="h-3 w-3 mr-1" />}
                                    {interest}
                                </Badge>
                            ))}
                        </div>

                        {selectedInterests.length > 0 && (
                            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                <p className="text-sm font-semibold text-purple-900">
                                    ✨ Ótimo! Você está acompanhando {selectedInterests.length}{" "}
                                    {selectedInterests.length === 1 ? "tema" : "temas"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Notification Preferences */}
                    <div className="space-y-6 pt-6 border-t border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 rounded-full p-3">
                                <Bell className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Como você quer ser avisado?</h2>
                                <p className="text-gray-600">Configure a frequência e o tipo de notificações</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="space-y-1">
                                    <Label className="text-base font-semibold text-gray-900">Resumo Diário</Label>
                                    <p className="text-sm text-gray-600">Receba um resumo das principais novidades todo dia às 18h</p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="space-y-1">
                                    <Label className="text-base font-semibold text-gray-900">Alertas Urgentes</Label>
                                    <p className="text-sm text-gray-600">Seja avisado imediatamente sobre leis importantes</p>
                                </div>
                                <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="space-y-1">
                                    <Label className="text-base font-semibold text-gray-900">Votações em Andamento</Label>
                                    <p className="text-sm text-gray-600">Saiba quando projetos dos seus temas estão sendo votados</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-200">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || selectedInterests.length === 0}
                            className="w-full h-14 text-lg font-bold shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                            {isSaving ? (
                                <>
                                    <Zap className="mr-2 h-5 w-5 animate-pulse" /> Salvando...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-5 w-5" /> Salvar Preferências
                                </>
                            )}
                        </Button>

                        {selectedInterests.length === 0 && (
                            <p className="text-center text-sm text-gray-500 mt-3">Escolha pelo menos um tema para continuar</p>
                        )}
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Link href="/perfil" className="text-gray-600 hover:text-primary font-medium">
                        ← Voltar para o Perfil
                    </Link>
                </div>
            </div>
        </div>
    )
}
