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
    },
    {
        id: "6",
        numero: 2646,
        ano: 2022,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Educação Digital nas Escolas Públicas",
        autores: ["Felipe Rigoni (PSB/ES)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2022-08-20",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2678901",
        historico_tramitacoes: [
            { data: "2024-03-10", descricao: "Encaminhado ao Senado", local: "Senado Federal" },
            { data: "2023-12-05", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" },
            { data: "2022-08-20", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Garante acesso à internet e equipamentos digitais para todas as escolas públicas, além de capacitação de professores em tecnologia.",
            impacto_social: "Beneficia milhões de estudantes da rede pública, reduzindo desigualdade digital e preparando jovens para o mercado de trabalho.",
            pontos_positivos: ["Inclusão digital", "Melhoria da educação", "Preparação para o futuro"],
            pontos_negativos: ["Alto custo de implementação", "Manutenção de equipamentos"]
        }
    },
    {
        id: "7",
        numero: 1234,
        ano: 2023,
        tipo: "PL",
        ementa: "Dispõe sobre a regulamentação do trabalho em plataformas digitais (Uber, iFood, etc.)",
        autores: ["Erika Hilton (PSOL/SP)", "Orlando Silva (PCdoB/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-05-12",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2789012",
        historico_tramitacoes: [
            { data: "2024-01-20", descricao: "Audiência Pública realizada", local: "Câmara dos Deputados" },
            { data: "2023-07-15", descricao: "Distribuído para Comissão de Trabalho", local: "Câmara dos Deputados" },
            { data: "2023-05-12", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Garante direitos trabalhistas básicos para motoristas de app e entregadores, como férias, 13º salário e seguro contra acidentes.",
            impacto_social: "Afeta milhões de trabalhadores de aplicativos. Pode aumentar custos de serviços, mas garante proteção social.",
            pontos_positivos: ["Direitos trabalhistas", "Proteção social", "Segurança jurídica"],
            pontos_negativos: ["Aumento de custos", "Possível redução de vagas"]
        }
    },
    {
        id: "8",
        numero: 5678,
        ano: 2024,
        tipo: "PL",
        ementa: "Cria o Programa Nacional de Combate à Violência contra a Mulher",
        autores: ["Tabata Amaral (PSB/SP)", "Simone Tebet (MDB/MS)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-03-08",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2890123",
        historico_tramitacoes: [
            { data: "2024-04-15", descricao: "Distribuído para Comissão de Direitos Humanos", local: "Câmara dos Deputados" },
            { data: "2024-03-08", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Amplia rede de proteção às mulheres vítimas de violência, com mais casas de acolhimento, delegacias especializadas e campanhas educativas.",
            impacto_social: "Protege mulheres em situação de violência doméstica e familiar, oferecendo suporte psicológico, jurídico e abrigo seguro.",
            pontos_positivos: ["Proteção às vítimas", "Prevenção da violência", "Educação e conscientização"],
            pontos_negativos: ["Necessidade de investimento público", "Desafio de implementação em todo país"]
        }
    },
    {
        id: "9",
        numero: 3456,
        ano: 2023,
        tipo: "PL",
        ementa: "Institui a Política Nacional de Segurança Cibernética e Proteção de Dados Pessoais",
        autores: ["Kim Kataguiri (UNIÃO/SP)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2023-09-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=2901234",
        historico_tramitacoes: [
            { data: "2024-06-01", descricao: "Encaminhado ao Senado", local: "Senado Federal" },
            { data: "2024-05-10", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" },
            { data: "2023-09-10", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Cria regras mais rígidas para proteção de dados pessoais na internet e estabelece punições para empresas que vazarem informações.",
            impacto_social: "Protege seus dados pessoais online, como CPF, endereço e histórico de compras. Empresas terão que ser mais transparentes.",
            pontos_positivos: ["Proteção de privacidade", "Segurança de dados", "Transparência"],
            pontos_negativos: ["Custo de adequação para empresas", "Complexidade regulatória"]
        }
    },
    {
        id: "10",
        numero: 7890,
        ano: 2024,
        tipo: "PL",
        ementa: "Dispõe sobre a reforma tributária simplificada para microempresas",
        autores: ["Randolfe Rodrigues (REDE/AP)", "Alessandro Vieira (MDB/SE)"],
        situacao: "Em tramitação no Senado",
        data_apresentacao: "2024-02-15",
        link_inteiro_teor: "https://www.senado.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3012345",
        historico_tramitacoes: [
            { data: "2024-03-20", descricao: "Distribuído para Comissão de Assuntos Econômicos", local: "Senado Federal" },
            { data: "2024-02-15", descricao: "Apresentação do Projeto", local: "Senado Federal" }
        ],
        traducao: {
            resumo: "Simplifica impostos para pequenos negócios, reduzindo burocracia e criando alíquota única para MEIs e microempresas.",
            impacto_social: "Facilita vida de empreendedores, reduz custos e incentiva formalização de negócios. Pode gerar mais empregos.",
            pontos_positivos: ["Menos burocracia", "Redução de custos", "Incentivo ao empreendedorismo"],
            pontos_negativos: ["Possível redução de arrecadação", "Debate sobre justiça fiscal"]
        }
    },
    {
        id: "11",
        numero: 4321,
        ano: 2023,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Moradia Popular e Regularização Fundiária",
        autores: ["Orlando Silva (PCdoB/SP)", "Renan Calheiros (MDB/AL)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-07-20",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3123456",
        historico_tramitacoes: [
            { data: "2024-02-10", descricao: "Audiência Pública realizada", local: "Câmara dos Deputados" },
            { data: "2023-09-05", descricao: "Distribuído para Comissão de Desenvolvimento Urbano", local: "Câmara dos Deputados" },
            { data: "2023-07-20", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Facilita acesso à moradia para famílias de baixa renda e regulariza terrenos ocupados há mais de 5 anos, garantindo escritura.",
            impacto_social: "Beneficia milhões de famílias que vivem em áreas irregulares, dando segurança jurídica e acesso a serviços públicos.",
            pontos_positivos: ["Direito à moradia", "Regularização fundiária", "Acesso a crédito"],
            pontos_negativos: ["Custo elevado", "Complexidade de implementação"]
        }
    },
    {
        id: "12",
        numero: 8765,
        ano: 2024,
        tipo: "PL",
        ementa: "Cria o Sistema Nacional de Prevenção e Combate a Incêndios Florestais",
        autores: ["Tabata Amaral (PSB/SP)", "Randolfe Rodrigues (REDE/AP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-04-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3234567",
        historico_tramitacoes: [
            { data: "2024-05-20", descricao: "Distribuído para Comissão de Meio Ambiente", local: "Câmara dos Deputados" },
            { data: "2024-04-10", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Cria brigadas especializadas, sistemas de monitoramento por satélite e campanhas de prevenção para combater queimadas na Amazônia e Cerrado.",
            impacto_social: "Protege florestas, biodiversidade e comunidades afetadas por incêndios. Reduz poluição do ar e mudanças climáticas.",
            pontos_positivos: ["Proteção ambiental", "Prevenção de desastres", "Saúde pública"],
            pontos_negativos: ["Custo de implementação", "Necessidade de coordenação entre estados"]
        }
    },
    {
        id: "13",
        numero: 5432,
        ano: 2023,
        tipo: "PL",
        ementa: "Dispõe sobre a jornada de trabalho de 4 dias por semana (semana de 4 dias)",
        autores: ["Erika Hilton (PSOL/SP)", "Felipe Rigoni (PSB/ES)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-10-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3345678",
        historico_tramitacoes: [
            { data: "2024-01-25", descricao: "Audiência Pública com empresários e sindicatos", local: "Câmara dos Deputados" },
            { data: "2023-11-10", descricao: "Distribuído para Comissão de Trabalho", local: "Câmara dos Deputados" },
            { data: "2023-10-15", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Permite que empresas adotem jornada de 4 dias por semana (32 horas), mantendo salário integral, para melhorar qualidade de vida.",
            impacto_social: "Mais tempo livre para família e lazer. Estudos mostram aumento de produtividade e redução de estresse.",
            pontos_positivos: ["Qualidade de vida", "Produtividade", "Saúde mental"],
            pontos_negativos: ["Resistência empresarial", "Desafio de implementação em alguns setores"]
        }
    },
    {
        id: "14",
        numero: 6789,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Combate ao Desperdício de Alimentos",
        autores: ["Simone Tebet (MDB/MS)", "Alessandro Vieira (MDB/SE)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2024-01-20",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3456789",
        historico_tramitacoes: [
            { data: "2024-06-15", descricao: "Encaminhado ao Senado", local: "Senado Federal" },
            { data: "2024-05-30", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" },
            { data: "2024-01-20", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Obriga supermercados e restaurantes a doar alimentos próximos do vencimento para instituições de caridade, com incentivos fiscais.",
            impacto_social: "Combate fome e desperdício. Milhões de toneladas de comida podem ser aproveitadas para alimentar famílias carentes.",
            pontos_positivos: ["Combate à fome", "Redução de desperdício", "Sustentabilidade"],
            pontos_negativos: ["Logística de distribuição", "Responsabilidade sanitária"]
        }
    },
    {
        id: "15",
        numero: 9876,
        ano: 2023,
        tipo: "PL",
        ementa: "Cria o Programa Nacional de Incentivo à Leitura e Bibliotecas Comunitárias",
        autores: ["Tabata Amaral (PSB/SP)", "Orlando Silva (PCdoB/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-11-20",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3567890",
        historico_tramitacoes: [
            { data: "2024-03-15", descricao: "Distribuído para Comissão de Cultura", local: "Câmara dos Deputados" },
            { data: "2023-11-20", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Financia criação de bibliotecas comunitárias em periferias e distribui livros gratuitos para escolas públicas.",
            impacto_social: "Democratiza acesso à cultura e educação. Incentiva hábito de leitura desde a infância.",
            pontos_positivos: ["Acesso à cultura", "Educação", "Desenvolvimento intelectual"],
            pontos_negativos: ["Custo de manutenção", "Necessidade de profissionais capacitados"]
        }
    },
    {
        id: "16",
        numero: 2468,
        ano: 2024,
        tipo: "PL",
        ementa: "Dispõe sobre a regulamentação de criptomoedas e ativos digitais no Brasil",
        autores: ["Kim Kataguiri (UNIÃO/SP)", "Felipe Rigoni (PSB/ES)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2024-02-05",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3678901",
        historico_tramitacoes: [
            { data: "2024-07-01", descricao: "Encaminhado ao Senado", local: "Senado Federal" },
            { data: "2024-06-20", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" },
            { data: "2024-02-05", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Cria regras para exchanges de criptomoedas, protege investidores e define tributação sobre lucros com Bitcoin e outras moedas digitais.",
            impacto_social: "Traz segurança jurídica para quem investe em cripto. Facilita fiscalização e combate a fraudes.",
            pontos_positivos: ["Segurança jurídica", "Proteção ao investidor", "Combate a fraudes"],
            pontos_negativos: ["Tributação pode desestimular investimentos", "Complexidade técnica"]
        }
    },
    {
        id: "17",
        numero: 1357,
        ano: 2023,
        tipo: "PL",
        ementa: "Institui a Política Nacional de Saúde Mental e Prevenção ao Suicídio",
        autores: ["Erika Hilton (PSOL/SP)", "Simone Tebet (MDB/MS)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2023-09-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3789012",
        historico_tramitacoes: [
            { data: "2024-02-20", descricao: "Audiência Pública com especialistas", local: "Câmara dos Deputados" },
            { data: "2023-10-15", descricao: "Distribuído para Comissão de Saúde", local: "Câmara dos Deputados" },
            { data: "2023-09-10", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Amplia rede de atendimento psicológico gratuito (CAPS), cria campanhas de conscientização e linha telefônica 24h para prevenção ao suicídio.",
            impacto_social: "Salva vidas e oferece suporte a pessoas em sofrimento mental. Reduz estigma sobre saúde mental.",
            pontos_positivos: ["Prevenção ao suicídio", "Acesso a tratamento", "Conscientização"],
            pontos_negativos: ["Necessidade de investimento contínuo", "Formação de profissionais"]
        }
    },
    {
        id: "18",
        numero: 3698,
        ano: 2024,
        tipo: "PL",
        ementa: "Cria o Programa Nacional de Incentivo ao Esporte e Atividade Física nas Escolas",
        autores: ["Randolfe Rodrigues (REDE/AP)", "Tabata Amaral (PSB/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-03-25",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3890123",
        historico_tramitacoes: [
            { data: "2024-05-10", descricao: "Distribuído para Comissão de Educação e Esporte", local: "Câmara dos Deputados" },
            { data: "2024-03-25", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Garante aulas de educação física diárias em escolas públicas, reforma quadras esportivas e oferece escolinhas de esporte gratuitas.",
            impacto_social: "Combate obesidade infantil, promove saúde e pode revelar talentos esportivos. Melhora convivência social.",
            pontos_positivos: ["Saúde das crianças", "Inclusão social", "Descoberta de talentos"],
            pontos_negativos: ["Custo de infraestrutura", "Necessidade de professores especializados"]
        }
    },
    {
        id: "19",
        numero: 7531,
        ano: 2023,
        tipo: "PL",
        ementa: "Dispõe sobre a proteção de dados de crianças e adolescentes na internet",
        autores: ["Orlando Silva (PCdoB/SP)", "Alessandro Vieira (MDB/SE)"],
        situacao: "Aprovado na Câmara, aguardando Senado",
        data_apresentacao: "2023-08-15",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=3901234",
        historico_tramitacoes: [
            { data: "2024-04-30", descricao: "Encaminhado ao Senado", local: "Senado Federal" },
            { data: "2024-04-10", descricao: "Aprovado na Câmara", local: "Câmara dos Deputados" },
            { data: "2023-08-15", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Proíbe coleta de dados pessoais de menores de 13 anos sem autorização dos pais e cria regras para redes sociais protegerem crianças.",
            impacto_social: "Protege crianças de exposição excessiva online, cyberbullying e uso indevido de dados por empresas.",
            pontos_positivos: ["Proteção infantil", "Privacidade", "Segurança online"],
            pontos_negativos: ["Desafio de fiscalização", "Resistência de empresas de tecnologia"]
        }
    },
    {
        id: "20",
        numero: 9513,
        ano: 2024,
        tipo: "PL",
        ementa: "Institui o Programa Nacional de Apoio a Startups e Inovação Tecnológica",
        autores: ["Felipe Rigoni (PSB/ES)", "Kim Kataguiri (UNIÃO/SP)"],
        situacao: "Em tramitação na Câmara",
        data_apresentacao: "2024-05-10",
        link_inteiro_teor: "https://www.camara.leg.br/proposicoesWeb/prop_mostrarintegra?codteor=4012345",
        historico_tramitacoes: [
            { data: "2024-06-20", descricao: "Distribuído para Comissão de Ciência e Tecnologia", local: "Câmara dos Deputados" },
            { data: "2024-05-10", descricao: "Apresentação do Projeto", local: "Câmara dos Deputados" }
        ],
        traducao: {
            resumo: "Cria incentivos fiscais, linhas de crédito e incubadoras para startups brasileiras, facilitando acesso a investimento e reduzindo burocracia.",
            impacto_social: "Estimula empreendedorismo tecnológico, gera empregos qualificados e posiciona Brasil como polo de inovação.",
            pontos_positivos: ["Geração de empregos", "Inovação", "Desenvolvimento econômico"],
            pontos_negativos: ["Risco de concentração em grandes centros", "Necessidade de ecossistema maduro"]
        }
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
