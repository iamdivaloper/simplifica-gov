
export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

        <div className="prose prose-lg prose-blue max-w-none text-gray-600">
          <p className="lead text-xl text-gray-700 mb-8">
            Sua privacidade é nossa prioridade. Esta política descreve como o SimplificaGov coleta, usa e protege suas
            informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Coleta de Dados</h2>
          <p className="mb-4">
            Coletamos apenas os dados necessários para prestar nosso serviço de resumos legislativos:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Número de WhatsApp (para envio dos resumos)</li>
            <li>Nome (para personalização)</li>
            <li>CEP (para alertas locais)</li>
            <li>Interesses temáticos (para filtrar o conteúdo relevante)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Uso das Informações</h2>
          <p className="mb-4">Seus dados são utilizados exclusivamente para:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Enviar resumos e alertas solicitados via WhatsApp.</li>
            <li>Personalizar o conteúdo de acordo com sua localização e interesses.</li>
            <li>Melhorar nossos algoritmos de tradução de linguagem.</li>
          </ul>
          <p className="mb-6 font-medium">
            NUNCA vendemos seus dados para terceiros ou utilizamos para fins de propaganda política.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Seus Direitos (LGPD)</h2>
          <p className="mb-4">Você tem total controle sobre seus dados. A qualquer momento, você pode:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Solicitar uma cópia dos dados que temos sobre você.</li>
            <li>Pedir a correção de dados incompletos ou errados.</li>
            <li>Solicitar a exclusão total da sua conta e dados.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Contato</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre nossa política, entre em contato pelo e-mail:{" "}
            <a href="mailto:privacidade@simplificagov.com.br" className="text-primary hover:underline">
              privacidade@simplificagov.com.br
            </a>
          </p>

          <div className="mt-12 pt-8 border-t text-sm text-gray-500">Última atualização: Novembro de 2025.</div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8 text-center text-gray-500 text-sm">
        <p>© 2025 SimplificaGov. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
