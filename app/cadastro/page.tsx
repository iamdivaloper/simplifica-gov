"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Loader2, MessageSquare, Sparkles, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CadastroPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    cep: "",
    privacy: false
  })
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
    cep: "",
    privacy: ""
  })

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    let nameError = ""
    if (!formData.name) nameError = "Precisamos saber seu nome para te chamar do jeito certo! 😊"
    else if (formData.name.length < 3) nameError = "Seu nome parece curtinho. É isso mesmo? 🤔"

    let whatsappError = ""
    if (!formData.whatsapp) whatsappError = "Precisamos do seu WhatsApp para enviar os resumos."
    else if (formData.whatsapp.length < 10) whatsappError = "Esse número parece incompleto. Faltou o DDD?"

    let cepError = ""
    if (!formData.cep) cepError = "O CEP ajuda a mostrar leis do seu bairro."
    else if (formData.cep.replace(/\D/g, '').length !== 8) cepError = "O CEP costuma ter 8 números. Dá uma conferida?"

    const newErrors = {
      name: nameError,
      whatsapp: whatsappError,
      cep: cepError,
      privacy: !formData.privacy ? "Precisamos que você aceite para podermos conversar." : ""
    }

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center font-sans">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link href="/" className="inline-block relative group">
            <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
            <Image
              src="/simplinho.png"
              alt="Simplinho"
              width={90}
              height={90}
              className="rounded-full shadow-lg mx-auto relative z-10 border-4 border-white"
            />
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {step === "form" && "Criar sua conta gratuita"}
              {step === "otp" && "Confirme seu número"}
              {step === "success" && (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-8 w-8 text-yellow-500 fill-yellow-500 animate-pulse" />
                  Tudo pronto!
                </span>
              )}
            </h1>
            <p className="text-lg text-gray-600 max-w-xs mx-auto">
              {step === "form" && "Receba explicações simples sobre leis que afetam você"}
              {step === "otp" && "Enviamos um código para seu WhatsApp"}
              {step === "success" && "Sua conta foi criada com sucesso"}
            </p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold">
                  Como podemos te chamar?
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  className={`h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all ${errors.name ? "border-red-300 bg-red-50" : ""} focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl`}
                  placeholder="ex: Maria da Silva"
                />
                {errors.name && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl animate-in fade-in slide-in-from-top-1 mt-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="font-medium">{errors.name}</p>
                  </div>
                )}
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-700 font-semibold">
                  Qual seu WhatsApp?
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsapp: e.target.value })
                      if (errors.whatsapp) setErrors({ ...errors, whatsapp: "" })
                    }}
                    className={`h-12 pl-10 border-gray-200 bg-gray-50 focus:bg-white transition-all ${errors.whatsapp ? "border-red-300 bg-red-50" : ""} focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl`}
                    placeholder="(00) 00000-0000"
                    type="tel"
                  />
                </div>
                {errors.whatsapp ? (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl animate-in fade-in slide-in-from-top-1 mt-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="font-medium">{errors.whatsapp}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 ml-1">É por aqui que você vai receber os resumos. Sem spam! 🤞</p>
                )}
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-gray-700 font-semibold">
                  Seu CEP
                </Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => {
                    setFormData({ ...formData, cep: e.target.value })
                    if (errors.cep) setErrors({ ...errors, cep: "" })
                  }}
                  className={`h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all ${errors.cep ? "border-red-300 bg-red-50" : ""} focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl`}
                  placeholder="00000-000"
                  maxLength={9}
                />
                {errors.cep ? (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl animate-in fade-in slide-in-from-top-1 mt-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="font-medium">{errors.cep}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 ml-1">Para te avisar sobre leis da sua região</p>
                )}
              </div>

              {/* Privacy */}
              <div className={`flex items-start space-x-3 p-4 rounded-xl border transition-colors ${errors.privacy ? "bg-red-50 border-red-200" : "bg-blue-50/50 border-blue-100 hover:bg-blue-50"}`}>
                <Checkbox
                  id="privacy"
                  checked={formData.privacy}
                  onCheckedChange={(checked) => {
                    setFormData({ ...formData, privacy: checked as boolean })
                    if (errors.privacy) setErrors({ ...errors, privacy: "" })
                  }}
                  className="mt-1 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <label
                  htmlFor="privacy"
                  className="text-sm leading-relaxed text-gray-700 cursor-pointer select-none"
                >
                  Concordo em receber notificações no WhatsApp e aceito a{" "}
                  <Link href="/politica-privacidade" className="text-blue-600 font-bold hover:underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
              {errors.privacy && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="font-medium">{errors.privacy}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Continuar <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Já tem conta?{" "}
                <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  Entrar
                </Link>
              </p>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-8 py-4">
              <div className="flex justify-center">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse shadow-inner">
                  <MessageSquare className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div className="space-y-6 text-center">
                <Label htmlFor="otp" className="text-xl font-bold text-gray-900 block">
                  Digite o código de 6 dígitos
                </Label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Input
                      key={i}
                      className="w-12 h-16 text-center text-2xl font-bold border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all"
                      maxLength={1}
                      placeholder="•"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Não recebeu?{" "}
                  <button className="text-blue-600 font-bold hover:underline transition-colors">
                    Reenviar código
                  </button>
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleVerifyOtp}
                  className="w-full h-12 text-lg font-bold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar código"}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep("form")}
                  className="w-full text-gray-600 hover:bg-gray-50 font-medium rounded-xl h-12"
                >
                  Voltar e corrigir número
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-8">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 shadow-inner animate-in zoom-in duration-500">
                <Check className="h-12 w-12 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">Conta criada com sucesso!</h3>
                <p className="text-gray-600 text-lg">
                  Você receberá sua primeira explicação em breve no WhatsApp.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 text-left border border-blue-100 shadow-sm">
                <p className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wide">
                  Próximos passos:
                </p>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">1</div>
                    Configure seus interesses no perfil
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">2</div>
                    Escolha a frequência de notificações
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold">3</div>
                    Explore projetos de lei relevantes
                  </li>
                </ul>
              </div>

              <Link href="/perfil" className="block">
                <Button className="w-full h-14 text-xl font-bold shadow-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl transition-all transform hover:-translate-y-1 active:translate-y-0">
                  Ir para meu Perfil
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
