import Link from 'next/link'
import Logo from './Logo'
import { categorias } from '@/lib/catalogo'
import { WHATSAPP } from '@/lib/contato'

export default function Footer() {
  return (
    <footer className="bg-noite text-folha">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-giz">
            Peças impressas sob encomenda, uma a uma. A cor vem no filamento,
            nunca é tinta por cima.
          </p>
        </div>

        <div>
          <p className="font-display font-bold tracking-aperto">Categorias</p>
          <ul className="mt-3 space-y-2 text-sm text-giz">
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/produtos?categoria=${c.slug}`} className="hover:text-folha">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-bold tracking-aperto">Ajuda</p>
          <ul className="mt-3 space-y-2 text-sm text-giz">
            <li><Link href="/garantia" className="hover:text-folha">Garantia e defeitos</Link></li>
            <li><Link href="/garantia#reclamacao" className="hover:text-folha">Abrir chamado</Link></li>
            <li><Link href="/sobre" className="hover:text-folha">Quem somos</Link></li>
            <li><Link href="/produtos" className="hover:text-folha">Catálogo</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-bold tracking-aperto">Falar com a gente</p>
          <ul className="mt-3 space-y-2 text-sm text-giz">
            <li>
              <a href={`https://wa.me/${WHATSAPP}`} className="hover:text-folha">
                Chamar no WhatsApp
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-giz">
            Respondemos de segunda a sábado, das 9h às 19h.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-giz">
          <p>Camaleão3D · Impresso sob encomenda no Brasil</p>
          <p>Pagamento no PIX</p>
        </div>
      </div>
    </footer>
  )
}
