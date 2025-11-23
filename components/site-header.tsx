"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User, Menu, Home, FileText, Newspaper, Bell, Star, Settings, LogOut, ChevronDown, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function SiteHeader() {
  const pathname = usePathname()
  const [isLoggedIn] = useState(false) // Mock: change to true to see login state
  const unreadAlerts = 3 // Mock unread count

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/projetos-de-lei", label: "Explorar Leis", icon: FileText },
    { href: "/parlamentares", label: "Políticos", icon: Users },
    { href: "/resumo-diario", label: "Resumo Diário", icon: Newspaper },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm" role="banner">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Página inicial do SimplificaGov">
            <Image
              src="/logo-full.png"
              alt="SimplificaGov - Logotipo"
              width={200}
              height={48}
              className="transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          <nav id="navigation" className="hidden md:flex gap-2" role="navigation" aria-label="Navegação principal">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Desktop User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden sm:flex items-center gap-2 h-10 px-4 border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 font-semibold"
                    aria-label="Menu do usuário"
                    aria-haspopup="true"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center" aria-hidden="true">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-900">Olá, Maria</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Maria da Silva</p>
                    <p className="text-xs text-gray-500">maria@exemplo.com</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="flex items-center gap-3 cursor-pointer">
                      <User className="h-4 w-4 text-gray-600" />
                      <span>Meus Dados</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil?tab=alertas" className="flex items-center gap-3 cursor-pointer">
                      <Bell className="h-4 w-4 text-gray-600" />
                      <div className="flex items-center justify-between flex-1">
                        <span>Seus Alertas</span>
                        {unreadAlerts > 0 && (
                          <Badge className="bg-red-500 text-white text-xs px-2 py-0">
                            {unreadAlerts}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil?tab=favoritos" className="flex items-center gap-3 cursor-pointer">
                      <Star className="h-4 w-4 text-gray-600" />
                      <span>Favoritos</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/configuracoes" className="flex items-center gap-3 cursor-pointer">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>Treinar Simplinho</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="flex items-center gap-3 cursor-pointer text-red-600">
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile User Button */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="sm:hidden relative rounded-full h-10 w-10 border-2 border-blue-200 bg-blue-50 hover:bg-blue-100"
              >
                <Link href="/perfil">
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-700" />
                  </div>
                  {unreadAlerts > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {unreadAlerts}
                    </Badge>
                  )}
                  <span className="sr-only">Perfil</span>
                </Link>
              </Button>
            </>
          ) : (
            <>
              {/* Not Logged In - Desktop */}
              <Link href="/login" className="hidden sm:block">
                <Button
                  variant="outline"
                  className="h-10 px-4 border-2 border-gray-300 hover:border-blue-300 hover:bg-blue-50 font-semibold"
                >
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro" className="hidden sm:block">
                <Button className="h-10 px-4 font-semibold shadow-md">
                  Criar Conta Grátis
                </Button>
              </Link>

              {/* Not Logged In - Mobile */}
              <Link href="/login" className="sm:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-10 w-10 border-2 border-gray-300"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Entrar</span>
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col gap-6 mt-8">
                  {isLoggedIn && (
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Maria da Silva</p>
                        <Link href="/perfil" className="text-sm text-blue-600 hover:underline">
                          Ver perfil →
                        </Link>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-colors",
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </nav>

                  {isLoggedIn && (
                    <>
                      <div className="h-px bg-gray-200" />
                      <nav className="flex flex-col gap-2">
                        <Link
                          href="/perfil?tab=alertas"
                          className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <div className="flex items-center gap-3">
                            <Bell className="h-5 w-5" />
                            Seus Alertas
                          </div>
                          {unreadAlerts > 0 && (
                            <Badge className="bg-red-500 text-white text-xs px-2 py-0.5">
                              {unreadAlerts}
                            </Badge>
                          )}
                        </Link>
                        <Link
                          href="/configuracoes"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Settings className="h-5 w-5" />
                          Treinar Simplinho
                        </Link>
                        <Link
                          href="/login"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5" />
                          Sair
                        </Link>
                      </nav>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
