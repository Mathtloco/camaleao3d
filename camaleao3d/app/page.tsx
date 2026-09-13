import Link from 'next/link'
import { nichos, brl } from '@/lib/nichos'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || ''
const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || 'camaleao3d'

function FaixaEspectro() {
  // A virada de cor do camaleão. Marca o fim de cada bloco.
  return (
    <div className="flex h-1 w-full" aria-hidden="true">
      <div className="w-1/3 bg-musgo" />
      <div className="w-1/3 bg-ambar" />
      <div className="w-1/3 bg-coral" />
    </div>
  )
}

export default function Home() {
  return (
    <main>
      {/* Topo */}
      <header className="bg-casca text-placa">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <span className="text-lg font-extrabold tracking-aperto">
            Camaleão3D
          </span>
          <div className="flex gap-6 text-sm">
            <Link href="/produtos" className="hover:text-musgo">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-musgo">
              Sobre
            </Link>
            <a
              href={`https://instagram.com/${instagram}`}
              className="hover:text-musgo"
            >
              Instagram
            </a>
          </div>
        </nav>

        {/* Hero — a textura são as linhas de camada que a impressora deixa */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-camadas" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-12 sm:pb-28 sm:pt-20">
            <h1 className="max-w-3xl text-[2.75rem] font-extrabold leading-[0.95] tracking-aperto sm:text-7xl">
              A cor já vem dentro da peça.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-placaEscura">
              Nada aqui é pintado. Cada peça sai da impressora na cor final,
              então não lasca, não descasca e não sai na mão. Feito uma a uma,
              no Brasil.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="bg-musgo px-6 py-3 font-semibold text-casca transition-colors hover:bg-ambar"
              >
                Ver o catálogo
              </Link>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  className="border border-placaEscura px-6 py-3 font-semibold text-placa transition-colors hover:border-musgo hover:text-musgo"
                >
                  Encomendar pelo WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
        <FaixaEspectro />
      </header>

      {/* Nichos */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <h2 className="text-3xl font-extrabold tracking-aperto sm:text-4xl">
          O que a gente imprime
        </h2>

        <ul className="mt-10 divide-y divide-placaEscura border-y border-placaEscura">
          {nichos.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/produtos?nicho=${n.slug}`}
                className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-10"
              >
                <div>
                  <h3 className="text-xl font-bold tracking-aperto group-hover:text-musgo">
                    {n.nome}
                  </h3>
                  <p className="mt-1.5 max-w-lg leading-relaxed text-casca/70">
                    {n.resumo}
                  </p>
                  <p className="mt-3 text-sm text-casca/55">
                    {n.exemplos.join(' · ')}
                  </p>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-semibold">
                    {brl(n.precoMin)} a {brl(n.precoMax)}
                  </p>
                  <p className="mt-1 text-casca/55">
                    {n.horasMin}–{n.horasMax} h de impressão
                  </p>
                  <p className="text-casca/55">{n.material}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Como funciona — aqui a numeração faz sentido, é uma sequência */}
      <section className="bg-casca text-placa">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <h2 className="text-3xl font-extrabold tracking-aperto sm:text-4xl">
            Como chega até você
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                t: 'Você escolhe a cor',
                d: 'Cada modelo tem as cores de filamento disponíveis. O que você escolher é o que sai da máquina.',
              },
              {
                t: 'A peça é impressa',
                d: 'Nada fica pronto em estoque esperando. A impressão começa depois do seu pedido e leva de 2 a 12 horas.',
              },
              {
                t: 'Sai para entrega',
                d: 'Enviamos para todo o Brasil pelos Correios ou por entrega local, com o código de rastreio.',
              },
            ].map((p, i) => (
              <li key={p.t}>
                <span className="block text-sm font-bold text-musgo">
                  Passo {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-aperto">
                  {p.t}
                </h3>
                <p className="mt-2 leading-relaxed text-placaEscura">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
        <FaixaEspectro />
      </section>

      {/* Rodapé */}
      <footer className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-2xl font-extrabold tracking-aperto">Camaleão3D</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href={`https://instagram.com/${instagram}`} className="underline">
            @{instagram}
          </a>
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} className="underline">
              WhatsApp
            </a>
          )}
          <Link href="/produtos" className="underline">
            Produtos
          </Link>
          <Link href="/sobre" className="underline">
            Sobre
          </Link>
        </div>
        <p className="mt-8 text-sm text-casca/55">
          Impresso sob encomenda no Brasil.
        </p>
      </footer>
    </main>
  )
}
