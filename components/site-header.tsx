import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">SimplificaGov</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/projetos-de-lei" className="text-gray-500 hover:text-primary font-medium transition-colors">
              Projetos de Lei
            </Link>
            <Link href="/resumo-diario" className="text-gray-500 hover:text-primary font-medium transition-colors">
              Seu Resumo Diário
            </Link>
            <Link href="/favoritos" className="hover:text-primary transition-colors">
              Favoritos
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>

          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Perfil</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary">
                    Início
                  </Link>
                  <Link href="/projetos-de-lei" className="text-lg font-medium text-gray-600 hover:text-primary">
                    Projetos de Lei
                  </Link>
                  <Link href="/resumo-diario" className="text-lg font-medium hover:text-primary">
                    Seu Resumo Diário
                  </Link>
                  <Link href="/favoritos" className="text-lg font-medium hover:text-primary">
                    Favoritos
                  </Link>
                  <Link href="/login" className="text-lg font-medium hover:text-primary">
                    Perfil
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
