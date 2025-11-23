
export default function LGPDPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">LGPD - Lei Geral de Proteção de Dados</h1>

                    <div className="bg-blue-50 border border-blue-100 p-6 mb-8 rounded-xl">
                        <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                            🛡️ Resumo Simples (sem juridiquês):
                        </h2>
                        <p className="text-blue-800 leading-relaxed">
                            A LGPD garante que você tem controle total sobre seus dados pessoais. Você pode acessar, corrigir ou deletar
                            suas informações a qualquer momento. Levamos isso muito a sério! 🔐
                        </p>
                    </div>

                    <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                        <p className="lead text-xl text-gray-700 mb-8">
                            O SimplificaGov está em total conformidade com a Lei nº 13.709/2018 (LGPD).
                            Abaixo, explicamos como aplicamos seus direitos na prática.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">O que é a LGPD?</h2>
                        <p className="mb-6">
                            A Lei Geral de Proteção de Dados (LGPD) é uma lei brasileira que protege a privacidade e os dados pessoais
                            de todos os cidadãos. Ela garante que você tenha controle sobre como suas informações são coletadas,
                            armazenadas e utilizadas por empresas e organizações.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Seus Direitos Garantidos pela LGPD</h2>
                        <p className="mb-4">De acordo com a LGPD, você tem os seguintes direitos:</p>

                        <div className="space-y-6 mb-8">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Direito de Acesso 👁️</h3>
                                <p className="text-gray-600">
                                    Você pode solicitar uma cópia completa de todos os dados que temos sobre você, a qualquer momento.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Direito de Correção ✏️</h3>
                                <p className="text-gray-600">
                                    Se algum dado seu estiver incorreto ou desatualizado, você pode pedir para corrigirmos.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Direito de Exclusão 🗑️</h3>
                                <p className="text-gray-600">
                                    Você pode solicitar a exclusão total de seus dados a qualquer momento, sem justificativa.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Direito de Portabilidade 📦</h3>
                                <p className="text-gray-600">
                                    Você pode pedir seus dados em formato estruturado para usar em outros serviços.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">5. Direito de Revogação 🚫</h3>
                                <p className="text-gray-600">
                                    Você pode retirar seu consentimento para uso de dados a qualquer momento.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">6. Direito de Informação 📋</h3>
                                <p className="text-gray-600">
                                    Você tem direito de saber com quem compartilhamos seus dados (spoiler: com ninguém!).
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Como Exercer Seus Direitos</h2>
                        <p className="mb-4">
                            Para exercer qualquer um dos direitos acima, é muito simples:
                        </p>
                        <ol className="list-decimal pl-6 mb-6 space-y-2">
                            <li>Envie um e-mail para <strong>privacidade@simplificagov.com.br</strong></li>
                            <li>Informe qual direito você deseja exercer</li>
                            <li>Aguarde nossa resposta em até <strong>15 dias úteis</strong></li>
                        </ol>
                        <p className="mb-6 bg-green-50 p-4 rounded-xl border border-green-200">
                            <strong className="text-green-900">💚 Garantia:</strong> Não cobramos nada para atender suas solicitações.
                            É seu direito e nosso dever!
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nossa Responsabilidade</h2>
                        <p className="mb-4">Como controladores de dados, nos comprometemos a:</p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>Coletar apenas dados essenciais para o serviço</li>
                            <li>Proteger seus dados com medidas de segurança adequadas</li>
                            <li>Não vender ou compartilhar seus dados com terceiros</li>
                            <li>Notificá-lo imediatamente em caso de vazamento de dados</li>
                            <li>Excluir seus dados quando você solicitar ou quando não forem mais necessários</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Encarregado de Dados (DPO)</h2>
                        <p className="mb-6">
                            Nosso Encarregado de Proteção de Dados está disponível para esclarecer dúvidas e receber solicitações
                            relacionadas à LGPD através do e-mail:{" "}
                            <a href="mailto:dpo@simplificagov.com.br" className="text-blue-600 hover:text-blue-700 hover:underline">
                                dpo@simplificagov.com.br
                            </a>
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Autoridade Nacional de Proteção de Dados (ANPD)</h2>
                        <p className="mb-6">
                            Se você não ficar satisfeito com nossa resposta, pode registrar uma reclamação diretamente na ANPD,
                            a autoridade brasileira responsável pela fiscalização da LGPD:{" "}
                            <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
                                www.gov.br/anpd
                            </a>
                        </p>

                        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
                            Última atualização: Novembro de 2025.
                        </div>
                    </div>
                </div>
            </main>

        </div>
    )
}
