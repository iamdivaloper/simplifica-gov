
export default function TermosDeUsoPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Termos de Uso</h1>

                    <div className="bg-blue-50 border border-blue-100 p-6 mb-8 rounded-xl" role="note" aria-label="Resumo simples">
                        <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                            📋 Resumo Simples (sem juridiquês):
                        </h2>
                        <p className="text-blue-800 leading-relaxed">
                            Use o SimplificaGov de forma responsável. Não compartilhe informações falsas e respeite os outros usuários.
                            Nosso serviço é gratuito e você pode cancelar quando quiser. ✅
                        </p>
                    </div>

                    <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                        <p className="lead text-xl text-gray-700 mb-8">
                            Ao usar o SimplificaGov, você concorda com os termos abaixo. Leia com atenção para entender seus direitos e responsabilidades.
                        </p>

                        <section aria-labelledby="term-1">
                            <h2 id="term-1" className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Aceitação dos Termos</h2>
                            <p className="mb-4">
                                Ao se cadastrar e utilizar o SimplificaGov, você aceita automaticamente estes Termos de Uso.
                                Se não concordar com algum ponto, pedimos que não utilize nossos serviços.
                            </p>
                        </section>

                        <section aria-labelledby="term-2">
                            <h2 id="term-2" className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Descrição do Serviço</h2>
                            <p className="mb-4">O SimplificaGov oferece:</p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li>Resumos simplificados de projetos de lei e atividades legislativas</li>
                                <li>Alertas personalizados sobre temas de seu interesse</li>
                                <li>Acesso a informações públicas de forma clara e acessível</li>
                                <li>Notificações via WhatsApp e e-mail</li>
                            </ul>
                            <p className="mb-6">
                                Nosso serviço é <strong>100% gratuito</strong> para cidadãos. Não cobramos nenhuma taxa de uso.
                            </p>
                        </section>

                        <section aria-labelledby="term-3">
                            <h2 id="term-3" className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Responsabilidades do Usuário</h2>
                            <p className="mb-4">Ao usar o SimplificaGov, você se compromete a:</p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li>Fornecer informações verdadeiras e atualizadas no cadastro</li>
                                <li>Não utilizar o serviço para fins ilegais ou antiéticos</li>
                                <li>Não compartilhar conteúdo falso ou enganoso</li>
                                <li>Respeitar os direitos de outros usuários e da plataforma</li>
                                <li>Não tentar acessar áreas restritas do sistema</li>
                            </ul>
                        </section>

                        <section aria-labelledby="term-4">
                            <h2 id="term-4" className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Propriedade Intelectual</h2>
                            <p className="mb-4">
                                Todo o conteúdo original do SimplificaGov (textos, design, código) é protegido por direitos autorais.
                                As informações legislativas são de domínio público e pertencem aos órgãos oficiais.
                            </p>
                            <p className="mb-6">
                                Você pode compartilhar nossos resumos, desde que cite a fonte (SimplificaGov) e não altere o conteúdo.
                            </p>
                        </section>

                        <section aria-labelledby="term-5">
                            <h2 id="term-5" className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Limitação de Responsabilidade</h2>
                            <p className="mb-4">
                                O SimplificaGov se esforça para fornecer informações precisas e atualizadas, mas:
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li>Não somos responsáveis por decisões tomadas com base em nossos resumos</li>
                                <li>Recomendamos sempre consultar os textos oficiais para decisões importantes</li>
                                <li>Não garantimos disponibilidade 100% do tempo (manutenções podem ocorrer)</li>
                                <li>Não nos responsabilizamos por erros de terceiros (APIs governamentais)</li>
                            </ul>
                        </section>

                        <section aria-labelledby="term-6">
                            <h2 id="term-6" className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cancelamento e Exclusão</h2>
                            <p className="mb-4">
                                Você pode cancelar sua conta a qualquer momento, sem custos ou penalidades.
                                Todos os seus dados serão excluídos conforme nossa Política de Privacidade.
                            </p>
                            <p className="mb-6">
                                Reservamo-nos o direito de suspender contas que violem estes termos.
                            </p>
                        </section>

                        <section aria-labelledby="term-7">
                            <h2 id="term-7" className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Alterações nos Termos</h2>
                            <p className="mb-6">
                                Podemos atualizar estes termos ocasionalmente. Você será notificado de mudanças significativas
                                e terá a opção de aceitar ou cancelar sua conta.
                            </p>
                        </section>

                        <section aria-labelledby="term-8">
                            <h2 id="term-8" className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contato</h2>
                            <p>
                                Dúvidas sobre estes termos? Entre em contato:{" "}
                                <a href="mailto:ajuda@simplificagov.com.br" className="text-blue-600 hover:text-blue-700 hover:underline">
                                    ajuda@simplificagov.com.br
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
