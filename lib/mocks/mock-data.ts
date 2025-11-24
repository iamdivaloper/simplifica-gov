// Mock Data - Realistic Brazilian Legislative Data

import type { Lei, Parlamentar, Cidadao, Alerta, PreferenciaTema, Estatisticas } from "../api";

// ============================================================================
// PARLAMENTARES MOCK DATA (10 parlamentares reais)
// ============================================================================

export const MOCK_PARLAMENTARES: Parlamentar[] = [
    {
        id: "1",
        nome: "Orlando Silva",
        partido: "PCdoB",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.orlandosilva@camara.leg.br",
        telefone: "(61) 3215-5555",
        projetos_apresentados: 127,
        projetos_aprovados: 23,
        presenca_sessoes: 92,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "2",
        nome: "Felipe Rigoni",
        partido: "PSB",
        uf: "ES",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.feliperigoni@camara.leg.br",
        telefone: "(61) 3215-5556",
        projetos_apresentados: 89,
        projetos_aprovados: 15,
        presenca_sessoes: 88,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "3",
        nome: "Tabata Amaral",
        partido: "PSB",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.tabataamaral@camara.leg.br",
        telefone: "(61) 3215-5557",
        projetos_apresentados: 145,
        projetos_aprovados: 30,
        presenca_sessoes: 95,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "4",
        nome: "Alessandro Vieira",
        partido: "MDB",
        uf: "SE",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.alessandrovieira@senado.leg.br",
        telefone: "(61) 3303-5558",
        projetos_apresentados: 67,
        projetos_aprovados: 12,
        presenca_sessoes: 98,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "5",
        nome: "Kim Kataguiri",
        partido: "UNIÃO",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.kimkataguiri@camara.leg.br",
        telefone: "(61) 3215-5559",
        projetos_apresentados: 210,
        projetos_aprovados: 18,
        presenca_sessoes: 90,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "6",
        nome: "Marcel van Hattem",
        partido: "NOVO",
        uf: "RS",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.marcelvanhattem@camara.leg.br",
        telefone: "(61) 3215-5560",
        projetos_apresentados: 156,
        projetos_aprovados: 10,
        presenca_sessoes: 99,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "7",
        nome: "Erika Hilton",
        partido: "PSOL",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.erikahilton@camara.leg.br",
        telefone: "(61) 3215-5561",
        projetos_apresentados: 78,
        projetos_aprovados: 5,
        presenca_sessoes: 85,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "8",
        nome: "Nikolas Ferreira",
        partido: "PL",
        uf: "MG",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.nikolasferreira@camara.leg.br",
        telefone: "(61) 3215-5562",
        projetos_apresentados: 95,
        projetos_aprovados: 8,
        presenca_sessoes: 82,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "9",
        nome: "Soraya Thronicke",
        partido: "PODE",
        uf: "MS",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.sorayathronicke@senado.leg.br",
        telefone: "(61) 3303-5563",
        projetos_apresentados: 54,
        projetos_aprovados: 11,
        presenca_sessoes: 91,
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "10",
        nome: "Randolfe Rodrigues",
        partido: "REDE",
        uf: "AP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.randolferodrigues@senado.leg.br",
        telefone: "(61) 3303-5564",
        projetos_apresentados: 189,
        projetos_aprovados: 45,
        presenca_sessoes: 96,
        expires_at: "2025-12-31T23:59:59Z"
    }
];

// ============================================================================
// LEIS MOCK DATA (20 projetos de lei reais e relevantes)
// ============================================================================

export const MOCK_LEIS: Lei[] = [
    {
        id: "1",
        numero: 2630,
        ano: 2020,
        tipo: "PL",
        ementa: "Institui a Lei Brasileira de Liberdade, Responsabilidade e Transparência na Internet (Lei das Fake News)",
        autores: ["Orlando Silva (PCdoB/SP)", "Felipe Rigoni (PSB/ES)"],
        situacao: "Pronta para Pauta no Senado Federal",
        data_apresentacao: "2020-05-05",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=1909983",
        historico_tramitacoes: [
            {
                data: "2024-04-24",
                descricao: "Apresentação de Requerimento",
                local: "Senado Federal"
            },
            {
                data: "2023-05-02",
                descricao: "Aprovado requerimento de urgência",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Esta lei regula as redes sociais e plataformas digitais para combater a desinformação e fake news, exigindo transparência nas regras de moderação de conteúdo.",
            impacto_social: "Afeta diretamente usuários de redes sociais, criadores de conteúdo e empresas de tecnologia. Pode mudar como você vê e compartilha informações online.",
            pontos_positivos: ["Combate fake news", "Protege dados pessoais", "Transparência nas redes sociais"],
            pontos_negativos: ["Pode limitar liberdade de expressão", "Risco de censura", "Complexidade de implementação"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "2020-05-05",
        explicacao: "Regula redes sociais para combater desinformação."
    },
    {
        id: "2",
        numero: 1904,
        ano: 2024,
        tipo: "PL",
        ementa: "Equipara o aborto realizado após 22 semanas de gestação ao crime de homicídio simples",
        autores: ["Sóstenes Cavalcante (PL/RJ)"],
        situacao: "Aguardando Parecer na Comissão de Constituição e Justiça e de Cidadania (CCJC)",
        data_apresentacao: "2024-05-17",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2425678",
        historico_tramitacoes: [
            {
                data: "2024-06-12",
                descricao: "Aprovada a urgência",
                local: "Plenário da Câmara"
            }
        ],
        traducao: {
            resumo: "O projeto propõe aumentar a pena para quem realiza aborto após 22 semanas de gestação, equiparando-o ao crime de homicídio, inclusive em casos de estupro.",
            impacto_social: "Gera intenso debate sobre direitos reprodutivos, saúde da mulher e legislação penal. Pode afetar vítimas de violência sexual.",
            pontos_positivos: ["Proteção à vida fetal avançada"],
            pontos_negativos: ["Criminalização de vítimas de estupro", "Risco à saúde da mulher", "Retrocesso em direitos reprodutivos"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "2024-05-17",
        explicacao: "Equipara aborto após 22 semanas a homicídio."
    },
    {
        id: "3",
        numero: 3027,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui o Programa Pé-de-Meia, destinado à permanência e à conclusão escolar de estudantes matriculados no ensino médio público",
        autores: ["Poder Executivo"],
        situacao: "Transformado na Lei Ordinária 14818/2024",
        data_apresentacao: "2023-11-28",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2368901",
        historico_tramitacoes: [
            {
                data: "2024-01-16",
                descricao: "Sancionada",
                local: "Presidência da República"
            }
        ],
        traducao: {
            resumo: "Cria uma poupança para estudantes do ensino médio público que mantiverem frequência escolar e forem aprovados, visando reduzir a evasão escolar.",
            impacto_social: "Incentiva jovens de baixa renda a concluírem os estudos, reduzindo desigualdades e melhorando a qualificação profissional futura.",
            pontos_positivos: ["Redução da evasão escolar", "Apoio financeiro a jovens", "Incentivo à educação"],
            pontos_negativos: ["Custo fiscal elevado", "Risco de uso indevido dos recursos"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "2023-11-28",
        explicacao: "Poupança para estudantes do ensino médio."
    },
    {
        id: "4",
        numero: 442,
        ano: 1991,
        tipo: "PL",
        ementa: "Marco Legal dos Jogos (Legalização de Cassinos, Bingos e Jogo do Bicho)",
        autores: ["Renato Vianna (MDB/SC)"],
        situacao: "Aguardando votação no Senado",
        data_apresentacao: "1991-03-19",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=123456",
        historico_tramitacoes: [
            {
                data: "2022-02-24",
                descricao: "Aprovado na Câmara",
                local: "Plenário da Câmara"
            }
        ],
        traducao: {
            resumo: "Legaliza e regulamenta jogos de azar no Brasil, incluindo cassinos, bingos e jogo do bicho, com criação de impostos específicos.",
            impacto_social: "Pode gerar empregos e turismo, mas também levanta preocupações sobre vício em jogos e lavagem de dinheiro.",
            pontos_positivos: ["Geração de empregos", "Aumento da arrecadação", "Turismo"],
            pontos_negativos: ["Vício em jogos", "Lavagem de dinheiro", "Impacto social negativo"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "1991-03-19",
        explicacao: "Legalização de jogos de azar no Brasil."
    },
    {
        id: "5",
        numero: 2308,
        ano: 2023,
        tipo: "PL",
        ementa: "Marco Legal do Hidrogênio Verde",
        autores: ["Comissão Especial de Transição Energética"],
        situacao: "Aprovado na Câmara, em análise no Senado",
        data_apresentacao: "2023-05-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=789012",
        historico_tramitacoes: [
            {
                data: "2023-11-28",
                descricao: "Aprovado na Câmara",
                local: "Plenário da Câmara"
            }
        ],
        traducao: {
            resumo: "Define regras e incentivos para a produção de hidrogênio verde no Brasil, uma fonte de energia limpa e renovável.",
            impacto_social: "Posiciona o Brasil na vanguarda da transição energética, atraindo investimentos e gerando empregos na indústria verde.",
            pontos_positivos: ["Energia limpa", "Desenvolvimento sustentável", "Atração de investimentos"],
            pontos_negativos: ["Alto custo inicial", "Necessidade de infraestrutura complexa"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "2023-05-10",
        explicacao: "Regulamentação do hidrogênio verde."
    },
    {
        id: "auxilio-transporte",
        numero: 1234,
        ano: 2024,
        tipo: "PL",
        ementa: "Novo Auxílio Transporte para Estudantes Universitários",
        autores: ["Maria do Rosário (PT/RS)"],
        situacao: "Em tramitação",
        data_apresentacao: "2024-02-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=111222",
        historico_tramitacoes: [
            {
                data: "2024-03-10",
                descricao: "Aprovado na Comissão de Educação",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Cria um auxílio financeiro mensal para custear o transporte de estudantes universitários de baixa renda.",
            impacto_social: "Facilita o acesso e permanência no ensino superior, reduzindo a evasão por motivos financeiros.",
            pontos_positivos: ["Acesso à educação", "Redução da evasão", "Apoio a estudantes carentes"],
            pontos_negativos: ["Impacto orçamentário", "Risco de fraudes"]
        },
        expires_at: "2025-12-31T23:59:59Z",
        data: "2024-02-15",
        explicacao: "Auxílio transporte para universitários."
    }
];

// ============================================================================
// CIDADÃOS MOCK DATA
// ============================================================================

export const MOCK_CIDADAOS: Cidadao[] = [
    {
        id: "1",
        nome: "Maria da Silva",
        contato: "maria.silva@email.com",
        faixa_etaria: "30-40",
        regiao: "Sudeste",
        preferencia_midia: "texto"
    },
    {
        id: "2",
        nome: "João Santos",
        contato: "+55 11 98765-4321",
        faixa_etaria: "50-60",
        regiao: "Sul",
        preferencia_midia: "voz"
    }
];

// ============================================================================
// ALERTAS MOCK DATA
// ============================================================================

export const MOCK_ALERTAS: Alerta[] = [
    {
        id: "1",
        termo: "Saúde",
        ativo: true,
        read: false,
        created_at: "2024-01-15T10:00:00Z",
        type: "normal",
        category: "Saúde",
        title: "Novo projeto sobre saúde mental",
        message: "PL 1904/2024 sobre saúde mental nas escolas foi apresentado",
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "2",
        termo: "Educação",
        ativo: true,
        read: true,
        created_at: "2024-01-10T14:30:00Z",
        type: "normal",
        category: "Educação",
        title: "Atualização em projeto de educação",
        message: "Projeto sobre educação foi aprovado na comissão",
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        id: "3",
        termo: "Trânsito",
        ativo: true,
        read: false,
        created_at: "2024-05-16T09:15:00Z",
        type: "urgente",
        category: "Trânsito",
        title: "PL sobre trânsito aprovado!",
        message: "PL 3729/2023 sobre penas de trânsito foi aprovado na Câmara",
        expires_at: "2025-12-31T23:59:59Z"
    }
];

// ============================================================================
// PREFERÊNCIAS MOCK DATA
// ============================================================================

export const MOCK_PREFERENCIAS: PreferenciaTema[] = [
    {
        tema: "Saúde",
        nivel_interesse: 5,
        created_at: "2024-01-01T00:00:00Z",
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        tema: "Educação",
        nivel_interesse: 4,
        created_at: "2024-01-02T00:00:00Z",
        expires_at: "2025-12-31T23:59:59Z"
    },
    {
        tema: "Meio Ambiente",
        nivel_interesse: 5,
        created_at: "2024-01-03T00:00:00Z",
        expires_at: "2025-12-31T23:59:59Z"
    }
];

// ============================================================================
// ESTATÍSTICAS MOCK DATA
// ============================================================================

export const MOCK_ESTATISTICAS: Estatisticas = {
    total_leis: 1247,
    total_cidadaos: 15834,
    total_parlamentares: 594,
    expires_at: "2025-12-31T23:59:59Z"
};

// ============================================================================
// FAVORITOS (IDs de leis favoritadas pelo usuário mock)
// ============================================================================

export const MOCK_FAVORITOS_IDS = ["1", "3", "5"];
