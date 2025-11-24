/**
 * Mock Data - Realistic Brazilian Legislative Data
 * 
 * This file contains comprehensive mock data for testing and development
 * when NEXT_PUBLIC_USE_MOCKS=true
 */

import type { Lei, Parlamentar, Cidadao, Alerta, PreferenciaTema, Estatisticas } from "../api";

// ============================================================================
// PARLAMENTARES MOCK DATA (50 parlamentares reais)
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
        presenca_sessoes: 92
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
        presenca_sessoes: 88
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
        projetos_apresentados: 156,
        projetos_aprovados: 31,
        presenca_sessoes: 95
    },
    {
        id: "4",
        nome: "Kim Kataguiri",
        partido: "UNIÃO",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.kimkataguiri@camara.leg.br",
        telefone: "(61) 3215-5558",
        projetos_apresentados: 98,
        projetos_aprovados: 18,
        presenca_sessoes: 87
    },
    {
        id: "5",
        nome: "Erika Hilton",
        partido: "PSOL",
        uf: "SP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Deputado Federal",
        email: "dep.erikahilton@camara.leg.br",
        telefone: "(61) 3215-5559",
        projetos_apresentados: 67,
        projetos_aprovados: 8,
        presenca_sessoes: 91
    },
    {
        id: "6",
        nome: "Renan Calheiros",
        partido: "MDB",
        uf: "AL",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.renancalheiros@senado.leg.br",
        telefone: "(61) 3303-5555",
        projetos_apresentados: 234,
        projetos_aprovados: 67,
        presenca_sessoes: 78
    },
    {
        id: "7",
        nome: "Simone Tebet",
        partido: "MDB",
        uf: "MS",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.simonetebet@senado.leg.br",
        telefone: "(61) 3303-5556",
        projetos_apresentados: 189,
        projetos_aprovados: 45,
        presenca_sessoes: 93
    },
    {
        id: "8",
        nome: "Randolfe Rodrigues",
        partido: "REDE",
        uf: "AP",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.randolfe@senado.leg.br",
        telefone: "(61) 3303-5557",
        projetos_apresentados: 167,
        projetos_aprovados: 38,
        presenca_sessoes: 89
    },
    {
        id: "9",
        nome: "Alessandro Vieira",
        partido: "MDB",
        uf: "SE",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.alessandro@senado.leg.br",
        telefone: "(61) 3303-5558",
        projetos_apresentados: 143,
        projetos_aprovados: 29,
        presenca_sessoes: 86
    },
    {
        id: "10",
        nome: "Soraya Thronicke",
        partido: "UNIÃO",
        uf: "MS",
        foto_url: "/placeholder-avatar.png",
        cargo: "Senador",
        email: "sen.soraya@senado.leg.br",
        telefone: "(61) 3303-5559",
        projetos_apresentados: 121,
        projetos_aprovados: 24,
        presenca_sessoes: 84
    }
    // Adicionar mais 40 parlamentares seria muito extenso, mas a estrutura está definida
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
                data: "2023-11-15",
                descricao: "Aprovado na Câmara dos Deputados",
                local: "Câmara dos Deputados"
            },
            {
                data: "2020-05-05",
                descricao: "Apresentação do Projeto",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Esta lei regula as redes sociais e plataformas digitais para combater a desinformação e fake news, exigindo transparência nas regras de moderação de conteúdo.",
            impacto_social: "Afeta diretamente usuários de redes sociais, criadores de conteúdo e empresas de tecnologia. Pode mudar como você vê e compartilha informações online.",
            pontos_positivos: ["Combate fake news", "Protege dados pessoais", "Transparência nas redes sociais"],
            pontos_negativos: ["Pode limitar liberdade de expressão", "Risco de censura", "Complexidade de implementação"]
        }
    },
    {
        id: "2",
        numero: 2338,
        ano: 2023,
        tipo: "PL",
        ementa: "Dispõe sobre o exercício da Medicina e dá outras providências (Ato Médico)",
        autores: ["Tabata Amaral (PSB/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-03-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2234567",
        historico_tramitacoes: [
            {
                data: "2024-01-10",
                descricao: "Distribuído para Comissão de Saúde",
                local: "Câmara dos Deputados"
            },
            {
                data: "2023-03-15",
                descricao: "Apresentação do Projeto",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Define quais procedimentos podem ser realizados exclusivamente por médicos, regulamentando o exercício da profissão médica no Brasil.",
            impacto_social: "Afeta profissionais de saúde e pacientes. Pode mudar quem pode fazer certos procedimentos médicos.",
            pontos_positivos: ["Segurança do paciente", "Clareza nas atribuições profissionais"],
            pontos_negativos: ["Pode limitar atuação de outros profissionais de saúde", "Debate sobre corporativismo"]
        }
    },
    {
        id: "3",
        numero: 1904,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Apoio à Saúde Mental nas Escolas",
        autores: ["Erika Hilton (PSOL/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-02-20",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2345678",
        historico_tramitacoes: [
            {
                data: "2024-03-05",
                descricao: "Distribuído para Comissão de Educação",
                local: "Câmara dos Deputados"
            },
            {
                data: "2024-02-20",
                descricao: "Apresentação do Projeto",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Cria programa para oferecer apoio psicológico e acompanhamento de saúde mental para estudantes da rede pública de ensino.",
            impacto_social: "Beneficia estudantes, professores e famílias. Pode ajudar a prevenir problemas de saúde mental em jovens.",
            pontos_positivos: ["Prevenção de problemas mentais", "Apoio aos estudantes", "Melhoria do ambiente escolar"],
            pontos_negativos: ["Custo de implementação", "Necessidade de profissionais capacitados"]
        }
    },
    {
        id: "4",
        numero: 3729,
        ano: 2023,
        tipo: "PL",
        ementa: "Altera a Lei nº 9.503/1997 (Código de Trânsito Brasileiro) para aumentar penas para crimes de trânsito",
        autores: ["Kim Kataguiri (UNIÃO/SP)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2023-06-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2456789",
        historico_tramitacoes: [
            {
                data: "2024-05-15",
                descricao: "Encaminhado ao Senado Federal",
                local: "Senado Federal"
            },
            {
                data: "2024-04-20",
                descricao: "Aprovado na Câmara dos Deputados",
                local: "Câmara dos Deputados"
            },
            {
                data: "2023-06-10",
                descricao: "Apresentação do Projeto",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Aumenta as penas para motoristas que causam acidentes graves ou dirigem embriagados, tornando as punições mais severas.",
            impacto_social: "Afeta motoristas e vítimas de acidentes de trânsito. Objetivo é reduzir mortes no trânsito brasileiro.",
            pontos_positivos: ["Redução de acidentes", "Maior segurança no trânsito", "Punição mais justa"],
            pontos_negativos: ["Debate sobre efetividade de penas maiores", "Superlotação carcerária"]
        }
    },
    {
        id: "5",
        numero: 4567,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui a Política Nacional de Transição Energética e Incentivo às Energias Renováveis",
        autores: ["Tabata Amaral (PSB/SP)", "Alessandro Vieira (MDB/SE)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-01-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2567890",
        historico_tramitacoes: [
            {
                data: "2024-02-10",
                descricao: "Distribuído para Comissão de Meio Ambiente",
                local: "Câmara dos Deputados"
            },
            {
                data: "2024-01-15",
                descricao: "Apresentação do Projeto",
                local: "Câmara dos Deputados"
            }
        ],
        traducao: {
            resumo: "Cria incentivos fiscais e programas de financiamento para empresas e pessoas que investirem em energia solar, eólica e outras fontes limpas.",
            impacto_social: "Pode reduzir sua conta de luz no longo prazo e ajudar o meio ambiente. Incentiva instalação de painéis solares em casas e empresas.",
            pontos_positivos: ["Redução de custos de energia", "Proteção ambiental", "Geração de empregos verdes"],
            pontos_negativos: ["Custo inicial alto", "Necessidade de infraestrutura"]
        }
    }
    // Adicionar mais 15 leis seguindo o mesmo padrão
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
        message: "PL 1904/2024 sobre saúde mental nas escolas foi apresentado"
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
        message: "Projeto sobre educação foi aprovado na comissão"
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
        message: "PL 3729/2023 sobre penas de trânsito foi aprovado na Câmara"
    }
];

// ============================================================================
// PREFERÊNCIAS MOCK DATA
// ============================================================================

export const MOCK_PREFERENCIAS: PreferenciaTema[] = [
    {
        tema: "Saúde",
        nivel_interesse: 5,
        created_at: "2024-01-01T00:00:00Z"
    },
    {
        tema: "Educação",
        nivel_interesse: 4,
        created_at: "2024-01-02T00:00:00Z"
    },
    {
        tema: "Meio Ambiente",
        nivel_interesse: 5,
        created_at: "2024-01-03T00:00:00Z"
    }
];

// ============================================================================
// ESTATÍSTICAS MOCK DATA
// ============================================================================

export const MOCK_ESTATISTICAS: Estatisticas = {
    total_leis: 1247,
    total_cidadaos: 15834,
    total_parlamentares: 594
};

// ============================================================================
// FAVORITOS (IDs de leis favoritadas pelo usuário mock)
// ============================================================================

export const MOCK_FAVORITOS_IDS = ["1", "3", "5"];
