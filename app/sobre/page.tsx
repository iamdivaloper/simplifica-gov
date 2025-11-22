import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Users, Target, Heart } from "lucide-react"

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre o SimplificaGov</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Nossa missão é democratizar o acesso à informação pública, traduzindo o "juridiquês" para a língua que
              todos falam.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              icon={<Target className="w-10 h-10 text-primary" />}
              title="Missão"
              description="Tornar a política e as leis compreensíveis para qualquer cidadão, independentemente de seu grau de instrução."
            />
            <Card
              icon={<Users className="w-10 h-10 text-secondary-foreground" />}
              title="Para Quem"
              description="Para trabalhadores, estudantes e cidadãos que não têm tempo a perder decifrando textos complexos."
            />
            <Card
              icon={<Heart className="w-10 h-10 text-red-500" />}
              title="Valores"
              description="Transparência total, neutralidade política e acessibilidade real para todos os brasileiros."
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Por que criamos isso?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Percebemos que muitas decisões importantes em Brasília afetam a vida de milhões, mas a maioria das
                pessoas só fica sabendo quando já é tarde demais, ou através de notícias confusas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                O SimplificaGov nasceu para ser a ponte entre o Diário Oficial e o grupo da família no WhatsApp. Usamos
                tecnologia de ponta para ler milhares de documentos e entregar apenas o que importa para você.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-500" /> Sem viés partidário
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="text-green-500" /> Fontes verificadas
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <span className="text-gray-400 font-medium">Imagem da Equipe ou Ilustração</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Faça parte dessa mudança</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Comece a receber seus resumos hoje mesmo e entenda seus direitos.
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="h-14 px-8 text-lg font-bold">
                Criar Conta Grátis <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
        <p>© 2025 SimplificaGov. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

function Card({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="mb-6 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}
