"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Loader2, MessageSquare, Shield } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const INTERESTS = [
  "Saúde",
  "Educação",
  "Trabalho",
  "Meio Ambiente",
  "Segurança",
  "Mobilidade",
  "Moradia",
  "Direitos Sociais",
  "Juventude",
  "Transporte",
  "Políticas Locais",
]

export default function CadastroPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
    }, 1500)
  }

  const handleVerifyOtp = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="text-2xl font-bold text-gray-900">SimplificaGov</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {step === "form" && "Crie sua conta gratuita"}
            {step === "otp" && "Verifique seu WhatsApp"}
            {step === "success" && "Tudo pronto!"}
          </h2>
          <p className="mt-2 text-gray-600">
            {step === "form" && "Receba explicações simples sobre o que acontece no governo."}
            {step === "otp" && "Enviamos um código de 6 dígitos para o seu número."}
            {step === "success" && "Sua conta foi criada com sucesso."}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              {/* Personal Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Sobre você</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" required className="mt-1 h-11" placeholder="Maria da Silva" />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="social-name">Nome Social / Apelido (Como quer ser chamado)</Label>
                    <Input id="social-name" className="mt-1 h-11" placeholder="Ex: Malu" />
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="age">Faixa Etária *</Label>
                    <Select required>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jovem">Jovem (até 24 anos)</SelectItem>
                        <SelectItem value="adulto">Adulto (25 a 59 anos)</SelectItem>
                        <SelectItem value="idoso">Idoso (60+ anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-1">
                    <Label htmlFor="occupation">Ocupação *</Label>
                    <Select required>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estudante">Estudante</SelectItem>
                        <SelectItem value="trabalhador">Trabalhador</SelectItem>
                        <SelectItem value="empreendedor">Empreendedor</SelectItem>
                        <SelectItem value="aposentado">Aposentado</SelectItem>
                        <SelectItem value="buscando">Buscando emprego</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contato e Localização</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <Label htmlFor="whatsapp">WhatsApp (Obrigatório) *</Label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input id="whatsapp" required className="pl-10 h-11" placeholder="(00) 00000-0000" type="tel" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input id="cep" required className="mt-1 h-11" placeholder="00000-000" />
                    <p className="text-[10px] text-gray-500 mt-1">Para alertas do seu bairro.</p>
                  </div>
                </div>
              </div>

              {/* Interests Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">O que te interessa?</h3>
                <p className="text-sm text-gray-500">Selecione pelo menos 3 temas para personalizar seus alertas.</p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer text-sm py-1.5 px-3 transition-all hover:scale-105",
                        selectedInterests.includes(interest)
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary",
                      )}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Privacy */}
              <div className="pt-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <Checkbox id="privacy" required className="mt-1 data-[state=checked]:bg-primary" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="privacy"
                      className="text-sm font-medium leading-relaxed text-blue-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Concordo em receber notificações no WhatsApp sobre leis relacionadas ao meu perfil e aceito que
                      meus dados sejam usados para personalizar esses alertas, conforme a LGPD.
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando código...
                  </>
                ) : (
                  <>
                    Enviar Código de Verificação <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-8 py-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <MessageSquare className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Label htmlFor="otp" className="text-lg">
                  Digite o código que enviamos para seu WhatsApp
                </Label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Input
                      key={i}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 focus:border-primary focus:ring-0"
                      maxLength={1}
                      placeholder="•"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Não recebeu? <button className="text-primary font-semibold hover:underline">Reenviar em 30s</button>
                </p>
              </div>

              <Button onClick={handleVerifyOtp} className="w-full h-12 text-lg font-bold" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : "Validar Número"}
              </Button>

              <Button variant="ghost" onClick={() => setStep("form")} className="w-full text-gray-500">
                Voltar e corrigir número
              </Button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8 space-y-6">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Conta criada com sucesso!</h3>
                <p className="mt-2 text-gray-600">
                  Você receberá sua primeira explicação no WhatsApp em alguns instantes.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-left border border-gray-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900 text-sm">Seus dados estão seguros</p>
                    <p className="text-xs text-gray-500">
                      Seguimos rigorosamente a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full h-12 text-lg font-bold shadow-md"
                onClick={() => (window.location.href = "/perfil")}
              >
                Ir para meu Perfil
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
