import Link from 'next/link'
import CardProduto from '@/components/CardProduto'
import { categorias, produtosExemplo, filamentos, brl } from '@/lib/catalogo'

const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'camaleao3d'

export default function Home() {
  const destaques = produtosExemplo.filter((p) => p.destaque)

  return (
    <main>
      {/* ---------------------------------------------------------------
          Hero. A coisa mais característica da marca é a cor escolhida
          virando peça, então é isso que abre a página: as bolinhas de
          filamento, que é o que o cliente realmente escolhe.
      ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-noite text-folha">
        <div className="absolute inset-0 bg-camadas" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-espectro-organizacao" />
              Impressão sob encomenda · envio para todo o Brasil
            </p>

            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[0.97] sm:text-6xl">
              Você escolhe a cor.
              <br />
              A gente imprime.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-giz">
              Nada aqui é pintado. A cor está dentro do filamento, então não
              lasca no bolso, não descasca na mão e não desbota no sol do
              painel.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="rounded-peca bg-espectro-organizacao px-7 py-3.5 font-bold text-noite transition-transform active:scale-[.98]"
              >
                Ver o catálogo
              </Link>
              <Link
                href="/garantia"
                className="rounded-peca border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:border-white/60"
              >
                Como funciona a garantia
              </Link>
            </div>

            {/* As 12 cores disponíveis, mostradas de verdade */}
            <div className="mt-10">
              <p className="text-sm text-giz">12 cores de filamento em estoque</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {filamentos.map((f) => (
                  <li
                    key={f.nome}
                    title={f.nome}
                    className="h-7 w-7 rounded-full ring-1 ring-white/25"
                    style={{ background: f.hex }}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* Bloco de confiança: as três dúvidas que travam a compra */}
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { t: 'Garantia de 3 dias', d: 'Chegou com defeito, a gente refaz ou devolve o dinheiro.' },
              { t: 'Frete grátis', d: `Em pedidos acima de ${brl(150)} para todo o Brasil.` },
              { t: 'Prazo honesto', d: 'Cada peça mostra em quantos dias fica pronta, antes de você pagar.' },
            ].map((b) => (
              <li key={b.t} className="rounded-peca bg-white/[.07] p-5">
                <p className="font-display font-bold tracking-aperto">{b.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-giz">{b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Categorias — cada uma com a sua cor do espectro
      ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          O que a gente imprime
        </h2>
        <p className="mt-2 text-noite/65">
          Cada categoria tem a sua cor. Ela acompanha você pelo site inteiro.
        </p>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/produtos?categoria=${c.slug}`}
                className="group flex h-full flex-col justify-between rounded-peca p-6 transition-transform active:scale-[.99]"
                style={{ background: `${c.cor}1F` }}
              >
                <div>
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: c.cor }}
                  />
                  <h3 className="mt-3 text-xl font-bold group-hover:underline">
                    {c.nome}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-noite/70">
                    {c.chamada}
                  </p>
                </div>
                <p className="mt-6 text-sm font-semibold text-noite/75">
                  A partir de {brl(c.precoDe)} · {c.prazoDias[0]} a {c.prazoDias[1]} dias
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------
          Mais vendidos
      ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Mais vendidos</h2>
          <Link href="/produtos" className="font-semibold underline">
            Ver tudo
          </Link>
        </div>

        <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((p) => (
            <li key={p.id}>
              <CardProduto p={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------
          Como funciona — aqui a numeração faz sentido, é uma sequência
      ---------------------------------------------------------------- */}
      <section className="bg-noite text-folha">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Do pedido até a sua mão
          </h2>

          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Escolha a peça e a cor', d: 'As 12 cores estão em estoque. A que você marcar é a que entra na máquina.' },
              { t: 'A impressão começa', d: 'Nada fica parado esperando comprador. A sua peça nasce depois do pedido.' },
              { t: 'Conferência', d: 'Cada peça é olhada antes de embalar. Se saiu torta, ela não é enviada.' },
              { t: 'Envio com rastreio', d: 'Você recebe o código e acompanha até a porta de casa.' },
            ].map((p, i) => (
              <li key={p.t}>
                <span className="font-display text-3xl font-extrabold tracking-aperto text-espectro-organizacao">
                  {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold">{p.t}</h3>
                <p className="mt-1.5 leading-relaxed text-giz">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Garantia, dita em uma frase
      ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="rounded-peca bg-espectro-organizacao/12 p-8 sm:p-12">
          <h2 className="max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Chegou com defeito? Você tem 3 dias e a gente resolve.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-noite/75">
            Abra o chamado aqui mesmo no site, com uma foto. A gente responde em
            até 24 horas e escolhe com você: imprimir de novo ou devolver o
            dinheiro. Sem precisar discutir.
          </p>
          <Link
            href="/garantia"
            className="mt-7 inline-block rounded-peca bg-noite px-7 py-3.5 font-bold text-folha"
          >
            Ler a garantia
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          Instagram
      ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-nevoa pt-10">
          <div>
            <h2 className="text-2xl font-extrabold">
              As peças novas saem primeiro no Instagram
            </h2>
            <p className="mt-1.5 text-noite/65">
              Modelo novo, cor nova e promoção aparecem lá antes de entrar aqui.
            </p>
          </div>
          <a
            href={`https://instagram.com/${instagram}`}
            className="rounded-peca border border-noite px-6 py-3 font-semibold"
          >
            Seguir @{instagram}
          </a>
        </div>
      </section>
    </main>
  )
}
