import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, PlayCircle, Share2 } from "lucide-react"

export default function DailySummary() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <main className="container mx-auto px-4 py-8 pb-20">
        {/* Header Section */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
            <Calendar className="h-4 w-4" />
            <span>Quinta-feira, 21 de Novembro de 2025</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Seu Resumo Diário</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Olá, Cidadão! Aqui estão as principais atualizações sobre os projetos que afetam sua vida hoje.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Summary Card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2 flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-900">Ouça seu resumo em 2 minutos</h3>
                  <p className="text-sm text-gray-600">
                    A inteligência artificial do SimplificaGov narra as principais mudanças de hoje para você.
                  </p>
                </div>
                <Button className="w-full sm:w-auto rounded-full shadow-md">Ouvir Agora</Button>
              </CardContent>
            </Card>

            {/* Timeline Updates */}
            <div className="space-y-6">
              <h2 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Últimas Atualizações
              </h2>

              {/* Update Item 1 */}
              <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                      Aprovado
                    </Badge>
                    <span className="text-sm text-muted-foreground">Há 2 horas</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Novo Auxílio Transporte Aprovado</h3>
                  <p className="text-gray-600 mb-4">
                    A Câmara aprovou o projeto que expande o auxílio transporte para trabalhadores autônomos. A medida
                    agora segue para sanção presidencial.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Ler detalhes
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Update Item 2 */}
              <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      Em Discussão
                    </Badge>
                    <span className="text-sm text-muted-foreground">Há 5 horas</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">PL das Redes Sociais (PL 2630)</h3>
                  <p className="text-gray-600 mb-4">
                    Houve um novo debate acalorado na comissão especial sobre a responsabilidade das plataformas.
                    Entenda os principais pontos da discussão de hoje.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Ler detalhes
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Sua Ação Cidadã
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Você já participou de 2 enquetes esta semana! Participe de mais uma para manter sua cidadania ativa.
                </p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-medium text-sm mb-3">Você apoia a redução da maioridade penal?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-green-50 hover:text-green-700 hover:border-green-200 bg-transparent"
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-red-50 hover:text-red-700 hover:border-red-200 bg-transparent"
                    >
                      Não
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 p-6 rounded-xl text-white shadow-md">
              <h3 className="font-bold text-lg mb-2">Receba no WhatsApp</h3>
              <p className="text-blue-100 text-sm mb-4">
                Não quer entrar no site todo dia? Receba esse resumo direto no seu Zap!
              </p>
              <Button className="w-full bg-white text-primary hover:bg-gray-100 border-none font-bold">
                Ativar Notificações
              </Button>
            </div>
          </div>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
