import Link from 'next/link'

export const metadata = { title: 'Sobre' }

export default function Sobre() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <Link href="/" className="text-sm underline">
        Camaleão3D
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold tracking-aperto sm:text-5xl">
        Uma impressora, uma casa, uma peça por vez.
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-casca/80">
        <p>
          A Camaleão3D começou pequena, do jeito que quase tudo começa: uma
          impressora, muita tentativa e algumas peças jogadas fora até acertar.
        </p>
        <p>
          O nome veio da escolha que define o que fazemos. Camaleão muda de cor
          sem pintar nada, e é assim que as nossas peças saem: a cor está no
          próprio filamento, dentro do material. Não existe tinta por cima para
          lascar no bolso da calça ou desbotar no sol do painel do carro.
        </p>
        <p>
          Nada fica parado em estoque. Sua peça começa a ser impressa depois que
          você pede, e leva de duas a doze horas dependendo do tamanho. É mais
          demorado que buscar na prateleira, e é por isso que cada uma sai do
          jeito que você escolheu.
        </p>
      </div>

      <p className="mt-10">
        <Link href="/produtos" className="font-semibold underline">
          Ver o catálogo
        </Link>
      </p>
    </main>
  )
}
