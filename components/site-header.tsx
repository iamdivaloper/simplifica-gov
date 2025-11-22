"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Início" },
    { href: "/projetos-de-lei", label: "Projetos de Lei" },
    { href: "/resumo-diario", label: "Seu Resumo Diário" },
    { href: "/favoritos", label: "Favoritos" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-105">
              S
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">SimplificaGov</span>
          </Link>

          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-10 w-10 border border-gray-200 bg-gray-50 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-3 rounded-md text-lg font-medium transition-colors",
                        pathname === item.href
                          ? "bg-blue-50 text-primary"
                          : "text-gray-600 hover:text-primary hover:bg-gray-50",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="h-px bg-gray-100 my-2" />
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-3 rounded-md text-lg font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    <User className="h-5 w-5" />
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
