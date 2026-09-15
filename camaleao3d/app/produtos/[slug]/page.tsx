import Link from 'next/link'
import { notFound } from 'next/navigation'
import CompraProduto from '@/components/CompraProduto'
import CardProduto from '@/components/CardProduto'
import ArteCategoria from '@/components/ArteCategoria'
import { produtosExemplo, categorias, corDaCategoria, brl } from '@/lib/catalogo'

export function generateStaticParams() {
  return produtosExemplo.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = produtosExemplo.find((x) => x.slug === params.slug)
  if (!p) return {}
  return { title: p.nome, description: p.descricao }
}

export default function PaginaProduto({ params }: { params: { slug: string } }) {
  const p = produtosExemplo.find((x) => x.slug === params.slug)
  if (!p) notFound()

  const cat = categorias.find((c) => c.slug === p.categoria)
  const cor = corDaCategoria(p.categoria)
  const relacionados = produtosExemplo
    .filter((x) => x.categoria === p.categoria && x.slug !== p.slug)
    .slice(0, 4)

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <nav className="text-sm text-noite/60">
        <Link href="/produtos" className="hover:underline">Produtos</Link>
        {cat && (
          <>
            {' · '}
            <Link href={`/produtos?categoria=${cat.slug}`} className="hover:underline">
              {cat.nome}
            </Link>
          </>
        )}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Foto */}
        {p.imagem ? (
          <img
            src={p.imagem}
            alt={p.nome}
            className="aspect-square rounded-peca object-cover"
          />
        ) : (
          <div
            className="grid aspect-square place-items-center rounded-peca"
            style={{ background: `${cor}1A` }}
          >
            <ArteCategoria categoria={p.categoria} cor={cor} className="h-2/5 w-2/5 opacity-60" />
          </div>
        )}

        {/* Compra */}
        <div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{p.nome}</h1>

          {p.avaliacao && (
            <p className="mt-2 text-noite/65">
              ★ {p.avaliacao.nota.toFixed(1).replace('.', ',')} · {p.avaliacao.total} avaliações
            </p>
          )}

          <p className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold tracking-aperto">
              {brl(p.preco)}
            </span>
            {p.precoRiscado && (
              <span className="text-lg text-noite/45 line-through">
                {brl(p.precoRiscado)}
              </span>
            )}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-noite/80">
            {p.descricao}
          </p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-peca bg-nevoa/60 px-3.5 py-2 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full" style={{ background: cor }} />
            Fica pronta em {p.prazoDias[0]} a {p.prazoDias[1]} dias úteis
          </p>

          <CompraProduto p={p} />

          <ul className="mt-9 space-y-2.5 border-t border-nevoa pt-7 text-sm text-noite/75">
            <li>A cor está no filamento. Não é tinta, então não lasca nem desbota.</li>
            <li>Garantia de 3 dias contra defeito, com troca ou dinheiro de volta.</li>
            <li>Enviamos com código de rastreio para todo o Brasil.</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-extrabold">Da mesma categoria</h2>
          <ul className="mt-7 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {relacionados.map((r) => (
              <li key={r.id}>
                <CardProduto p={r} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
