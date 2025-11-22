import Link from "next/link"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Share2,
  PlayCircle,
  FileText,
  ShieldCheck,
  ExternalLink,
} from "lucide-react"

export default function ProjectDetails() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <main className="pb-20">
        {/* Header / Title Area */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <Link
              href="/projetos-de-lei"
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para lista
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                Tecnologia
              </Badge>
              <Badge variant="outline" className="text-gray-600 border-gray-300">
                PL 2630/2020
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Regras para Redes Sociais e Combate às Fake News
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Atualizado há 2 dias
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                Explicação verificada por IA
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Box */}
            <Card className="border-none shadow-md bg-white overflow-hidden">
              <div className="bg-primary/5 p-6 border-b border-primary/10">
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resumo Simples
                </h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-lg leading-relaxed text-gray-700">
                  Este projeto quer criar regras claras para empresas como Facebook, Google e Twitter operarem no
                  Brasil.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Isso significa que elas terão que ser mais transparentes sobre como funcionam seus algoritmos e pagar
                  por conteúdo jornalístico.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 font-medium">
                  Na prática, busca diminuir a circulação de notícias falsas e crimes digitais.
                </p>

                <div className="pt-4">
                  <Button className="w-full md:w-auto gap-2 bg-gray-900 hover:bg-gray-800">
                    <PlayCircle className="h-5 w-5" /> Ouvir explicação (2min)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Impact Box - CRUCIAL */}
            <div className="bg-blue-600 rounded-xl p-1 shadow-lg text-white">
              <div className="bg-white text-gray-900 rounded-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-700">
                  <AlertCircle className="h-6 w-6" />
                  Como isso afeta você?
                </h2>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>
                      <strong>Mais segurança online:</strong> Reduz a chance de você cair em golpes ou ler mentiras
                      sobre saúde e eleições.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span>
                      <strong>Crianças protegidas:</strong> Exige que as redes sociais tenham cuidados especiais com
                      contas de menores de idade.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>
                      <strong>Conteúdo pago:</strong> Alguns serviços de notícias podem passar a ser remunerados pelas
                      plataformas.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Impact */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Quem é mais impactado?</h3>
              <div className="flex flex-wrap gap-3">
                {["Jovens e Crianças", "Usuários de Redes Sociais", "Jornalistas", "Pequenos Negócios Digitais"].map(
                  (item) => (
                    <Badge key={item} variant="secondary" className="px-3 py-1 text-sm">
                      {item}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Situação Atual</h3>
                <div className="relative pl-4 border-l-2 border-gray-200 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 ring-4 ring-white"></div>
                    <p className="text-sm font-bold text-green-600">Aprovado no Senado</p>
                    <p className="text-xs text-gray-500">30 Jun 2020</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white"></div>
                    <p className="text-sm font-bold text-blue-600">Em debate na Câmara</p>
                    <p className="text-xs text-gray-500">Atual</p>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <p className="text-sm font-bold text-gray-600">Sanção Presidencial</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Autor</p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                      AV
                    </div>
                    <p className="font-medium">Sen. Alessandro Vieira</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Button variant="outline" className="w-full h-12 gap-2 font-bold border-2 bg-transparent">
              <Share2 className="h-4 w-4" /> Compartilhar no WhatsApp
            </Button>

            {/* Sources */}
            <div className="text-xs text-gray-500 space-y-2">
              <p className="font-bold uppercase">Fontes Oficiais</p>
              <Link href="#" className="flex items-center hover:text-primary hover:underline">
                <ExternalLink className="h-3 w-3 mr-1" /> Câmara dos Deputados
              </Link>
              <Link href="#" className="flex items-center hover:text-primary hover:underline">
                <ExternalLink className="h-3 w-3 mr-1" /> Senado Federal
              </Link>
              <Link href="#" className="flex items-center hover:text-primary hover:underline">
                <ExternalLink className="h-3 w-3 mr-1" /> Querido Diário
              </Link>
            </div>
          </div>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
