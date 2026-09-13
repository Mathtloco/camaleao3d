import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: 'Camaleão3D — peças impressas em 3D, prontas para usar',
    template: '%s · Camaleão3D',
  },
  description:
    'Chaveiros articulados, organizadores e miniaturas impressas em 3D. Cor direta no filamento, sem tinta, sem descascar.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Camaleão3D',
    title: 'Camaleão3D — peças impressas em 3D, prontas para usar',
    description:
      'Chaveiros articulados, organizadores e miniaturas impressas em 3D.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>{children}</body>
    </html>
  )
}
