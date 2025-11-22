import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-500 hover:text-primary flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            S
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
          <p className="text-gray-500">Entre para ver suas explicações salvas</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail ou WhatsApp</Label>
            <Input id="email" placeholder="seu@email.com ou (11) 99999-9999" className="h-12" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="text-sm text-primary font-medium hover:underline">
                Esqueceu?
              </Link>
            </div>
            <Input id="password" type="password" className="h-12" />
          </div>

          <Link href="/perfil" className="block w-full">
            <Button className="w-full h-12 text-lg font-semibold shadow-md">Entrar</Button>
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Ou continue com</span>
          </div>
        </div>

        <Link href="/perfil" className="block w-full">
          <Button
            variant="outline"
            className="w-full h-12 border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 flex gap-2 font-semibold bg-transparent"
          >
            <MessageCircle className="w-5 h-5" />
            Entrar com WhatsApp
          </Button>
        </Link>

        <p className="text-center text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="font-bold text-primary hover:underline">
            Criar conta grátis
          </Link>
        </p>
      </div>
    </div>
  )
}
