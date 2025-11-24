# 🎙️ Geração de Áudio para Resumo Diário

## Visão Geral

Este diretório contém o script para gerar narração em áudio do resumo diário usando a API de Text-to-Speech do OpenAI.

## Pré-requisitos

1. **Chave da API OpenAI**: Você precisa de uma chave de API válida da OpenAI
2. **Node.js**: Versão 18 ou superior
3. **Pacote openai**: Já instalado via `npm install openai`

## Como Gerar o Áudio

### 1. Configurar a Chave da API

Adicione sua chave da API OpenAI ao arquivo `.env.local`:

```bash
OPENAI_API_KEY=sk-proj-your-api-key-here
```

### 2. Executar o Script

```bash
node scripts/generate-audio-summary.js
```

O script irá:
- ✅ Gerar um áudio MP3 de ~2 minutos
- ✅ Usar a voz "nova" (feminina, clara, natural em português)
- ✅ Salvar em `public/audio/resumo-diario.mp3`
- ✅ Mostrar informações sobre tamanho e duração

### 3. Resultado Esperado

```
🎙️  Gerando áudio do resumo diário...
✅ Áudio gerado com sucesso!
📁 Salvo em: /Users/.../public/audio/resumo-diario.mp3
📊 Tamanho: 245.67 KB
⏱️  Duração estimada: 2.1 minutos
```

## Conteúdo do Áudio

O áudio narra os seguintes tópicos em linguagem simples:

1. **Auxílio Transporte** - Aprovação para trabalhadores autônomos
2. **Lei das Fake News (PL 2630)** - Debate sobre moderação de conteúdo
3. **Educação Digital** - Programa nacional para escolas públicas
4. **Saúde Mental nas Escolas** - Apoio psicológico para estudantes
5. **Trabalho em Plataformas** - Regulamentação de Uber, iFood, etc.

## Personalização

Para personalizar o conteúdo do áudio, edite a constante `RESUMO_TEXTO` em `generate-audio-summary.js`:

```javascript
const RESUMO_TEXTO = `
Seu texto personalizado aqui...
`;
```

### Dicas para um Bom Áudio

- **Duração**: ~300 palavras = 2 minutos de narração
- **Tom**: Conversacional e acessível
- **Estrutura**: Introdução + 3-5 tópicos + Conclusão
- **Linguagem**: Evite jargão técnico, use exemplos práticos

## Vozes Disponíveis

A API OpenAI oferece várias vozes. Você pode alterar em `generate-audio-summary.js`:

- `alloy` - Voz neutra
- `echo` - Voz masculina
- `fable` - Voz britânica
- `onyx` - Voz masculina profunda
- **`nova`** - Voz feminina clara (recomendada para português) ✅
- `shimmer` - Voz feminina suave

## Custos

- Modelo `tts-1-hd`: ~$0.030 por 1.000 caracteres
- Áudio de 2 minutos (~1.500 caracteres): ~$0.045 (menos de 5 centavos)

## Troubleshooting

### Erro: "OPENAI_API_KEY não encontrada"
- Verifique se adicionou a chave no `.env.local`
- Reinicie o terminal após adicionar a variável

### Erro: "Insufficient quota"
- Sua conta OpenAI precisa de créditos
- Adicione créditos em https://platform.openai.com/account/billing

### Áudio não toca no navegador
- Verifique se o arquivo está em `public/audio/resumo-diario.mp3`
- Limpe o cache do navegador (Cmd+Shift+R)

## Alternativas Gratuitas

Se não quiser usar a API paga, você pode:

1. **Google Cloud Text-to-Speech** - 1 milhão de caracteres grátis/mês
2. **Amazon Polly** - 5 milhões de caracteres grátis no primeiro ano
3. **Gravação Manual** - Use Audacity ou similar

## Próximos Passos

- [ ] Automatizar geração diária via cron job
- [ ] Criar variações de voz (masculina/feminina)
- [ ] Adicionar música de fundo sutil
- [ ] Gerar versões em diferentes velocidades (1x, 1.25x, 1.5x)
