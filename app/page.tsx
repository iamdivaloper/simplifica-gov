import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappMockup } from "@/components/whatsapp-mockup"
import { Mic, MessageSquareText, FileText, Bell, ShieldCheck, Globe, Smartphone } from "lucide-react"


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold text-primary bg-blue-100 border-blue-200">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                    IA a favor da democracia
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    Entender o governo <br />
                    <span className="text-primary relative inline-block">
                      ficou simples.
                      <svg
                        className="absolute w-full h-3 -bottom-1 left-0 text-secondary -z-10"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-[600px] leading-relaxed">
                    Receba explicações em linguagem simples e em áudio sobre leis, votações e decisões que afetam sua
                    vida - direto no WhatsApp.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/projetos-de-lei" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg px-8 font-bold shadow-xl hover:scale-105 transition-transform"
                    >
                      Explorar Projetos de Lei
                    </Button>
                  </Link>
                  <Link href="#como-funciona" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full h-14 text-lg px-8 border-2 bg-transparent">
                      Como Funciona
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Dados oficiais da Câmara e Senado • 100% Gratuito
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-yellow-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <WhatsappMockup className="relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="como-funciona" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Como funciona?</h2>
              <p className="text-lg text-gray-600">
                Nossa tecnologia traduz o "juridiquês" para o português que a gente fala todos os dias.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <CardStep
                icon={<MessageSquareText className="w-8 h-8 text-primary" />}
                title="1. Mande sua dúvida"
                description="Envie um áudio ou texto perguntando sobre um projeto de lei, benefício ou votação."
                color="bg-blue-50"
              />
              <CardStep
                icon={<Mic className="w-8 h-8 text-secondary-foreground" />}
                title="2. A IA traduz tudo"
                description="Nossa inteligência artificial lê os documentos oficiais e traduz para linguagem simples."
                color="bg-yellow-50"
              />
              <CardStep
                icon={<Smartphone className="w-8 h-8 text-green-600" />}
                title="3. Receba no Zap"
                description="Você recebe a explicação em texto ou áudio, resumida e direto no seu celular."
                color="bg-green-50"
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
                <BenefitCard title="Áudio & Texto" icon="🎧" desc="Ouça enquanto trabalha ou está no ônibus." />
                <BenefitCard title="Sem Juridiquês" icon="🗣️" desc="Entenda seus direitos sem complicação." />
                <BenefitCard title="Hiperlocal" icon="📍" desc="Saiba o que muda no seu bairro." />
                <BenefitCard title="Internet Leve" icon="⚡" desc="Funciona bem até no 3G." />
              </div>
              <div className="order-1 md:order-2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-lg bg-secondary text-secondary-foreground font-bold text-sm">
                  FEITO PARA O CIDADÃO
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Informação que chega até você, onde você estiver.
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Não precisa ter internet rápida nem celular de última geração. O SimplificaGov foi criado pensando na
                  realidade da maioria dos brasileiros.
                </p>
                <ul className="space-y-3">
                  {[
                    "Notificações do que realmente importa",
                    "Explicações baseadas em fatos, não opiniões",
                    "Totalmente gratuito para a população",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section id="transparencia" className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Tecnologia e Transparência</h2>
              <p className="text-gray-600 mb-12 text-lg">
                Utilizamos Inteligência Artificial responsável. Todas as nossas explicações vêm com o link da fonte
                oficial (Câmara, Senado ou Diário Oficial).
              </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <TransparencyItem icon={<ShieldCheck />} text="IA Auditável" />
              <TransparencyItem icon={<FileText />} text="Fontes Oficiais" />
              <TransparencyItem icon={<Globe />} text="Sem Viés Político" />
              <TransparencyItem icon={<Bell />} text="Alertas Reais" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Não fique mais na dúvida.</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Junte-se a milhares de brasileiros que já entendem o que acontece no governo de forma simples.
            </p>
            <Link href="/cadastro">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold text-primary shadow-lg">
                Começar Agora
              </Button>
            </Link>
            <p className="mt-6 text-sm text-blue-200 opacity-80">Leva menos de 2 minutos. É grátis.</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#172554] text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center md:text-left">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <Image
                  src="/logo-icon.png"
                  alt="SimplificaGov Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg"
                />
                <span className="text-xl font-bold text-white">SimplificaGov</span>
              </div>
              <p className="text-sm max-w-xs mx-auto md:mx-0">
                Traduzindo o governo para você. Apoiando a cidadania através da tecnologia e da linguagem simples.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-full">
                  Ver outras versões:
                </span>
                <Link href="/lp-minimal" className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded">
                  Minimalista
                </Link>
                <Link
                  href="/lp-accessible"
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded"
                >
                  Alto Contraste
                </Link>
                <Link
                  href="/lp-features"
                  className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded"
                >
                  Funcionalidades
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sobre" className="hover:text-white">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/#como-funciona" className="hover:text-white">
                    Como funciona
                  </Link>
                </li>
                <li>
                  <Link href="/politica-privacidade" className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li>ajuda@simplificagov.com.br</li>
                <li>Brasília, DF</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-xs text-center">
            © 2025 SimplificaGov. Todos os direitos reservados.
          </div>
        </div>
      </footer>
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
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-16 w-16 rounded-full ${color} flex items-center justify-center mb-6`}>{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

function BenefitCard({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-primary/20 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

function TransparencyItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-primary">{icon}</div>
      <span className="font-semibold text-gray-700">{text}</span>
    </div>
  )
}
