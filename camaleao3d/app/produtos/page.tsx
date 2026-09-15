'use client'

import Link from 'next/link'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import CardProduto from '@/components/CardProduto'
import { categorias, produtosExemplo } from '@/lib/catalogo'

// O filtro lê a categoria no navegador, e não no servidor, para a página
// continuar sendo um arquivo estático — é o que permite publicar no
// GitHub Pages sem nada rodando por trás.

function Conteudo() {
  const atual = useSearchParams().get('categoria') ?? undefined
  const cat = categorias.find((c) => c.slug === atual)
  const lista = atual
    ? produtosExemplo.filter((p) => p.categoria === atual)
    : produtosExemplo

  return (
    <>
      <h1 className="text-4xl font-extrabold sm:text-5xl">
        {cat ? cat.nome : 'Todos os produtos'}
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
