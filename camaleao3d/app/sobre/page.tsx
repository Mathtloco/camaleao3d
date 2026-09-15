import Link from 'next/link'
import { Simbolo } from '@/components/Logo'

export const metadata = {
  title: 'Quem somos',
  description:
    'A Camaleão3D imprime peça por peça, sob encomenda, na cor que você escolher.',
}

export default function Sobre() {
  return (
    <main>
      <section className="bg-noite text-folha">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <Simbolo className="h-14 w-14 text-espectro-organizacao" />
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
            Uma impressora, uma casa, uma peça por vez.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-14">
        <div className="space-y-5 text-lg leading-relaxed text-noite/80">
          <p>
            A Camaleão3D começou pequena, do jeito que quase tudo começa: uma
            impressora em casa, muita tentativa e umas quantas peças que foram
            direto para o lixo até a coisa começar a sair certa.
          </p>
          <p>
            O nome veio da escolha que define o que fazemos. O camaleão muda de
            cor sem pintar nada, e é assim que as nossas peças saem: a cor está
            no próprio filamento, dentro do material. Não existe tinta por cima
            para lascar no fundo da bolsa ou desbotar no sol do painel.
          </p>
          <p>
            Nada fica parado em estoque esperando comprador. A sua peça começa a
            ser impressa depois que você pede e leva de duas a doze horas na
            máquina, dependendo do tamanho. É mais demorado que tirar da
            prateleira, e é exatamente por isso que cada uma sai do jeito que
            você escolheu.
          </p>
          <p>
            Antes de embalar, cada peça é olhada de perto. Se saiu torta, com
            falha de camada ou com a cor errada, ela não é enviada — vai para a
            fila de reimpressão. E se mesmo assim algo passar, a{' '}
            <Link href="/garantia" className="font-semibold underline">
              garantia de 3 dias
            </Link>{' '}
            existe para isso.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { n: 'Sob encomenda', d: 'Sem estoque parado, sem sobra jogada fora' },
            { n: '12 cores', d: 'Todas disponíveis na hora do pedido' },
            { n: 'Brasil inteiro', d: 'Envio com rastreio pelos Correios' },
          ].map((b) => (
            <div key={b.n} className="rounded-peca bg-nevoa/45 p-5">
              <p className="font-display font-bold tracking-aperto">{b.n}</p>
              <p className="mt-1 text-sm leading-relaxed text-noite/70">{b.d}</p>
            </div>
          ))}
        </div>

        <Link
          href="/produtos"
          className="mt-12 inline-block rounded-peca bg-noite px-7 py-3.5 font-bold text-folha"
        >
          Ver o catálogo
        </Link>
      </section>
    </main>
  )
}
