'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import { BotaoCarrinho } from './Carrinho'
import { categorias } from '@/lib/catalogo'

const links = [
  { href: '/produtos', texto: 'Produtos' },
  { href: '/sobre', texto: 'Quem somos' },
  { href: '/garantia', texto: 'Garantia' },
]

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-noite text-folha">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" aria-label="Camaleão3D, início">
          <Logo />
        </Link>

        {/* desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-peca px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              {l.texto}
            </Link>
          ))}
          <BotaoCarrinho />
        </nav>

        {/* celular */}
        <div className="flex items-center gap-1 md:hidden">
          <BotaoCarrinho />
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="rounded-peca p-2 hover:bg-white/10"
            aria-expanded={menuAberto}
            aria-label="Abrir menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d={menuAberto ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuAberto && (
        <nav className="border-t border-white/10 px-5 pb-5 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuAberto(false)}
              className="block border-b border-white/10 py-3 font-semibold"
            >
              {l.texto}
            </Link>
          ))}
          <p className="pb-2 pt-4 text-xs font-bold uppercase tracking-wider text-giz">
            Categorias
          </p>
          {categorias.map((c) => (
            <div key={c.slug}>
              <Link
                href={`/produtos?categoria=${c.slug}`}
                onClick={() => setMenuAberto(false)}
                className="flex items-center gap-2.5 py-2.5 text-sm"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: c.cor }}
                />
                {c.nome}
              </Link>
              {c.subcategorias && (
                <div className="mb-1 ml-5 flex flex-wrap gap-x-4 gap-y-1">
                  {c.subcategorias.map((sc) => (
                    <Link
                      key={sc.slug}
                      href={`/produtos?categoria=${c.slug}&sub=${sc.slug}`}
                      onClick={() => setMenuAberto(false)}
                      className="text-sm text-giz"
                    >
                      {sc.nome}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  )
}
