'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCarrinho } from '@/components/Carrinho'
import CheckoutWhatsapp from '@/components/CheckoutWhatsapp'
import { brl } from '@/lib/catalogo'

const FRETE_GRATIS = 150

export default function PaginaCarrinho() {
  const { itens, total, mudarQtd, remover } = useCarrinho()
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState<number | null>(null)

  // Estimativa por região enquanto os Correios não estão integrados.
  function calcularFrete() {
    const limpo = cep.replace(/\D/g, '')
    if (limpo.length !== 8) return
    if (total >= FRETE_GRATIS) return setFrete(0)
    const regiao = Number(limpo[0])
    setFrete(regiao <= 1 ? 18.9 : regiao <= 3 ? 24.9 : 32.9)
  }

  if (itens.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-3xl font-extrabold">Seu carrinho está vazio</h1>
        <p className="mt-3 text-noite/65">
          Escolha uma peça e a cor do filamento para começar.
        </p>
        <Link
          href="/produtos"
          className="mt-8 inline-block rounded-peca bg-noite px-7 py-3.5 font-bold text-folha"
        >
          Ver o catálogo
        </Link>
      </main>
    )
  }

  const totalFinal = total + (frete ?? 0)

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
      <h1 className="text-4xl font-extrabold">Fechar pedido</h1>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-nevoa border-y border-nevoa">
          {itens.map((i) => {
            const chave = `${i.slug}__${i.cor}__${i.personalizacao ?? ''}`
            return (
              <li key={chave} className="flex gap-4 py-5">
                <span
                  className="h-20 w-20 shrink-0 rounded-peca border border-nevoa"
                  style={{ background: i.corHex }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{i.nome}</p>
                  <p className="mt-0.5 text-sm text-noite/60">
                    Cor {i.cor.toLowerCase()}
                    {i.personalizacao && ` · “${i.personalizacao}”`}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center rounded-peca border border-nevoa">
                      <button onClick={() => mudarQtd(chave, i.qtd - 1)} className="px-3 py-1.5 text-lg leading-none hover:bg-nevoa" aria-label="Diminuir">−</button>
                      <span className="min-w-7 text-center text-sm">{i.qtd}</span>
                      <button onClick={() => mudarQtd(chave, i.qtd + 1)} className="px-3 py-1.5 text-lg leading-none hover:bg-nevoa" aria-label="Aumentar">+</button>
                    </div>
                    <button onClick={() => remover(chave)} className="text-sm text-noite/50 underline hover:text-noite">
                      Remover
                    </button>
                  </div>
                </div>
                <p className="shrink-0 font-semibold">{brl(i.preco * i.qtd)}</p>
              </li>
            )
          })}
        </ul>

        <aside className="h-fit rounded-peca bg-nevoa/45 p-6">
          <h2 className="font-display text-lg font-bold tracking-aperto">Resumo</h2>

          <div className="mt-4">
            <label htmlFor="cep" className="text-sm font-semibold">
              Calcular o frete
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="cep"
                value={cep}
                onChange={(e) => setCep(e.target.value.slice(0, 9))}
                onKeyDown={(e) => e.key === 'Enter' && calcularFrete()}
                placeholder="00000-000"
                inputMode="numeric"
                className="w-full rounded-peca border border-nevoa bg-white px-3 py-2.5"
              />
              <button
                onClick={calcularFrete}
                className="shrink-0 rounded-peca border border-noite px-4 font-semibold"
              >
                Ver
              </button>
            </div>
          </div>

          <dl className="mt-6 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-noite/65">Subtotal</dt>
              <dd>{brl(total)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-noite/65">Frete</dt>
              <dd>
                {frete === null ? '—' : frete === 0 ? 'Grátis' : brl(frete)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between border-t border-nevoa pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-display text-2xl font-bold tracking-aperto">
              {brl(totalFinal)}
            </span>
          </div>
          <p className="mt-1 text-sm text-noite/60">
            Ou 3x de {brl(totalFinal / 3)} sem juros.
          </p>

          <div className="mt-6">
            <CheckoutWhatsapp frete={frete} />
          </div>
        </aside>
      </div>
    </main>
  )
}
