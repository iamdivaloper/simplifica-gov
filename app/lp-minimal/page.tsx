import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WhatsappMockup } from "@/components/whatsapp-mockup"
import { ArrowRight } from "lucide-react"

export default function MinimalLP() {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">SimplificaGov</span>
        </div>
        <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-primary">
          Entrar
        </Link>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center container mx-auto px-4 gap-12 py-12">
        <div className="max-w-lg space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            O governo, <br />
            <span className="text-primary">traduzido.</span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Receba explicações simples sobre leis e votações direto no seu WhatsApp. Sem juridiquês.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/cadastro" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 text-lg px-8 font-bold shadow-lg rounded-full">
                Começar Grátis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="text-sm text-gray-400 pt-4">Disponível para todo o Brasil. 100% gratuito.</div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"></div>
          <WhatsappMockup className="relative z-10 shadow-2xl border-4 border-white" />
        </div>
      </main>

      <div className="fixed bottom-4 right-4 z-50">
        <Link href="/">
          <Button variant="secondary" size="sm" className="shadow-lg border">
            Voltar para Principal
          </Button>
        </Link>
      </div>
    </div>
  )
}
