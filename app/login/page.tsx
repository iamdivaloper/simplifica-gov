"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, MessageCircle, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-orange-600" />
            <span>Ops! Faltou algo</span>
          </div>
        ),
        description: "Por favor, preencha seu e-mail e senha para continuar. 😉",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      await auth.login({ email, senha: password })

      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>Bem-vindo de volta!</span>
          </div>
        ),
        description: "Login realizado com sucesso. Redirecionando...",
        className: "border-green-200 bg-green-50",
      })

      // Check for redirect destination
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/perfil"
      sessionStorage.removeItem("redirectAfterLogin")

      setTimeout(() => router.push(redirectPath), 500)
    } catch (err: any) {
      console.error("Login error:", err)
      toast({
        title: (
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span>Não conseguimos fazer login</span>
          </div>
        ),
        description: err.message || "Verifique seu e-mail e senha e tente novamente. Se o problema persistir, entre em contato conosco.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans" role="main">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Voltar para a página inicial"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Voltar para o início
      </Link>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Que bom ter você de volta!
            </h1>
            <p className="text-lg text-gray-600 max-w-xs mx-auto leading-relaxed">
              Entre para continuar descomplicando a política com a gente. 🚀
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <div className="space-y-5">
            {/* WhatsApp Login (Primary) */}
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-5 border border-blue-100 relative overflow-hidden group cursor-pointer hover:border-blue-200 transition-all hover:shadow-md">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-500 rounded-xl p-2.5 shadow-md group-hover:scale-110 transition-transform">
                    <MessageCircle className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg">Entrar com WhatsApp</h2>
                    <p className="text-sm text-gray-600">O jeito mais fácil e seguro 🔒</p>
                  </div>
                </div>
                <Link href="/perfil" className="block w-full" tabIndex={-1}>
                  <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold shadow-md hover:shadow-lg transition-all rounded-full focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Continuar com WhatsApp
                  </Button>
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-2" role="separator">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
                <span className="bg-white px-4 text-gray-400">ou use seu e-mail</span>
              </div>
            </div>

            {/* Email/Password Login */}
            <form onSubmit={handleLogin} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  E-mail ou Telefone
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: maria@email.com"
                  className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-semibold">
                    Senha
                  </Label>
                  <Link
                    href="#"
                    className="text-sm text-blue-600 font-semibold hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 border-gray-200 bg-gray-50 focus:bg-white transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-500 rounded-xl"
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg font-bold shadow-md bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
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
              <Link
                href="/cadastro"
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
              >
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-gray-500">
          Precisa de ajuda?{" "}
          <Link
            href="#"
            className="text-gray-700 font-semibold hover:text-blue-600 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
          >
            Fale com o suporte
          </Link>
        </p>
      </div>
    </main>
  )
}
