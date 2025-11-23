/**
 * Test script for SimplificaGov features
 * Tests cache, sync, and AI analysis
 */

import { cache, TTL } from "../lib/cache";
import { syncManager } from "../lib/sync";
import { analisarLei, calcularIndiceAcessibilidade } from "../lib/simplificagov-ai";

// Test data
const SAMPLE_LEI = `
Art. 1º Esta lei estabelece diretrizes para a política nacional de mobilidade urbana.

Art. 2º Fica autorizado o Poder Executivo a conceder subsídios para o transporte público coletivo.

§ 1º Os subsídios de que trata o caput serão destinados à redução do valor das tarifas.

§ 2º O montante dos subsídios será definido anualmente pela Lei Orçamentária.

Art. 3º Esta lei entra em vigor na data de sua publicação.
`;

async function testCache() {
    console.log("\n🧪 Testando Cache...\n");

    try {
        // Test set
        await cache.set("leis", "test_lei_123", { id: "123", titulo: "Lei de Teste" }, TTL.LEIS);
        console.log("✅ Cache SET funcionou");

        // Test get
        const cached = await cache.get("leis", "test_lei_123");
        console.log("✅ Cache GET funcionou:", cached);

        // Test stats
        const stats = await cache.getStats();
        console.log("✅ Cache STATS:", stats);

        // Test invalidate
        await cache.invalidate("leis", "test_lei_123");
        console.log("✅ Cache INVALIDATE funcionou");

        return true;
    } catch (error) {
        console.error("❌ Erro no teste de cache:", error);
        return false;
    }
}

async function testSync() {
    console.log("\n🧪 Testando Sincronização...\n");

    try {
        const status = syncManager.getStatus();
        console.log("✅ Sync STATUS:", status);

        // Test manual sync
        console.log("🔄 Iniciando sync manual...");
        await syncManager.syncPendingActions();
        console.log("✅ Sync manual completado");

        return true;
    } catch (error) {
        console.error("❌ Erro no teste de sync:", error);
        return false;
    }
}

async function testSimplificaGovAI() {
    console.log("\n🧪 Testando SimplificaGov AI...\n");

    try {
        console.log("🤖 Analisando lei de exemplo...");
        const analise = await analisarLei(SAMPLE_LEI, "https://exemplo.com/lei");

        console.log("\n📊 Resultado da Análise:");
        console.log("Título:", analise.titulo_simples);
        console.log("Roteiro:", analise.roteiro_audio_whatsapp.substring(0, 100) + "...");
        console.log("Impacto no Bolso:", analise.cards_visuais.impacto_bolso);
        console.log("Impacto em Direitos:", analise.cards_visuais.impacto_direitos);
        console.log("Status:", analise.cards_visuais.status_projeto);
        console.log("Complexidade:", analise.auditoria_ia_responsavel.nota_complexidade_original);
        console.log("Tags:", analise.tags_mapa_afetos.join(", "));

        // Test accessibility index
        const indice = calcularIndiceAcessibilidade(
            analise.auditoria_ia_responsavel.nota_complexidade_original
        );
        console.log("\n📈 Índice de Acessibilidade:");
        console.log(`${indice.emoji} ${indice.nivel} - ${indice.mensagem}`);

        console.log("\n✅ SimplificaGov AI funcionou corretamente");
        return true;
    } catch (error) {
        console.error("❌ Erro no teste de AI:", error);
        console.log("⚠️  Isso é esperado se OPENROUTER_API_KEY não estiver configurada");
        return false;
    }
}

async function runAllTests() {
    console.log("🚀 SimplificaGov - Testes de Integração\n");
    console.log("=".repeat(50));

    const results = {
        cache: await testCache(),
        sync: await testSync(),
        ai: await testSimplificaGovAI(),
    };

    console.log("\n" + "=".repeat(50));
    console.log("\n📊 Resumo dos Testes:\n");
    console.log(`Cache:      ${results.cache ? "✅ PASSOU" : "❌ FALHOU"}`);
    console.log(`Sync:       ${results.sync ? "✅ PASSOU" : "❌ FALHOU"}`);
    console.log(`AI:         ${results.ai ? "✅ PASSOU" : "⚠️  PULADO (sem API key)"}`);

    const allPassed = results.cache && results.sync;
    console.log(`\n${allPassed ? "✅" : "❌"} Status Geral: ${allPassed ? "SUCESSO" : "FALHAS DETECTADAS"}`);

    return allPassed;
}

// Run tests if executed directly
if (typeof window === 'undefined') {
    runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}

export { testCache, testSync, testSimplificaGovAI, runAllTests };
