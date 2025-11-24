# SimplificaGov AI - Sistema de Prompt

## 📋 Visão Geral

Sistema de análise legislativa com IA Responsável baseado na **Política Nacional de Linguagem Simples**.

## 🎯 Persona da IA

**Nome**: Simplifica.gov  
**Estilo**: "Vizinho bem informado e confiável"  
**Público-alvo**: Dona Maria (cidadã média, trabalhadora, baixa escolaridade)  
**Nível de leitura**: 5ª série do ensino fundamental

## 🚀 Como Usar

### Importação

```typescript
import { analisarLei, calcularIndiceAcessibilidade } from "@/lib/simplificagov-ai";
```

### Análise de Lei

```typescript
const textoLei = `
Art. 1º Esta lei estabelece...
Art. 2º Fica autorizado...
`;

const analise = await analisarLei(textoLei, "https://camara.leg.br/pl-123");

console.log(analise);
// {
//   titulo_simples: "Nova Lei do Transporte Público",
//   roteiro_audio_whatsapp: "Olá! Essa lei muda...",
//   cards_visuais: {
//     impacto_bolso: "Passagem pode ficar 10% mais cara",
//     impacto_direitos: "Você terá direito a...",
//     status_projeto: "Em votação"
//   },
//   auditoria_ia_responsavel: {
//     nota_complexidade_original: 75,
//     fonte_citada: "Baseado no Art. 2º, §1º",
//     alerta_vies: null
//   },
//   tags_mapa_afetos: ["Transporte", "Economia", "Mobilidade"]
// }
```

### Calcular Índice de Acessibilidade

```typescript
const indice = calcularIndiceAcessibilidade(analise.auditoria_ia_responsavel.nota_complexidade_original);

console.log(indice);
// {
//   nivel: "Atenção",
//   cor: "yellow",
//   emoji: "🟡",
//   mensagem: "Requer Instrução - Texto pode ser difícil para alguns"
// }
```

## 📊 Estrutura de Resposta

### `SimplificaGovAnalysis`

```typescript
interface SimplificaGovAnalysis {
    titulo_simples: string;                    // Título acessível
    roteiro_audio_whatsapp: string;            // Script para TTS (40s)
    cards_visuais: {
        impacto_bolso: string;                 // Impacto financeiro
        impacto_direitos: string;              // Novos direitos/deveres
        status_projeto: string;                // Status atual
    };
    auditoria_ia_responsavel: {
        nota_complexidade_original: number;    // 0-100
        fonte_citada: string;                  // Rastreabilidade
        alerta_vies: string | null;            // Viés detectado
    };
    tags_mapa_afetos: string[];               // Tags para notificações
}
```

## 🎨 Princípios de IA Responsável

### 1. Neutralidade Radical
- ✅ Apresenta fatos, não opiniões
- ✅ Mostra prós e contras quando relevante
- ❌ Nunca toma partido político

### 2. Aterramento (Grounding)
- ✅ Responde apenas com base no texto fornecido
- ✅ Admite quando não sabe
- ❌ Zero alucinações

### 3. Caixa Aberta (Transparência)
- ✅ Cita artigos e parágrafos específicos
- ✅ Rastreabilidade total
- ✅ Auditoria pública

### 4. Mapeamento de Afetos
- ✅ Conecta lei com vida real
- ✅ Foco em impacto prático
- ✅ Linguagem empática

## 📝 Regras de Linguagem

### ❌ Evitar
- "Concessão de benefício pecuniário"
- "Trâmite em caráter de urgência"
- "Dispositivo legal supracitado"
- Voz passiva excessiva

### ✅ Usar
- "Pagamento em dinheiro"
- "Votação rápida"
- "A lei mencionada acima"
- Voz ativa e frases curtas

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# .env.local
OPENROUTER_API_KEY=sk-or-v1-...
```

### Modelo de IA

- **Padrão**: `google/gemini-2.0-flash-exp:free`
- **Temperatura**: 0.3 (precisão)
- **Max Tokens**: 2000

## 🐛 Tratamento de Erros

### Modo de Emergência

Se a API falhar, o sistema retorna uma análise de emergência:

```typescript
{
  titulo_simples: "Projeto de Lei em Análise",
  roteiro_audio_whatsapp: "Estamos com dificuldades técnicas...",
  // ... resposta padrão de fallback
}
```

### Logs

```typescript
[SimplificaGov] Análise gerada com sucesso
[SimplificaGov] Erro na análise: <detalhes>
```

## 📊 Índice de Acessibilidade

| Nota | Nível | Emoji | Mensagem |
|------|-------|-------|----------|
| 0-39 | Acessível | 🟢 | Cidadania Plena |
| 40-69 | Atenção | 🟡 | Requer Instrução |
| 70-100 | Crítico | 🔴 | Excludente |

## 🎯 Exemplo Completo

```typescript
import { analisarLei, calcularIndiceAcessibilidade } from "@/lib/simplificagov-ai";

async function processarLei(id: string) {
  // 1. Buscar texto da lei
  const lei = await api.getLeiById(id);
  
  // 2. Analisar com IA
  const analise = await analisarLei(lei.ementa, lei.link_inteiro_teor);
  
  // 3. Calcular índice
  const indice = calcularIndiceAcessibilidade(
    analise.auditoria_ia_responsavel.nota_complexidade_original
  );
  
  // 4. Exibir na UI
  return {
    ...analise,
    indice_acessibilidade: indice
  };
}
```

## 🚀 Próximos Passos

1. Integrar com endpoint `/leis/{id}/traduzir`
2. Adicionar suporte a TTS (Text-to-Speech)
3. Implementar sistema de notificações por tags
4. Criar dashboard de auditoria de viés

## 📚 Referências

- [Política Nacional de Linguagem Simples](https://www.gov.br/linguagem-simples)
- [Plain Language Guidelines](https://www.plainlanguage.gov/)
- [IA Responsável - Princípios](https://www.microsoft.com/pt-br/ai/responsible-ai)
