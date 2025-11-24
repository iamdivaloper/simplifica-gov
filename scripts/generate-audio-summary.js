#!/usr/bin/env node

/**
 * Script para gerar áudio narrado do resumo diário
 * Usa OpenAI Text-to-Speech API para criar narração em português brasileiro
 * 
 * Uso: node scripts/generate-audio-summary.js
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Texto do resumo diário (2 minutos de narração ~300 palavras)
const RESUMO_TEXTO = `
Olá! Aqui é o Simplinho, trazendo o resumo do que aconteceu hoje na política brasileira.

Começando pelas boas notícias: a Câmara dos Deputados aprovou o projeto que expande o auxílio transporte para trabalhadores autônomos. Isso significa que motoristas de aplicativo, entregadores e outros profissionais que trabalham por conta própria terão direito ao benefício. A medida agora segue para sanção presidencial e pode beneficiar mais de 2 milhões de brasileiros.

Ainda na Câmara, houve um debate intenso sobre o PL 2630, conhecido como Lei das Fake News. A discussão de hoje focou em como combater a desinformação nas redes sociais sem prejudicar a liberdade de expressão. Parlamentares de diferentes partidos apresentaram propostas para tornar as plataformas mais transparentes sobre como moderam conteúdo.

No Senado, a Comissão de Educação aprovou o projeto que institui o Programa Nacional de Educação Digital nas Escolas Públicas. Se aprovado, todas as escolas públicas do país receberão internet de alta velocidade e equipamentos para estudantes. É um passo importante para reduzir a desigualdade digital.

E tem mais: o projeto sobre saúde mental nas escolas avançou na Comissão de Saúde. A proposta cria um programa nacional de apoio psicológico para estudantes da rede pública, com psicólogos em todas as escolas. Uma medida muito importante, especialmente depois da pandemia.

Por fim, o projeto que regulamenta o trabalho em plataformas digitais teve audiência pública hoje. Motoristas, entregadores, empresas e sindicatos debateram sobre direitos trabalhistas. O tema divide opiniões, mas é fundamental para garantir proteção social a milhões de trabalhadores.

Esses foram os principais destaques de hoje. Fique ligado no SimplificaGov para não perder nenhuma atualização importante. Até amanhã!
`;

async function generateAudio() {
    try {
        console.log('🎙️  Gerando áudio do resumo diário...');

        const mp3 = await openai.audio.speech.create({
            model: "tts-1-hd", // Modelo de alta qualidade
            voice: "nova", // Voz feminina, clara e natural em português
            input: RESUMO_TEXTO,
            speed: 1.0 // Velocidade normal
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());
        const outputPath = path.join(__dirname, '..', 'public', 'audio', 'resumo-diario.mp3');

        // Criar diretório se não existir
        const audioDir = path.dirname(outputPath);
        if (!fs.existsSync(audioDir)) {
            fs.mkdirSync(audioDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, buffer);

        console.log('✅ Áudio gerado com sucesso!');
        console.log(`📁 Salvo em: ${outputPath}`);
        console.log(`📊 Tamanho: ${(buffer.length / 1024).toFixed(2)} KB`);

        // Calcular duração aproximada (baseado em taxa média de fala)
        const palavras = RESUMO_TEXTO.split(/\s+/).length;
        const duracaoMinutos = palavras / 150; // ~150 palavras por minuto
        console.log(`⏱️  Duração estimada: ${duracaoMinutos.toFixed(1)} minutos`);

    } catch (error) {
        console.error('❌ Erro ao gerar áudio:', error.message);
        process.exit(1);
    }
}

generateAudio();
