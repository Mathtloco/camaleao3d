import Link from 'next/link'
import { brl, corDaCategoria, type Produto } from '@/lib/catalogo'

export default function CardProduto({ p }: { p: Produto }) {
  const cor = corDaCategoria(p.categoria)
  const desconto = p.precoRiscado
    ? Math.round((1 - p.preco / p.precoRiscado) * 100)
    : null

  return (
    <Link href={`/produtos/${p.slug}`} className="group block">
      <div
        className="relative aspect-square overflow-hidden rounded-peca"
        style={{ background: `${cor}1A` }}
      >
        {/* Espaço da foto. Enquanto não houver imagem, mostramos a
            silhueta com a cor da categoria, para a grade não ficar vazia. */}
        <div
          className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-[1.03]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 40" className="h-2/5 w-2/5" style={{ color: cor, opacity: 0.35 }} fill="none">
            <path d="M20 4c-8.8 0-16 7.2-16 16s7.2 16 16 16" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M20 36c6 0 11-5 11-11s-5-10-10-10-9 4-9 9 3.6 8 8 8 7-3.2 7-7-2.8-6-6-6-5 2.2-5 5 2 4 4 4 3.4-1.4 3.4-3.2" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {desconto && (
          <span className="absolute left-3 top-3 rounded-full bg-noite px-2.5 py-1 text-xs font-bold text-folha">
            −{desconto}%
          </span>
        )}
        {p.personalizavel && (
          <span
            className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-noite"
            style={{ background: cor }}
          >
            Personalizável
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold leading-snug group-hover:underline">
        {p.nome}
      </h3>

      {p.avaliacao && (
        <p className="mt-1 text-sm text-noite/60">
          ★ {p.avaliacao.nota.toFixed(1).replace('.', ',')} · {p.avaliacao.total} avaliações
        </p>
      )}

      <p className="mt-1.5 flex items-baseline gap-2">
        <span className="font-display text-lg font-bold tracking-aperto">
          {brl(p.preco)}
        </span>
        {p.precoRiscado && (
          <span className="text-sm text-noite/45 line-through">
            {brl(p.precoRiscado)}
          </span>
        )}
      </p>
      <p className="text-sm text-noite/55">
        Fica pronto em {p.prazoDias[0]} a {p.prazoDias[1]} dias
      </p>
    </Link>
  )
}
