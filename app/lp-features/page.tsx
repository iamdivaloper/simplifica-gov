import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MapPin, Shield, Zap, Radio, BookOpen } from "lucide-react"

export default function FeaturesLP() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="text-xl font-bold text-slate-900">SimplificaGov</span>
          </div>
          <Link href="/cadastro">
            <Button>Criar Conta</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Funcionalidades</Badge>
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Tudo o que você precisa para exercer sua cidadania</h1>
          <p className="text-xl text-slate-600">Uma plataforma completa conectada aos dados oficiais do governo.</p>
        </div>

        <Tabs defaultValue="cidadao" className="max-w-4xl mx-auto mb-20">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cidadao">Para o Cidadão</TabsTrigger>
            <TabsTrigger value="tecnologia">Nossa Tecnologia</TabsTrigger>
          </TabsList>
          <TabsContent value="cidadao" className="mt-8 grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Radio className="w-6 h-6 text-blue-600" />}
              title="Áudios Explicativos"
              desc="Resumos em áudio gerados por IA com linguagem natural e sotaque neutro."
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6 text-green-600" />}
              title="Monitoramento Hiperlocal"
              desc="Filtramos as leis da sua cidade com base no seu CEP."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-yellow-600" />}
              title="Alertas em Tempo Real"
              desc="Saiba assim que uma votação importante for concluída."
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6 text-purple-600" />}
              title="Dicionário Político"
              desc="Toque em qualquer termo difícil para ver o significado."
            />
          </TabsContent>
          <TabsContent value="tecnologia" className="mt-8 grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-slate-800" />}
              title="IA Auditável"
              desc="Nossos algoritmos priorizam a fidelidade ao texto original."
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6 text-red-600" />}
              title="Integração WhatsApp API"
              desc="Infraestrutura robusta para entregar milhões de mensagens."
            />
          </TabsContent>
        </Tabs>

        <div className="bg-primary rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Comece a usar hoje</h2>
          <Link href="/cadastro">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold">
              Criar Conta Gratuita
            </Button>
          </Link>
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

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  )
}
