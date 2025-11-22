"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Loader2, MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CadastroPage() {
  const [step, setStep] = useState<"form" | "otp" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <Image
              src="/simplinho.png"
              alt="Simplinho"
              width={80}
              height={80}
              className="rounded-full shadow-lg mx-auto"
            />
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {step === "form" && "Criar sua conta gratuita"}
              {step === "otp" && "Confirme seu número"}
              {step === "success" && (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                  Tudo pronto!
                </span>
              )}
            </h1>
            <p className="text-lg text-gray-600">
              {step === "form" && "Receba explicações simples sobre leis que afetam você"}
              {step === "otp" && "Enviamos um código para seu WhatsApp"}
              {step === "success" && "Sua conta foi criada com sucesso"}
            </p>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-8 border border-gray-200">
          {step === "form" && (
            <form onSubmit={handleSendOtp} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Como podemos te chamar?
                </Label>
                <Input
                  id="name"
                  required
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="Seu nome"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-gray-700 font-medium">
                  Qual seu WhatsApp?
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="whatsapp"
                    required
                    className="h-12 pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                    placeholder="(00) 00000-0000"
                    type="tel"
                  />
                </div>
                <p className="text-sm text-gray-500">É por aqui que você vai receber os resumos. Sem spam, prometemos! 🤞</p>
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <Label htmlFor="cep" className="text-gray-700 font-medium">
                  Seu CEP
                </Label>
                <Input
                  id="cep"
                  required
                  className="h-12 border-gray-300 focus:border-primary focus:ring-primary"
                  placeholder="00000-000"
                  maxLength={9}
                />
                <p className="text-sm text-gray-500">Para te avisar sobre leis da sua região</p>
              </div>

              {/* Privacy */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Checkbox id="privacy" required className="mt-1" />
                <label
                  htmlFor="privacy"
                  className="text-sm leading-relaxed text-gray-700 cursor-pointer"
                >
                  Concordo em receber notificações no WhatsApp e aceito a{" "}
                  <Link href="/politica-privacidade" className="text-primary font-semibold hover:underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold shadow-lg"
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
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-6 py-4">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                  <MessageSquare className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <div className="space-y-4 text-center">
                <Label htmlFor="otp" className="text-lg font-semibold text-gray-900">
                  Digite o código de 6 dígitos
                </Label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Input
                      key={i}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 focus:border-primary rounded-lg"
                      maxLength={1}
                      placeholder="•"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Não recebeu?{" "}
                  <button className="text-primary font-semibold hover:underline">
                    Reenviar código
                  </button>
                </p>
              </div>

              <Button
                onClick={handleVerifyOtp}
                className="w-full h-12 text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Confirmar"}
              </Button>

              <Button
                variant="ghost"
                onClick={() => setStep("form")}
                className="w-full text-gray-600"
              >
                Voltar
              </Button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6 space-y-6">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Conta criada!</h3>
                <p className="text-gray-600">
                  Você receberá sua primeira explicação em breve no WhatsApp.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-left border border-blue-100">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Próximos passos:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Configure seus interesses no perfil</li>
                  <li>✓ Escolha a frequência de notificações</li>
                  <li>✓ Explore projetos de lei relevantes</li>
                </ul>
              </div>

              <Link href="/perfil" className="block">
                <Button className="w-full h-12 text-lg font-semibold shadow-lg">
                  Ir para meu Perfil
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
