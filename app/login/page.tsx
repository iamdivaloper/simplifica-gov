import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-primary flex items-center gap-2 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="w-full max-w-md space-y-6">
        {/* Header with Simplinho */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src="/simplinho.png"
              alt="Simplinho"
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Que bom te ver de novo!
            </h1>
            <p className="text-lg text-gray-600">
              Entre para continuar acompanhando suas leis favoritas
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border-2 border-gray-100">
          <div className="space-y-5">
            {/* WhatsApp Login (Primary) */}
            <div className="space-y-3">
              <div className="bg-green-50 rounded-2xl p-5 border-2 border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Entrar com WhatsApp</h3>
                    <p className="text-sm text-gray-600">Mais rápido e seguro 🔒</p>
                  </div>
                </div>
                <Link href="/perfil" className="block">
                  <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Continuar com WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-500">ou use e-mail</span>
              </div>
            </div>

            {/* Email/Password Login */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  E-mail ou WhatsApp
                </Label>
                <Input
                  id="email"
                  placeholder="seu@email.com ou (11) 99999-9999"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Senha
                  </Label>
                  <Link href="#" className="text-sm text-primary font-semibold hover:underline">
                    Esqueceu? 🤔
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <Link href="/perfil" className="block w-full">
                <Button className="w-full h-12 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>

          {/* Sign up link */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Ainda não tem conta?{" "}
              <Link href="/cadastro" className="font-bold text-primary hover:underline">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500">
          Problemas para entrar?{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Fale com a gente
          </Link>
        </p>
      </div>
    </div>
  )
}
