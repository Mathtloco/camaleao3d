import Link from 'next/link'
import ArteCategoria from './ArteCategoria'
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
        {p.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.imagem}
            alt={p.nome}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:scale-[1.05]">
            <ArteCategoria
              categoria={p.categoria}
              cor={cor}
              className="h-[55%] w-[55%] opacity-60"
            />
          </div>
        )}

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
