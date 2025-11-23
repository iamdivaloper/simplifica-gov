import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, PlayCircle, Share2, AlertCircle, Sparkles } from "lucide-react"

export default function DailySummary() {
  // Mock error state for demonstration
  const error = null // Change to "Não foi possível carregar o resumo." to test error UI

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-red-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ops, algo deu errado! 😕</h2>
          <p className="text-gray-600 mb-6">
            Não conseguimos carregar seu resumo diário agora. Pode ser uma instabilidade passageira.
          </p>
          <Button className="w-full font-bold shadow-md hover:shadow-lg transition-all" onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-4 bg-white/10 inline-flex px-3 py-1 rounded-full backdrop-blur-sm">
              <Calendar className="h-4 w-4" />
              <span>Quinta-feira, 21 de Novembro de 2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Seu Resumo Diário
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
              Olá! 👋 Preparamos os destaques mais importantes sobre os projetos que impactam sua vida hoje.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Audio Summary Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 shadow-sm overflow-hidden">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="h-24 w-24 text-blue-600" />
                  </div>
                  <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-4 ring-blue-100 cursor-pointer hover:scale-105 transition-transform group">
                    <PlayCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-2 flex-grow text-center sm:text-left z-10">
                    <h3 className="font-bold text-xl text-gray-900">Resumo em Áudio (2min)</h3>
                    <p className="text-gray-600">
                      A IA do SimplificaGov narra as principais mudanças de hoje para você ouvir no caminho.
                    </p>
                  </div>
                  <Button className="w-full sm:w-auto rounded-full shadow-md font-semibold z-10">
                    Ouvir Agora
                  </Button>
                </CardContent>
              </Card>

              {/* Timeline Updates */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="font-bold text-2xl text-gray-900">
                    Últimas Atualizações
                  </h2>
                </div>

                {/* Update Item 1 */}
                <Card className="border-l-4 border-l-green-500 hover:shadow-xl transition-all duration-300 group border-t border-r border-b border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 text-sm font-semibold">
                        ✅ Aprovado
                      </Badge>
                      <span className="text-sm text-gray-400 font-medium">Há 2 horas</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      Novo Auxílio Transporte Aprovado
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      A Câmara aprovou o projeto que expande o auxílio transporte para trabalhadores autônomos.
                      Isso significa mais mobilidade e menos custos para quem trabalha por conta própria.
                      A medida agora segue para sanção presidencial.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="font-semibold text-primary border-primary/20 hover:bg-blue-50">
                        Ler detalhes completos
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Update Item 2 */}
                <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300 group border-t border-r border-b border-gray-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 text-sm font-semibold">
                        💬 Em Discussão
                      </Badge>
                      <span className="text-sm text-gray-400 font-medium">Há 5 horas</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      PL das Redes Sociais (PL 2630)
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Houve um novo debate acalorado na comissão especial sobre a responsabilidade das plataformas.
                      O foco hoje foi em como combater fake news sem prejudicar a liberdade de expressão.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="font-semibold text-primary border-primary/20 hover:bg-blue-50">
                        Ler detalhes completos
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-8">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Sua Ação Cidadã
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Você já participou de <strong className="text-primary">2 enquetes</strong> esta semana!
                    Sua opinião ajuda a pressionar os parlamentares.
                  </p>
                  <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-900 mb-4">
                      Você apoia a redução da maioridade penal para crimes hediondos?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="w-full hover:bg-green-50 hover:text-green-700 hover:border-green-300 bg-white font-semibold transition-all"
                      >
                        👍 Sim
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-white font-semibold transition-all"
                      >
                        👎 Não
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-blue-800 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Share2 className="h-32 w-32 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 relative z-10">Receba no WhatsApp</h3>
                <p className="text-blue-100 mb-6 leading-relaxed relative z-10">
                  Não quer entrar no site todo dia? Receba esse resumo mastigadinho direto no seu Zap!
                </p>
                <Button className="w-full bg-white text-primary hover:bg-blue-50 border-none font-bold shadow-lg relative z-10">
                  Ativar Notificações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
