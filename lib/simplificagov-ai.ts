/**
 * SimplificaGov AI Service
 * Sistema de análise legislativa com IA Responsável
 * Baseado na Política Nacional de Linguagem Simples
 */

export interface SimplificaGovAnalysis {
    titulo_simples: string;
    roteiro_audio_whatsapp: string;
    cards_visuais: {
        impacto_bolso: string;
        impacto_direitos: string;
        status_projeto: string;
    };
    auditoria_ia_responsavel: {
        nota_complexidade_original: number; // 0-100
        fonte_citada: string;
        alerta_vies: string | null;
    };
    tags_mapa_afetos: string[];
}

/**
 * Prompt do SimplificaGov - Persona de IA Responsável
 */
const SIMPLIFICAGOV_SYSTEM_PROMPT = `# ROLE & IDENTIDADE
Você é o "Simplifica.gov", uma Inteligência Artificial especialista em Democracia, Linguagem Simples (Plain Language/Legal Design) e Direito Constitucional Brasileiro. 

Sua persona é inspirada em um "vizinho bem informado e confiável": alguém que explica coisas difíceis de forma calma, acolhedora e sem usar palavras complicadas, mas sem perder a precisão dos fatos.

# MISSÃO CRÍTICA
Sua tarefa é receber textos legislativos complexos (Projetos de Lei, Decretos, PECs) e traduzi-los para a realidade da "Dona Maria" — uma persona que representa a cidadã brasileira média, trabalhadora, com pouco tempo e que pode ter baixa escolaridade ou dificuldade com leitura.

# CONTEXTO LEGAL (A "ALAVANCA" DE VIABILIDADE)
Você opera em conformidade direta com a **Política Nacional de Linguagem Simples**. Seu objetivo não é apenas resumir, mas garantir o direito do cidadão de entender o que o Estado está decidindo.

# DIRETRIZES DE IA RESPONSÁVEL (Obrigatoriedade do Hackathon)
1. **Neutralidade Radical:** Você é um intérprete, não um opinador. Apresente os fatos. Se um projeto tem controvérsia, explique: "Quem apoia diz X, quem critica diz Y". Jamais tome partido.
2. **Aterramento (Grounding):** Responda APENAS com base no texto fornecido. Se a informação não estiver no texto, diga que não sabe. Não invente (Alucinação Zero).
3. **Caixa Aberta (Transparência):** Toda afirmação de impacto deve ser rastreável. Você deve indicar em qual artigo ou parágrafo encontrou aquela informação.
4. **Mapeamento de Afetos:** Analise o texto buscando conexões emocionais e pragmáticas: "Isso muda o preço da comida?", "Isso muda a regra da aposentadoria?", "Isso afeta o transporte no bairro?".

# REGRAS DE LINGUAGEM (TONE & VOICE)
- **Nível de Leitura:** 5ª série do ensino fundamental.
- **Vocabulário:** Substitua "concessão de benefício pecuniário" por "pagamento em dinheiro". Substitua "trâmite em caráter de urgência" por "votação rápida".
- **Estrutura:** Frases curtas. Voz ativa ("O governo pagará" em vez de "Será pago pelo governo").
- **Empatia:** Use "Você", "Seu bairro", "Seu bolso".

# FORMATO DE SAÍDA (JSON OBRIGATÓRIO)
Você deve analisar o input e gerar SEMPRE um JSON estruturado com os seguintes campos:

{
  "titulo_simples": "Uma frase curta e chamativa sobre o tema (ex: 'Mudança no Preço do Pão').",
  
  "roteiro_audio_whatsapp": "Texto conversacional, pronto para ser lido por uma IA (TTS). Deve ter saudação, explicação do impacto direto na vida da pessoa e despedida. Máximo 40 segundos de fala. Use pontuação para dar ritmo de fala natural.",
  
  "cards_visuais": {
    "impacto_bolso": "Frase curta sobre custos/impostos (ou 'Sem impacto financeiro direto').",
    "impacto_direitos": "Frase curta sobre o que a pessoa ganha ou perde de direito.",
    "status_projeto": "Em votação / Aprovado / Em debate."
  },

  "auditoria_ia_responsavel": {
    "nota_complexidade_original": (Inteiro de 0 a 100, onde 100 é texto incompreensível/juridiquês extremo),
    "fonte_citada": "Ex: 'Baseado no Artigo 2º, parágrafo único do texto enviado'.",
    "alerta_vies": "Se o texto original excluir algum grupo minoritário, aponte aqui de forma técnica. Caso contrário, null."
  },

  "tags_mapa_afetos": ["Lista de tags para notificação (ex: Saúde, Idosos, Transporte, Educação)"]
}

Retorne APENAS o JSON, sem texto adicional antes ou depois.`;

/**
 * Analisa um texto legislativo usando IA
 */
export async function analisarLei(textoLegislativo: string, fonteUrl?: string): Promise<SimplificaGovAnalysis> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error('[SimplificaGov] OPENROUTER_API_KEY não configurada');
        return gerarAnaliseEmergencial(textoLegislativo);
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://simplificagov.com',
                'X-Title': 'SimplificaGov - Democracia Acessível',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-exp:free', // Modelo gratuito e rápido
                messages: [
                    {
                        role: 'system',
                        content: SIMPLIFICAGOV_SYSTEM_PROMPT
                    },
                    {
                        role: 'user',
                        content: `# INPUT DO USUÁRIO\nAbaixo está o texto legislativo que você deve processar:\n\n${textoLegislativo.substring(0, 20000)}\n\n${fonteUrl ? `Fonte oficial: ${fonteUrl}` : ''}`
                    }
                ],
                temperature: 0.3, // Baixa temperatura para precisão
                max_tokens: 2000,
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const completion = await response.json();
        const content = completion.choices[0]?.message?.content;

        if (!content) {
            throw new Error('Resposta vazia da API');
        }

        // Extrair JSON do conteúdo (pode vir em markdown code block)
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1] : content;

        const analise = JSON.parse(jsonString) as SimplificaGovAnalysis;

        // Validação básica
        if (!analise.titulo_simples || !analise.roteiro_audio_whatsapp) {
            throw new Error('Análise incompleta da IA');
        }

        console.log('[SimplificaGov] Análise gerada com sucesso');
        return analise;

    } catch (error) {
        console.error('[SimplificaGov] Erro na análise:', error);
        return gerarAnaliseEmergencial(textoLegislativo);
    }
}

/**
 * Gera uma análise de emergência quando a IA falha
 */
function gerarAnaliseEmergencial(texto: string): SimplificaGovAnalysis {
    const preview = texto.substring(0, 200);

    return {
        titulo_simples: "Projeto de Lei em Análise",
        roteiro_audio_whatsapp: "Olá! Estamos com dificuldades técnicas para analisar este projeto de lei no momento. Por favor, tente novamente em alguns minutos ou acesse o texto completo no site oficial da Câmara ou Senado. Obrigado pela compreensão!",
        cards_visuais: {
            impacto_bolso: "Análise temporariamente indisponível",
            impacto_direitos: "Consulte o texto original para mais detalhes",
            status_projeto: "Em análise"
        },
        auditoria_ia_responsavel: {
            nota_complexidade_original: 50,
            fonte_citada: "Análise automática indisponível",
            alerta_vies: "Sistema em modo de emergência - análise manual recomendada"
        },
        tags_mapa_afetos: ["Sistema", "Erro Técnico"]
    };
}

/**
 * Calcula índice de acessibilidade (gamification)
 */
export function calcularIndiceAcessibilidade(notaComplexidade: number): {
    nivel: string;
    cor: string;
    emoji: string;
    mensagem: string;
} {
    if (notaComplexidade < 40) {
        return {
            nivel: "Acessível",
            cor: "green",
            emoji: "🟢",
            mensagem: "Cidadania Plena - Texto compreensível para todos"
        };
    } else if (notaComplexidade < 70) {
        return {
            nivel: "Atenção",
            cor: "yellow",
            emoji: "🟡",
            mensagem: "Requer Instrução - Texto pode ser difícil para alguns"
        };
    } else {
        return {
            nivel: "Crítico",
            cor: "red",
            emoji: "🔴",
            mensagem: "Excludente - Fere a Lei de Linguagem Simples"
        };
    }
}
