import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { VLibras } from "@/components/vlibras"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/contexts/auth-context"
import { SkipLinks } from "@/components/skip-links"
import { AccessibilityProvider } from "@/contexts/accessibility-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <SkipLinks />
        <AccessibilityProvider>
          <AuthProvider>
            <SiteHeader />
            <main id="main-content" role="main" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter />
            <WhatsappFloat />
            <VLibras />
            <Toaster />
          </AuthProvider>
        </AccessibilityProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export const metadata = {
  metadataBase: new URL('https://simplificagov.com'),
  title: {
    default: 'SimplificaGov - Política sem complicação',
    template: '%s | SimplificaGov',
  },
  description: 'Traduzimos as leis e notícias do governo para uma linguagem simples. Receba resumos em áudio e texto direto no seu WhatsApp.',
  keywords: ['política', 'governo', 'leis', 'cidadania', 'simplificação', 'whatsapp', 'ia', 'inteligência artificial'],
  authors: [{ name: 'SimplificaGov Team' }],
  creator: 'SimplificaGov',
  publisher: 'SimplificaGov',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SimplificaGov - Política sem complicação',
    description: 'Traduzimos as leis e notícias do governo para uma linguagem simples. Receba resumos em áudio e texto direto no seu WhatsApp.',
    url: 'https://simplificagov.com',
    siteName: 'SimplificaGov',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/logo-full.png',
        width: 1200,
        height: 630,
        alt: 'SimplificaGov Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimplificaGov - Política sem complicação',
    description: 'Traduzimos as leis e notícias do governo para uma linguagem simples. Receba resumos em áudio e texto direto no seu WhatsApp.',
    images: ['/logo-full.png'],
    creator: '@simplificagov', // Assuming this handle, can be updated later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
