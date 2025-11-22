import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center gap-2 text-sm", className)}>
            <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                aria-label="Voltar para início"
            >
                <Home className="h-4 w-4" />
                <span className="sr-only">Início</span>
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-gray-600 hover:text-primary transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    "font-medium",
                                    isLast ? "text-gray-900" : "text-gray-600"
                                )}
                                aria-current={isLast ? "page" : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}
