import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappMockup } from "@/components/whatsapp-mockup"
import { Mic, MessageSquareText, FileText, Bell, ShieldCheck, Globe, Smartphone } from "lucide-react"


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-muted/30" aria-label="Introdução">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold text-primary bg-primary/10 border-primary/20">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2" aria-hidden="true"></span>
                    IA a favor da cidadania
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
                    Entenda a política <br />
                    <span className="text-primary relative inline-block">
                      sem complicação
                      <svg
                        className="absolute w-full h-3 -bottom-1 left-0 text-secondary -z-10"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                    Traduzimos as leis e notícias do governo para uma linguagem simples. Receba resumos em áudio e texto direto no seu WhatsApp.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/projetos-de-lei" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg px-8 font-bold shadow-md hover:shadow-lg transition-all rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Explorar Projetos de Lei
                    </Button>
                  </Link>
                  <Link href="#como-funciona" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full h-14 text-lg px-8 border-2 bg-white hover:bg-gray-50 rounded-full border-gray-200 hover:border-blue-300 text-gray-700">
                      Como Funciona
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" aria-hidden="true" />
                  Dados oficiais e auditáveis • 100% Gratuito
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 flex justify-center lg:justify-end" aria-hidden="true">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <WhatsappMockup className="relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="py-20 bg-background" aria-label="Como funciona">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Como o SimplificaGov ajuda você?</h2>
              <p className="text-lg text-muted-foreground">
                Nossa tecnologia traduz o "juridiquês" para o português que usamos no dia a dia, garantindo que você entenda seus direitos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <CardStep
                icon={<MessageSquareText className="w-8 h-8 text-primary" aria-hidden="true" />}
                title="1. Você escolhe"
                description="Selecione os temas que te interessam: saúde, educação, transporte ou economia."
                color="bg-primary/10"
              />
              <CardStep
                icon={<Mic className="w-8 h-8 text-secondary-foreground" aria-hidden="true" />}
                title="2. Nós traduzimos"
                description="Nossa inteligência artificial lê os documentos oficiais e cria resumos simples e diretos."
                color="bg-secondary/20"
              />
              <CardStep
                icon={<Smartphone className="w-8 h-8 text-green-600" aria-hidden="true" />}
                title="3. Você recebe"
                description="Os resumos chegam no seu WhatsApp ou e-mail, em texto ou áudio, como você preferir."
                color="bg-green-100"
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="py-20 bg-muted/30" aria-label="Benefícios">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                <BenefitCard title="Acessível" icon="🎧" desc="Ouça os resumos onde estiver." />
                <BenefitCard title="Claro" icon="🗣️" desc="Sem termos difíceis ou confusos." />
                <BenefitCard title="Local" icon="📍" desc="Saiba o que muda na sua região." />
                <BenefitCard title="Leve" icon="⚡" desc="Site rápido e compatível com tudo." />
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-lg bg-secondary text-secondary-foreground font-bold text-sm">
                  CIDADANIA ATIVA
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Informação que empodera.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Acreditamos que todo brasileiro tem o direito de entender as leis que impactam sua vida. O SimplificaGov quebra as barreiras da linguagem burocrática.
                </p>
                <ul className="space-y-3">
                  {[
                    "Fique por dentro dos seus direitos",
                    "Acompanhe o trabalho dos políticos",
                    "Participe ativamente da democracia",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section id="transparencia" className="py-20 border-t border-border" aria-label="Transparência">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Compromisso com a Verdade</h2>
              <p className="text-muted-foreground mb-12 text-lg">
                Nossa IA é treinada para ser neutra e objetiva. Sempre fornecemos o link para a fonte oficial (Câmara, Senado ou Diário Oficial) para você conferir.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <TransparencyItem icon={<ShieldCheck aria-hidden="true" />} text="IA Auditável" />
              <TransparencyItem icon={<FileText aria-hidden="true" />} text="Fontes Oficiais" />
              <TransparencyItem icon={<Globe aria-hidden="true" />} text="Sem Viés Partidário" />
              <TransparencyItem icon={<Bell aria-hidden="true" />} text="Alertas Verificados" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-card text-center border-t border-border" aria-label="Chamada para ação">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Comece a descomplicar hoje.</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de cidadãos que já estão transformando a maneira de acompanhar a política.
            </p>
            <Link href="/cadastro">
              <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-md hover:shadow-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                Criar Conta Grátis
              </Button>
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">Leva menos de 2 minutos. É 100% gratuito.</p>
          </div>
        </section>
      </main>

    </div >
  )
}

function CardStep({
  icon,
  title,
  description,
  color,
}: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <article className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center mb-6`}>{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </article>
  )
}

function BenefitCard({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <article className="bg-card p-6 rounded-xl shadow-sm border border-border hover:border-primary/20 transition-colors">
      <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </article>
  )
}

function TransparencyItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <span className="font-semibold text-foreground">{text}</span>
    </div>
  )
}
