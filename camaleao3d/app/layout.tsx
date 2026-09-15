import type { Metadata } from 'next'
import { Bricolage_Grotesque, Archivo } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BotaoWhatsapp from '@/components/BotaoWhatsapp'
import { CarrinhoProvider } from '@/components/Carrinho'

// Display com personalidade para títulos e para a marca
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Corpo neutro e legível em tela pequena
const corpo = Archivo({
  subsets: ['latin'],
  variable: '--font-corpo',
  display: 'swap',
})

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: 'Camaleão3D — peças impressas em 3D, na cor que você escolher',
    template: '%s · Camaleão3D',
  },
  description:
    'Organizadores, topo de bolo, chaveiros articulados e miniaturas impressas em 3D. Você escolhe a cor do filamento. Garantia de 3 dias contra defeito.',
  keywords: [
    'impressão 3D',
    'chaveiro articulado',
    'topo de bolo 3D',
    'organizador personalizado',
    'miniatura articulada',
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Camaleão3D',
    title: 'Camaleão3D — peças impressas em 3D, na cor que você escolher',
    description:
      'Você escolhe a cor, a gente imprime. Garantia de 3 dias contra defeito.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable}`}>
      <body className="flex min-h-screen flex-col">
        <CarrinhoProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <BotaoWhatsapp />
        </CarrinhoProvider>
      </body>
    </html>
  )
}
