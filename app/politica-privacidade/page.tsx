
export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

          <div className="bg-blue-50 border border-blue-100 p-6 mb-8 rounded-xl" role="note" aria-label="Resumo simples">
            <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              🔒 Resumo Simples (sem juridiquês):
            </h2>
            <p className="text-blue-800 leading-relaxed">
              Seus dados são seus. Nós só usamos seu nome e telefone para enviar os resumos que você pediu.
              Nunca vendemos suas informações e você pode deletar tudo quando quiser. 🔐
            </p>
          </div>

          <div className="prose prose-lg prose-blue max-w-none text-gray-600">
            <p className="lead text-xl text-gray-700 mb-8">
              Sua privacidade é nossa prioridade. Abaixo, detalhamos legalmente como protegemos você,
              em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <section aria-labelledby="policy-1">
              <h2 id="policy-1" className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Coleta de Dados</h2>
              <p className="mb-4">
                Coletamos apenas os dados necessários para prestar nosso serviço de resumos legislativos:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Número de WhatsApp (para envio dos resumos)</li>
                <li>Nome (para personalização)</li>
                <li>CEP (para alertas locais)</li>
                <li>Interesses temáticos (para filtrar o conteúdo relevante)</li>
              </ul>
            </section>

            <section aria-labelledby="policy-2">
              <h2 id="policy-2" className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Uso das Informações</h2>
              <p className="mb-4">Seus dados são utilizados exclusivamente para:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Enviar resumos e alertas solicitados via WhatsApp.</li>
                <li>Personalizar o conteúdo de acordo com sua localização e interesses.</li>
                <li>Melhorar nossos algoritmos de tradução de linguagem.</li>
              </ul>
              <p className="mb-6 font-medium">
                NUNCA vendemos seus dados para terceiros ou utilizamos para fins de propaganda política.
              </p>
            </section>

            <section aria-labelledby="policy-3">
              <h2 id="policy-3" className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Seus Direitos (LGPD)</h2>
              <p className="mb-4">Você tem total controle sobre seus dados. A qualquer momento, você pode:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Solicitar uma cópia dos dados que temos sobre você.</li>
                <li>Pedir a correção de dados incompletos ou errados.</li>
                <li>Solicitar a exclusão total da sua conta e dados.</li>
              </ul>
            </section>

            <section aria-labelledby="policy-4">
              <h2 id="policy-4" className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Contato</h2>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre nossa política, entre em contato pelo e-mail:{" "}
                <a href="mailto:privacidade@simplificagov.com.br" className="text-blue-600 hover:text-blue-700 hover:underline">
                  privacidade@simplificagov.com.br
                </a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
              Última atualização: Novembro de 2025.
            </div>
          </div>
        </article>
      </main>

    </div>
  )
}
