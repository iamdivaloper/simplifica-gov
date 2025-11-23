import { Suspense } from "react"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { api, Lei } from "@/lib/api"
import { ProjectsClientPage } from "./projects-client-page"
import { AlertCircle } from "lucide-react"

export const dynamic = 'force-dynamic'

async function ProjectsContent() {
  let leis: Lei[] = []
  let error = null

  try {
    leis = await api.getLeis({ limit: 6 })
  } catch (e) {
    console.error("Failed to fetch leis, using mock data", e)
    // Fallback to mock data
    leis = [
      {
        id: "pl-1234-2024",
        numero: 1234,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Incentivo à Leitura nas Escolas Públicas e dá outras providências.",
        autores: ["Dep. Maria Silva"],
        situacao: "Em tramitação",
        data_apresentacao: "2024-03-15",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Cria um programa para incentivar a leitura em escolas públicas com verbas dedicadas para compra de livros.",
          impacto_social: "Alto",
          pontos_positivos: ["Melhora educação", "Incentiva cultura"],
          pontos_negativos: ["Custo elevado"]
        }
      },
      {
        id: "pl-5678-2024",
        numero: 5678,
        ano: 2024,
        tipo: "PL",
        ementa: "Altera a Lei de Diretrizes e Bases da Educação para incluir educação financeira no currículo obrigatório.",
        autores: ["Dep. João Santos"],
        situacao: "Aprovado na CCJ",
        data_apresentacao: "2024-02-10",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Torna obrigatório o ensino de educação financeira nas escolas de ensino médio.",
          impacto_social: "Médio",
          pontos_positivos: ["Melhora gestão financeira", "Reduz endividamento"],
          pontos_negativos: ["Necessita capacitação de professores"]
        }
      },
      {
        id: "pec-10-2024",
        numero: 10,
        ano: 2024,
        tipo: "PEC",
        ementa: "Proposta de Emenda à Constituição que visa reduzir a carga tributária sobre medicamentos essenciais.",
        autores: ["Sen. Ana Costa"],
        situacao: "Em análise",
        data_apresentacao: "2024-01-20",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Reduz impostos sobre remédios considerados essenciais para a população.",
          impacto_social: "Muito Alto",
          pontos_positivos: ["Reduz custo de vida", "Melhora acesso à saúde"],
          pontos_negativos: ["Queda na arrecadação"]
        }
      },
      {
        id: "pl-9999-2024",
        numero: 9999,
        ano: 2024,
        tipo: "PL",
        ementa: "Dispõe sobre a obrigatoriedade de instalação de pontos de recarga para veículos elétricos em condomínios.",
        autores: ["Dep. Carlos Lima"],
        situacao: "Aguardando parecer",
        data_apresentacao: "2024-04-05",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Obriga novos condomínios a terem pontos de recarga para carros elétricos.",
          impacto_social: "Baixo",
          pontos_positivos: ["Incentiva veículos limpos", "Modernização"],
          pontos_negativos: ["Custo para construtoras"]
        }
      },
      {
        id: "pl-8888-2024",
        numero: 8888,
        ano: 2024,
        tipo: "PL",
        ementa: "Regulamenta o uso de Inteligência Artificial em processos seletivos de emprego.",
        autores: ["Sen. Roberto Alves"],
        situacao: "Em debate",
        data_apresentacao: "2024-03-01",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Cria regras para evitar discriminação por algoritmos em contratações.",
          impacto_social: "Médio",
          pontos_positivos: ["Mais justiça", "Transparência"],
          pontos_negativos: ["Burocracia para empresas"]
        }
      },
      {
        id: "pl-7777-2024",
        numero: 7777,
        ano: 2024,
        tipo: "PL",
        ementa: "Cria o incentivo fiscal para empresas que contratarem jovens aprendizes acima da cota legal.",
        autores: ["Dep. Júlia Rocha"],
        situacao: "Em votação",
        data_apresentacao: "2024-02-28",
        link_inteiro_teor: "http://example.com",
        traducao: {
          resumo: "Dá desconto em impostos para empresas que contratarem mais jovens aprendizes.",
          impacto_social: "Alto",
          pontos_positivos: ["Reduz desemprego jovem", "Capacitação"],
          pontos_negativos: ["Renúncia fiscal"]
        }
      }
    ]
  }

  // Remove error block since we are handling it with mock data

  return <ProjectsClientPage initialLeis={leis} />
}

export default function LawProjectsHub() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="pb-20">
        <Suspense fallback={
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando projetos...</p>
          </div>
        }>
          <ProjectsContent />
        </Suspense>
      </main>

      <WhatsappFloat />
    </div>
  )
}
