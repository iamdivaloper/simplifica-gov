import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Users, Target, Heart, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="bg-white border-b py-20" aria-labelledby="hero-heading">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 px-4 py-1.5 text-sm font-medium">
              🤝 Sobre o SimplificaGov
            </Badge>
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              Quem somos e <br className="hidden md:block" /> por que existimos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Nossa missão é simples: traduzir o "juridiquês" para a língua que todos nós falamos. Porque informação clara é poder para o cidadão. 💪
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 -mt-12 relative z-10" aria-label="Nossos Valores e Missão">
          <div className="grid md:grid-cols-3 gap-6">
            <ValueCard
              icon={<Target className="w-8 h-8 text-blue-600" aria-hidden="true" />}
              title="Nossa Missão"
              description="Tornar a política compreensível para qualquer pessoa, sem palavras difíceis ou burocracia desnecessária."
            />
            <ValueCard
              icon={<Users className="w-8 h-8 text-purple-600" aria-hidden="true" />}
              title="Para Quem É"
              description="Para você que trabalha, estuda e não tem tempo a perder decifrando leis complicadas, mas quer exercer sua cidadania."
            />
            <ValueCard
              icon={<Heart className="w-8 h-8 text-red-500" aria-hidden="true" />}
              title="Nossos Valores"
              description="Transparência total, neutralidade política e respeito profundo pelo seu tempo e pela sua inteligência."
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white mt-20" aria-labelledby="story-heading">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h2 id="story-heading" className="text-3xl md:text-4xl font-bold text-gray-900">Por que criamos isso?</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Percebemos que muitas decisões importantes em Brasília afetam a vida de milhões, mas a maioria das
                  pessoas só fica sabendo quando já é tarde demais, ou através de notícias confusas e sensacionalistas.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  O SimplificaGov nasceu para ser a ponte segura entre o Diário Oficial e o grupo da família no WhatsApp.
                  Usamos tecnologia de ponta para ler milhares de documentos e entregar apenas o que importa para você,
                  do jeito que você entende.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-full border border-gray-200">
                  <CheckCircle2 className="text-green-500 h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Sem viés partidário</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-full border border-gray-200">
                  <CheckCircle2 className="text-green-500 h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Fontes 100% verificadas</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-full border border-gray-200">
                  <CheckCircle2 className="text-green-500 h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Foco no impacto real</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-full border border-gray-200">
                  <CheckCircle2 className="text-green-500 h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Privacidade garantida</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-200">
                <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
                <div className="text-center relative z-10">
                  <div className="bg-white p-4 rounded-full shadow-sm inline-flex mb-4">
                    <ShieldCheck className="h-12 w-12 text-gray-400" aria-hidden="true" />
                  </div>
                  <p className="text-gray-500 font-medium text-lg">Foto da Equipe / Ilustração</p>
                  <p className="text-sm text-gray-400 mt-2">Em breve</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center border-t" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Faça parte dessa mudança</h2>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
              Comece a receber seus resumos hoje mesmo e entenda seus direitos de forma simples e rápida. 🚀
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-md hover:shadow-lg rounded-full bg-blue-600 hover:bg-blue-700">
                Criar Conta Grátis <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <article className="h-full">
      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group bg-white h-full">
        <CardHeader className="flex flex-col items-center text-center pb-2 pt-8">
          <div className="mb-4 bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-100">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </article>
  )
}
