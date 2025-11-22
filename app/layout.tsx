import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { VLibras } from "@/components/vlibras"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <VLibras />
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
