import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { nichos, brl } from '@/lib/nichos'

export const metadata = { title: 'Produtos' }
export const revalidate = 60

type Produto = {
  id: string
  slug: string
  nome: string
  descricao: string | null
  preco: number
  imagens: string[]
  cores: string[]
}

export default async function Produtos({
  searchParams,
}: {
  searchParams: { nicho?: string }
}) {
  const nichoAtual = searchParams.nicho
  let produtos: Produto[] = []
  let bancoConfigurado = false

  if (supabase) {
    bancoConfigurado = true
    let q = supabase
      .from('produtos')
      .select('id, slug, nome, descricao, preco, imagens, cores, categorias!inner(slug)')
      .eq('ativo', true)
      .order('criado_em', { ascending: false })

    if (nichoAtual) q = q.eq('categorias.slug', nichoAtual)

    const { data } = await q
    produtos = (data as unknown as Produto[]) || []
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/" className="text-sm underline">
        Camaleão3D
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold tracking-aperto sm:text-5xl">
        Produtos
      </h1>

      {/* Filtro por nicho */}
      <div className="mt-7 flex flex-wrap gap-2">
        <Link
          href="/produtos"
          className={`border px-4 py-2 text-sm ${
            !nichoAtual
              ? 'border-casca bg-casca text-placa'
              : 'border-placaEscura hover:border-casca'
          }`}
        >
          Tudo
        </Link>
        {nichos.map((n) => (
          <Link
            key={n.slug}
            href={`/produtos?nicho=${n.slug}`}
            className={`border px-4 py-2 text-sm ${
              nichoAtual === n.slug
                ? 'border-casca bg-casca text-placa'
                : 'border-placaEscura hover:border-casca'
            }`}
          >
            {n.nome}
          </Link>
        ))}
      </div>

      {/* Estados vazios: dizem o que fazer, não pedem desculpa */}
      {!bancoConfigurado && (
        <div className="mt-12 border border-placaEscura p-7">
          <h2 className="text-lg font-bold tracking-aperto">
            O banco ainda não está conectado
          </h2>
          <p className="mt-2 max-w-lg leading-relaxed text-casca/70">
            Preencha <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
            e <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
            no arquivo <code className="font-mono">.env.local</code> e reinicie o
            servidor. O passo a passo está no SETUP.md.
          </p>
        </div>
      )}

      {bancoConfigurado && produtos.length === 0 && (
        <div className="mt-12 border border-placaEscura p-7">
          <h2 className="text-lg font-bold tracking-aperto">
            Nenhum produto cadastrado ainda
          </h2>
          <p className="mt-2 max-w-lg leading-relaxed text-casca/70">
            Cadastre o primeiro produto no painel do Supabase, na tabela{' '}
            <code className="font-mono">produtos</code>, e ele aparece aqui.
          </p>
        </div>
      )}

      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <li key={p.id}>
            <Link href={`/produtos/${p.slug}`} className="group block">
              <div className="aspect-square overflow-hidden bg-placaEscura">
                {p.imagens?.[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imagens[0]}
                    alt={p.nome}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <h2 className="mt-3 font-bold tracking-aperto group-hover:text-musgo">
                {p.nome}
              </h2>
              <p className="mt-0.5 text-sm text-casca/70">{brl(p.preco)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
