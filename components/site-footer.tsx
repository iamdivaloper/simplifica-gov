import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
    return (
        <footer className="bg-[#172554] text-gray-400 py-12">
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <Link href="/" className="block">
                                <Image
                                    src="/logo-full.png"
                                    alt="SimplificaGov - Traduzindo o Congresso para você"
                                    width={240}
                                    height={58}
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>
                        <p className="text-sm max-w-xs mx-auto md:mx-0">
                            Traduzindo o governo para você. Apoiando a cidadania através da tecnologia e da linguagem simples.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 w-full">
                                Ver outras versões:
                            </span>
                            <Link href="/lp-minimal" className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded">
                                Minimalista
                            </Link>
                            <Link
                                href="/lp-accessible"
                                className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded"
                            >
                                Alto Contraste
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Plataforma</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/sobre" className="hover:text-white">
                                    Sobre nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/#como-funciona" className="hover:text-white">
                                    Como funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/lp-features" className="hover:text-white">
                                    Funcionalidades
                                </Link>
                            </li>
                            <li>
                                <Link href="/politica-privacidade" className="hover:text-white">
                                    Política de Privacidade
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4">Contato</h4>
                        <ul className="space-y-2 text-sm">
                            <li>ajuda@simplificagov.com.br</li>
                            <li>Brasília, DF</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-xs text-center">
                    © 2025 SimplificaGov. Todos os direitos reservados.
                </div>
            </div>
        </footer >
    )
}
