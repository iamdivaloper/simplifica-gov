"use client"

import { useState, useRef } from "react"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2, Clock, PlayCircle, Share2, AlertCircle, Sparkles, Pause, ThumbsUp, ThumbsDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DailySummary() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [pollVote, setPollVote] = useState<'sim' | 'nao' | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  // Mock error state for demonstration
  const error = null // Change to "Não foi possível carregar o resumo." to test error UI

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        toast({
          title: "Áudio pausado",
          description: "Você pode retomar quando quiser! ⏸️",
        })
      } else {
        audioRef.current.play()
        toast({
          title: <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-blue-600" />
            <span>Reproduzindo resumo</span>
          </div>,
          description: "Ouça as principais atualizações de hoje! 🎧",
          className: "border-blue-200 bg-blue-50",
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    toast({
      title: <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span>Resumo concluído!</span>
      </div>,
      description: "Você está por dentro de tudo! 🎉",
      className: "border-green-200 bg-green-50",
    })
  }

  const handleShare = (title: string) => {
    const url = window.location.href
    const text = `Confira: ${title} - SimplificaGov`

    if (navigator.share) {
      navigator.share({ title, text, url })
        .then(() => {
          toast({
            title: <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-600" />
              <span>Compartilhado!</span>
            </div>,
            description: "Obrigado por espalhar informação de qualidade! 🙌",
            className: "border-blue-200 bg-blue-50",
          })
        })
        .catch(() => {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${text}\n${url}`)
          toast({
            title: "Link copiado!",
            description: "Cole onde quiser compartilhar 📋",
          })
        })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${text}\n${url}`)
      toast({
        title: "Link copiado!",
        description: "Cole onde quiser compartilhar 📋",
      })
    }
  }

  const handlePollVote = (vote: 'sim' | 'nao') => {
    setPollVote(vote)

    toast({
      title: <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span>Voto registrado!</span>
      </div>,
      description: vote === 'sim'
        ? "Sua opinião foi contabilizada. Você votou SIM 👍"
        : "Sua opinião foi contabilizada. Você votou NÃO 👎",
      className: "border-green-200 bg-green-50",
    })
  }

  const handleEnableNotifications = () => {
    setNotificationsEnabled(true)

    toast({
      title: <div className="flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <span>Notificações ativadas!</span>
      </div>,
      description: "Você receberá atualizações importantes no WhatsApp 📱",
      className: "border-green-200 bg-green-50",
    })
  }

  const handleViewDetails = (plId: string) => {
    router.push(`/projetos-de-lei/${plId}`)
  }


  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center p-4" role="alert">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-red-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Ops, algo deu errado! 😕</h1>
          <p className="text-gray-600 mb-6">
            Não conseguimos carregar suas atualizações agora. Pode ser uma instabilidade passageira.
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
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/resumo-diario.mp3"
        onEnded={handleAudioEnded}
        preload="metadata"
      />

      <main className="pb-20" role="main">
        {/* Hero Section */}
        <section className="bg-white border-b py-16" aria-labelledby="hero-heading">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mb-4 bg-blue-50 inline-flex px-3 py-1 rounded-full border border-blue-100">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime="2025-11-23">Sábado, 23 de Novembro de 2025</time>
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
              Suas Atualizações Legislativas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Olá! Preparamos os destaques mais importantes sobre os projetos que impactam sua vida. Você recebe atualizações sempre que houver novidades relevantes.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Audio Summary Card */}
              <section aria-labelledby="audio-summary-heading">
                <Card className="bg-white border border-blue-100 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
                    <button
                      onClick={toggleAudio}
                      className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-blue-50 cursor-pointer hover:scale-105 transition-transform group"
                      aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                      ) : (
                        <PlayCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" aria-hidden="true" />
                      )}
                    </button>
                    <div className="space-y-2 flex-grow text-center sm:text-left">
                      <h2 id="audio-summary-heading" className="font-bold text-xl text-gray-900">Resumo em Áudio (2min)</h2>
                      <p className="text-gray-600">
                        O Simplinho narra as principais mudanças de hoje para você ouvir no caminho. 🎧
                      </p>
                    </div>
                    <Button
                      onClick={toggleAudio}
                      className="w-full sm:w-auto rounded-full shadow-md font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                      aria-label={isPlaying ? "Pausar resumo em áudio" : "Ouvir resumo em áudio"}
                    >
                      {isPlaying ? "Pausar" : "Ouvir Agora"}
                    </Button>
                  </CardContent>
                </Card>
              </section>

              {/* Timeline Updates */}
              <section aria-labelledby="timeline-heading" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <Clock className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <h2 id="timeline-heading" className="font-bold text-2xl text-gray-900">
                    O que aconteceu hoje?
                  </h2>
                </div>

                {/* Update Item 1 */}
                <article className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-green-50 text-green-700 border border-green-100 px-3 py-1 text-sm font-semibold">
                        ✅ Aprovado
                      </Badge>
                      <span className="text-sm text-gray-400 font-medium">Há 2 horas</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      Novo Auxílio Transporte Aprovado
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      A Câmara aprovou o projeto que expande o auxílio transporte para trabalhadores autônomos.
                      Isso significa mais mobilidade e menos custos para quem trabalha por conta própria.
                      A medida agora segue para sanção presidencial.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => handleViewDetails('auxilio-transporte')}
                      >
                        Ler detalhes completos
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                        aria-label="Compartilhar notícia sobre Auxílio Transporte"
                        onClick={() => handleShare('Novo Auxílio Transporte Aprovado')}
                      >
                        <Share2 className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </article>

                {/* Update Item 2 */}
                <article className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 text-sm font-semibold">
                        💬 Em Discussão
                      </Badge>
                      <span className="text-sm text-gray-400 font-medium">Há 5 horas</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      PL das Redes Sociais (PL 2630)
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Houve um novo debate acalorado na comissão especial sobre a responsabilidade das plataformas.
                      O foco hoje foi em como combater fake news sem prejudicar a liberdade de expressão.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => handleViewDetails('1')}
                      >
                        Ler detalhes completos
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                        aria-label="Compartilhar notícia sobre PL das Redes Sociais"
                        onClick={() => handleShare('PL das Redes Sociais (PL 2630)')}
                      >
                        <Share2 className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </article>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg sticky top-8">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900">
                  <CheckCircle2 className="h-6 w-6 text-green-500" aria-hidden="true" />
                  Sua Voz Importa
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Você já participou de <strong className="text-blue-600">2 enquetes</strong> esta semana!
                    Sua opinião ajuda a pressionar os parlamentares. 💪
                  </p>
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100" role="group" aria-label="Enquete: Você apoia a redução da maioridade penal para crimes hediondos?">
                    <p className="font-bold text-gray-900 mb-4">
                      Você apoia a redução da maioridade penal para crimes hediondos?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className={`w-full font-semibold transition-all border-gray-200 ${pollVote === 'sim'
                          ? 'bg-green-50 text-green-700 border-green-300'
                          : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300 bg-white'
                          }`}
                        aria-label="Votar Sim"
                        onClick={() => handlePollVote('sim')}
                        disabled={pollVote !== null}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Sim
                      </Button>
                      <Button
                        variant="outline"
                        className={`w-full font-semibold transition-all border-gray-200 ${pollVote === 'nao'
                          ? 'bg-red-50 text-red-700 border-red-300'
                          : 'hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-white'
                          }`}
                        aria-label="Votar Não"
                        onClick={() => handlePollVote('nao')}
                        disabled={pollVote !== null}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Não
                      </Button>
                    </div>
                    {pollVote && (
                      <p className="text-xs text-gray-500 mt-3 text-center">
                        ✅ Seu voto foi registrado! Obrigado por participar.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Receba no WhatsApp</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Não quer entrar no site todo dia? Receba esse resumo mastigadinho direto no seu Zap! 📱
                </p>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md rounded-full transition-all hover:scale-105"
                  onClick={handleEnableNotifications}
                  disabled={notificationsEnabled}
                >
                  {notificationsEnabled ? '✅ Notificações Ativas' : 'Ativar Notificações'}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <WhatsappFloat />
    </div>
  )
}
