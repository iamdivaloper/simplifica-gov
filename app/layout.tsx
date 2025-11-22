import type React from "react"
import { Public_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { VLibras } from "@/components/vlibras"
import { WhatsappFloat } from "@/components/whatsapp-float"
import "./globals.css"

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${publicSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <VLibras />
        <WhatsappFloat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.app'
};
