import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileQuestion className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
                <p className="text-gray-600 mb-8">
                    Ops! Parece que o conteúdo que você procura não está aqui. Pode ter sido movido ou excluído.
                </p>
                <Link href="/" passHref>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-xl">
                        Voltar para o Início
                    </Button>
                </Link>
            </div>
        </div>
    )
}
