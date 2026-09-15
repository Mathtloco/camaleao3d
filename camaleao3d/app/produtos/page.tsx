'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CardProduto from '@/components/CardProduto'
import OrcamentoPersonalizado from '@/components/OrcamentoPersonalizado'
import { categorias, produtosExemplo, subcategoriasDe } from '@/lib/catalogo'

// O filtro lê a categoria no navegador, e não no servidor, para a página
// continuar sendo um arquivo estático — é o que permite publicar no
// GitHub Pages sem nada rodando por trás.

function Conteudo() {
  const params = useSearchParams()
  const atual = params.get('categoria') ?? undefined
  const sub = params.get('sub') ?? undefined

  const cat = categorias.find((c) => c.slug === atual)
  const subs = subcategoriasDe(atual)
  const subAtual = subs.find((s) => s.slug === sub)

  const lista = produtosExemplo
    .filter((p) => (atual ? p.categoria === atual : true))
    .filter((p) => (sub ? p.subcategoria === sub : true))

  return (
    <>
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        {subAtual ? subAtual.nome : cat ? cat.nome : 'Todos os produtos'}
      </h1>
      <p className="mt-2 text-noite/65">
        {cat ? cat.chamada : 'Escolha a peça e depois a cor do filamento.'}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        <Link
          href="/produtos"
          className={`rounded-peca border px-4 py-2 text-sm font-semibold ${
            !atual ? 'border-noite bg-noite text-folha' : 'border-nevoa hover:border-noite'
          }`}
        >
          Tudo
        </Link>
        {categorias.map((c) => {
          const ativo = atual === c.slug
          return (
            <Link
              key={c.slug}
              href={`/produtos?categoria=${c.slug}`}
              className="flex items-center gap-2 rounded-peca border px-4 py-2 text-sm font-semibold"
              style={
                ativo
                  ? { background: c.cor, borderColor: c.cor, color: '#0E2A22' }
                  : { borderColor: '#DCE4DA' }
              }
            >
              {!ativo && (
                <span className="h-2 w-2 rounded-full" style={{ background: c.cor }} />
              )}
              {c.nome}
            </Link>
          )
        })}
      </div>

      {subs.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm text-noite/55">Dentro de {cat?.nome}:</span>
          <Link
            href={`/produtos?categoria=${atual}`}
            className={`rounded-full border px-3.5 py-1.5 text-sm ${
              !sub ? 'border-noite bg-noite text-folha' : 'border-nevoa hover:border-noite'
            }`}
          >
            Todos
          </Link>
          {subs.map((sc) => (
            <Link
              key={sc.slug}
              href={`/produtos?categoria=${atual}&sub=${sc.slug}`}
              className={`rounded-full border px-3.5 py-1.5 text-sm ${
                sub === sc.slug
                  ? 'border-noite bg-noite text-folha'
                  : 'border-nevoa hover:border-noite'
              }`}
            >
              {sc.nome}
            </Link>
          ))}
        </div>
      )}

      {lista.length === 0 ? (
        <div className="mt-14 rounded-peca border border-nevoa p-8">
          <h2 className="text-lg font-bold">Ainda não tem peça nesta categoria</h2>
          <p className="mt-2 max-w-md leading-relaxed text-noite/70">
            Estamos modelando as primeiras. Enquanto isso, dá uma olhada no
            resto do catálogo.
          </p>
          <Link href="/produtos" className="mt-5 inline-block font-semibold underline">
            Ver tudo
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((p) => (
            <li key={p.id}>
              <CardProduto p={p} />
            </li>
          ))}
        </ul>
      )}

      <OrcamentoPersonalizado />
    </>
  )
}

export default function Catalogo() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <Suspense fallback={<p className="text-noite/60">Carregando...</p>}>
        <Conteudo />
      </Suspense>
    </main>
  )
}
