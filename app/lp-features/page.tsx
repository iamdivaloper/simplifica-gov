import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MapPin, Shield, Zap, Radio, BookOpen, CheckCircle2, ArrowRight } from "lucide-react"

export default function FeaturesLP() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-white border-b py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 px-4 py-1.5 text-sm font-medium">
              ✨ Funcionalidades do SimplificaGov
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              Tudo para você exercer<br className="hidden md:block" /> sua cidadania com poder
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Uma plataforma completa, conectada aos dados oficiais e desenhada para traduzir a complexidade de Brasília para a sua realidade. 🇧🇷
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/cadastro">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 shadow-md rounded-full">
                  Criar Conta Gratuita
                </Button>
              </Link>
              <Link href="/projetos-de-lei">
                <Button size="lg" variant="outline" className="border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-semibold h-12 px-8 rounded-full">
                  Explorar Projetos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <Tabs defaultValue="cidadao" className="max-w-5xl mx-auto mb-20">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-white border border-gray-200 shadow-sm rounded-full p-1">
                <TabsTrigger value="cidadao" className="rounded-full text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Para o Cidadão
                </TabsTrigger>
                <TabsTrigger value="tecnologia" className="rounded-full text-sm font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Nossa Tecnologia
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cidadao" className="mt-0 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FeatureCard
                icon={<Radio className="w-6 h-6 text-blue-600" />}
                title="Áudios Explicativos"
                desc="Não tem tempo de ler? Ouça resumos de leis gerados por IA com linguagem natural e objetiva em 2 minutos."
              />
              <FeatureCard
                icon={<MapPin className="w-6 h-6 text-green-600" />}
                title="Monitoramento Hiperlocal"
                desc="Filtramos automaticamente as leis que afetam seu bairro e cidade com base no seu CEP. Saiba o que muda na sua rua."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-yellow-600" />}
                title="Alertas em Tempo Real"
                desc="Seja o primeiro a saber. Receba notificações assim que uma votação importante for concluída ou um projeto avançar."
              />
              <FeatureCard
                icon={<BookOpen className="w-6 h-6 text-purple-600" />}
                title="Dicionário Político"
                desc="Adeus 'juridiquês'. Toque em qualquer termo difícil para ver uma explicação simples e direta do que ele significa."
              />
            </TabsContent>

            <TabsContent value="tecnologia" className="mt-0 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-slate-800" />}
                title="IA Auditável e Neutra"
                desc="Nossos algoritmos são desenhados para priorizar a fidelidade ao texto original, sem viés partidário ou opiniões."
              />
              <FeatureCard
                icon={<Bell className="w-6 h-6 text-red-600" />}
                title="Integração WhatsApp API"
                desc="Infraestrutura robusta para entregar milhões de mensagens com alta disponibilidade e baixa latência."
              />
              <FeatureCard
                icon={<CheckCircle2 className="w-6 h-6 text-teal-600" />}
                title="Dados Oficiais em Tempo Real"
                desc="Conexão direta com as APIs da Câmara e Senado. A informação chega aqui no mesmo instante que é publicada."
              />
              <FeatureCard
                icon={<Shield className="w-6 h-6 text-indigo-600" />}
                title="Privacidade em Primeiro Lugar"
                desc="Seus dados de navegação e preferências são seus. Seguimos rigorosamente a LGPD e não vendemos informações."
              />
            </TabsContent>
          </Tabs>

          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Pronto para transformar sua cidadania?</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Junte-se a milhares de brasileiros que já estão acompanhando a política de perto, de forma simples e rápida. 🚀
              </p>
              <Link href="/cadastro">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all rounded-full">
                  Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/">
          <Button variant="secondary" size="sm" className="shadow-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-full px-6 py-6 h-auto">
            Voltar para Início
          </Button>
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-100">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 pt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  )
}
