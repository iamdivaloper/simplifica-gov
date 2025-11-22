import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, MessageSquare } from "lucide-react"

export default function AccessibleLP() {
  return (
    <div className="min-h-screen bg-[#FACC15] font-sans text-black">
      <header className="p-4 border-b-2 border-black bg-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-black rounded flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
            <span className="text-2xl font-black tracking-tight">SimplificaGov</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-lg font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white px-2 py-1 transition-colors"
            >
              ACESSAR CONTA
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="max-w-4xl mx-auto bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase">
            Entenda seus direitos <br /> sem complicação
          </h1>

          <p className="text-2xl md:text-3xl font-bold mb-12 leading-relaxed">
            Receba áudios e textos no WhatsApp explicando o que acontece no governo.
          </p>

          <Link href="/cadastro" className="block w-full md:w-auto">
            <Button className="w-full md:w-auto h-20 text-2xl font-black bg-blue-700 hover:bg-blue-800 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all px-12">
              CRIAR MINHA CONTA GRÁTIS
            </Button>
          </Link>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <PlayCircle className="w-12 h-12 shrink-0" strokeWidth={2.5} />
              <div>
                <h3 className="text-xl font-black mb-2">ESCUTE TUDO</h3>
                <p className="text-lg font-medium">Não precisa ler. A gente manda áudio explicando tudo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquare className="w-12 h-12 shrink-0" strokeWidth={2.5} />
              <div>
                <h3 className="text-xl font-black mb-2">NO SEU ZAP</h3>
                <p className="text-lg font-medium">Fácil de usar. Chega direto no seu celular.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white p-8 text-center mt-auto">
        <p className="text-lg font-bold">SimplificaGov - Tecnologia para todos.</p>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <Link href="/">
          <Button variant="secondary" size="sm" className="shadow-lg border border-black">
            Voltar para Principal
          </Button>
        </Link>
      </div>
    </div>
  )
}
