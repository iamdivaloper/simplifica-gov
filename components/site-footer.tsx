"use client"

import Link from "next/link"
import Image from "next/image"
import { useAccessibility } from "@/contexts/accessibility-context"
import { cn } from "@/lib/utils"

export function SiteFooter() {
    const { mode, setMode } = useAccessibility()

    return (
        <footer className="bg-gray-900 text-gray-400 py-12">
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center justify-center md:justify-start mb-4">
                            <Link href="/" className="block">
                                <Image
                                    src="/logo.png"
                                    alt="SimplificaGov"
                                    width={160}
                                    height={40}
                                    className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </Link>
                        </div>
                        <p className="text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                            Traduzindo o governo para você. Apoiando a cidadania através da tecnologia e da linguagem simples. 🇧🇷
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Plataforma</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/sobre" className="hover:text-blue-400 transition-colors">
                                    Sobre nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/#como-funciona" className="hover:text-blue-400 transition-colors">
                                    Como funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/projetos-de-lei" className="hover:text-blue-400 transition-colors">
                                    Explorar Leis
                                </Link>
                            </li>
                            <li>
                                <Link href="/parlamentares" className="hover:text-blue-400 transition-colors">
                                    Parlamentares
                                </Link>
                            </li>
                            <li>
                                <Link href="/lp-features" className="hover:text-blue-400 transition-colors">
                                    Funcionalidades
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Contato & Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="mailto:ajuda@simplificagov.com.br" className="hover:text-blue-400 transition-colors">
                                    ajuda@simplificagov.com.br
                                </a>
                            </li>
                            <li className="text-gray-400 mb-4">
                                Brasília, DF
                            </li>
                            <li className="pt-2 border-t border-gray-800">
                                <Link href="/politica-privacidade" className="hover:text-blue-400 transition-colors">
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos-de-uso" className="hover:text-blue-400 transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link href="/lgpd" className="hover:text-blue-400 transition-colors">
                                    LGPD
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-4">Acessibilidade</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button
                                    onClick={() => setMode(mode === "minimalist" ? "default" : "minimalist")}
                                    className={cn(
                                        "flex items-center gap-2 hover:text-blue-400 transition-colors text-left w-full",
                                        mode === "minimalist" && "text-blue-400 font-bold"
                                    )}
                                >
                                    <span className={cn(
                                        "w-2 h-2 rounded-full",
                                        mode === "minimalist" ? "bg-blue-400" : "bg-gray-600"
                                    )}></span>
                                    Versão Minimalista
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setMode(mode === "high-contrast" ? "default" : "high-contrast")}
                                    className={cn(
                                        "flex items-center gap-2 hover:text-yellow-400 transition-colors text-left w-full",
                                        mode === "high-contrast" && "text-yellow-400 font-bold"
                                    )}
                                >
                                    <span className={cn(
                                        "w-2 h-2 rounded-full",
                                        mode === "high-contrast" ? "bg-yellow-400" : "bg-gray-600"
                                    )}></span>
                                    Alto Contraste
                                </button>
                            </li>
                            {mode !== "default" && (
                                <li className="pt-2 mt-2 border-t border-gray-800">
                                    <button
                                        onClick={() => setMode("default")}
                                        className="text-xs text-gray-500 hover:text-white transition-colors"
                                    >
                                        Restaurar padrão
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="bg-blue-950/30 rounded-xl p-4 max-w-3xl mx-auto text-center border border-blue-900/30 mb-8">
                        <p className="text-sm text-blue-200 flex items-center justify-center gap-2 flex-wrap leading-relaxed">
                            <span className="font-bold">⚠️ Transparência total:</span>
                            Este é um projeto independente de tecnologia cívica.
                            Facilitamos o acesso a dados oficiais, mas não temos vínculo com o Governo Federal.
                        </p>
                    </div>
                    <div className="text-xs text-center text-gray-500">
                        © 2025 SimplificaGov. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    )
}
