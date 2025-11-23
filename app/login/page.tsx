"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Sparkles, AlertCircle } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate validation/login
    setTimeout(() => {
      setIsLoading(false)
      if (!email || !password) {
        setError("Ops! Parece que você esqueceu de preencher algo. Dá uma olhadinha? 😉")
        return
      }
      // Simulate invalid credentials for demo
      setError("Não encontramos essa conta. Que tal conferir se digitou certinho?")
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 font-sans">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para o início
      </Link>

      <div className="w-full max-w-md space-y-8">
        {/* Header with Simplinho */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-blue-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <Image
              src="/simplinho.png"
              alt="Simplinho"
              width={110}
              height={110}
              className="rounded-full shadow-xl relative z-10 border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md z-20">
              <Sparkles className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Que bom ter você de volta!
            </h1>
            <p className="text-lg text-gray-600 max-w-xs mx-auto leading-relaxed">
              Entre para continuar descomplicando a política com a gente.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="space-y-5">
            {/* WhatsApp Login (Primary) */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100 relative overflow-hidden group cursor-pointer hover:border-green-200 transition-colors">
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="bg-green-500 rounded-xl p-2.5 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Entrar com WhatsApp</h3>
                    <p className="text-sm text-gray-600">O jeito mais fácil e seguro 🔒</p>
                  </div>
                </div>
                <Link href="/perfil" className="block relative z-10">
                  <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]">
                    Continuar com WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span className="bg-white px-4 text-gray-400">ou use seu e-mail</span>
              </div>
            </div>

            {/* Email/Password Login */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  E-mail ou Telefone
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: maria@email.com"
                  className={`h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all ${error ? "border-red-300 bg-red-50" : ""} focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">
                    Senha
                  </Label>
                  <Link href="#" className="text-sm text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all ${error ? "border-red-300 bg-red-50" : ""} focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl`}
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg font-bold shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : "Entrar na minha conta"}
              </Button>
            </form>
          </div>

          {/* Sign up link */}
          <div className="pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              Ainda não tem conta?{" "}
              <Link href="/cadastro" className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500">
          Precisa de ajuda?{" "}
          <Link href="#" className="text-gray-700 font-semibold hover:text-blue-600 hover:underline transition-colors">
            Fale com o suporte
          </Link>
        </p>
      </div>
    </div>
  )
}
