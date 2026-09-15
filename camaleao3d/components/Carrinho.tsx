'use client'

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { brl } from '@/lib/catalogo'

export type ItemCarrinho = {
  id: string
  slug: string
  nome: string
  preco: number
  cor: string
  corHex: string
  personalizacao?: string
  qtd: number
}

type Acao =
  | { tipo: 'adicionar'; item: ItemCarrinho }
  | { tipo: 'remover'; chave: string }
  | { tipo: 'quantidade'; chave: string; qtd: number }
  | { tipo: 'limpar' }

const chaveDoItem = (i: ItemCarrinho) =>
  `${i.slug}__${i.cor}__${i.personalizacao ?? ''}`

function redutor(estado: ItemCarrinho[], acao: Acao): ItemCarrinho[] {
  switch (acao.tipo) {
    case 'adicionar': {
      const chave = chaveDoItem(acao.item)
      const existe = estado.find((i) => chaveDoItem(i) === chave)
      if (existe) {
        return estado.map((i) =>
          chaveDoItem(i) === chave ? { ...i, qtd: i.qtd + acao.item.qtd } : i
        )
      }
      return [...estado, acao.item]
    }
    case 'remover':
      return estado.filter((i) => chaveDoItem(i) !== acao.chave)
    case 'quantidade':
      return estado
        .map((i) =>
          chaveDoItem(i) === acao.chave ? { ...i, qtd: Math.max(0, acao.qtd) } : i
        )
        .filter((i) => i.qtd > 0)
    case 'limpar':
      return []
  }
}

type Ctx = {
  itens: ItemCarrinho[]
  adicionar: (i: ItemCarrinho) => void
  remover: (chave: string) => void
  mudarQtd: (chave: string, qtd: number) => void
  limpar: () => void
  total: number
  quantidade: number
  abrir: () => void
  fechar: () => void
  aberto: boolean
}

const CarrinhoCtx = createContext<Ctx | null>(null)

export function useCarrinho() {
  const ctx = useContext(CarrinhoCtx)
  if (!ctx)
    throw new Error('useCarrinho precisa estar dentro de <CarrinhoProvider>')
  return ctx
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, despachar] = useReducer(redutor, [])
  const [aberto, setAberto] = useState(false)

  const valor = useMemo<Ctx>(
    () => ({
      itens,
      adicionar: (item) => {
        despachar({ tipo: 'adicionar', item })
        setAberto(true)
      },
      remover: (chave) => despachar({ tipo: 'remover', chave }),
      mudarQtd: (chave, qtd) => despachar({ tipo: 'quantidade', chave, qtd }),
      limpar: () => despachar({ tipo: 'limpar' }),
      total: itens.reduce((s, i) => s + i.preco * i.qtd, 0),
      quantidade: itens.reduce((s, i) => s + i.qtd, 0),
      abrir: () => setAberto(true),
      fechar: () => setAberto(false),
      aberto,
    }),
    [itens, aberto]
  )

  return (
    <CarrinhoCtx.Provider value={valor}>
      {children}
      <Gaveta />
    </CarrinhoCtx.Provider>
  )
}

const FRETE_GRATIS = 150

function Gaveta() {
  const { itens, aberto, fechar, remover, mudarQtd, total } = useCarrinho()
  if (!aberto) return null

  const faltaParaFrete = FRETE_GRATIS - total

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Fechar carrinho"
        onClick={fechar}
        className="absolute inset-0 bg-noite/50"
      />
      <aside className="animate-entrar relative flex h-full w-full max-w-md flex-col bg-folha shadow-2xl">
        <header className="flex items-center justify-between border-b border-nevoa px-5 py-4">
          <h2 className="font-display text-lg font-bold tracking-aperto">
            Seu carrinho
          </h2>
          <button
            onClick={fechar}
            className="rounded-full px-2 py-1 text-2xl leading-none hover:bg-nevoa"
            aria-label="Fechar"
          >
            ×
          </button>
        </header>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-lg font-bold tracking-aperto">
              Ainda não tem nada aqui
            </p>
            <p className="mt-2 text-sm text-noite/60">
              Escolha uma peça e a cor do filamento. A impressão começa depois
              do pedido.
            </p>
            <Link
              href="/produtos"
              onClick={fechar}
              className="mt-6 rounded-peca bg-noite px-6 py-3 font-semibold text-folha"
            >
              Ver o catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-nevoa overflow-y-auto px-5">
              {itens.map((i) => {
                const chave = chaveDoItem(i)
                return (
                  <li key={chave} className="flex gap-4 py-4">
                    <span
                      className="mt-1 h-11 w-11 shrink-0 rounded-peca border border-nevoa"
                      style={{ background: i.corHex }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-snug">{i.nome}</p>
                      <p className="mt-0.5 text-sm text-noite/60">
                        Cor {i.cor.toLowerCase()}
                        {i.personalizacao && ` · “${i.personalizacao}”`}
                      </p>

                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex items-center rounded-peca border border-nevoa">
                          <button
                            onClick={() => mudarQtd(chave, i.qtd - 1)}
                            className="px-2.5 py-1 text-lg leading-none hover:bg-nevoa"
                            aria-label="Diminuir"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center text-sm">
                            {i.qtd}
                          </span>
                          <button
                            onClick={() => mudarQtd(chave, i.qtd + 1)}
                            className="px-2.5 py-1 text-lg leading-none hover:bg-nevoa"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remover(chave)}
                          className="text-sm text-noite/50 underline hover:text-noite"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 font-semibold">
                      {brl(i.preco * i.qtd)}
                    </p>
                  </li>
                )
              })}
            </ul>

            <footer className="border-t border-nevoa px-5 py-5">
              {faltaParaFrete > 0 ? (
                <p className="mb-3 rounded-peca bg-espectro-organizacao/10 px-3 py-2 text-sm text-noite/75">
                  Faltam <strong>{brl(faltaParaFrete)}</strong> para o frete
                  sair de graça.
                </p>
              ) : (
                <p className="mb-3 rounded-peca bg-espectro-organizacao/15 px-3 py-2 text-sm font-semibold text-noite/80">
                  Frete grátis liberado.
                </p>
              )}

              <div className="flex items-baseline justify-between">
                <span className="text-noite/60">Total</span>
                <span className="font-display text-2xl font-bold tracking-aperto">
                  {brl(total)}
                </span>
              </div>
              <p className="mt-1 text-sm text-noite/55">
                No PIX ou em até 3x sem juros no cartão.
              </p>

              <Link
                href="/carrinho"
                onClick={fechar}
                className="mt-4 block rounded-peca bg-noite py-3.5 text-center font-semibold text-folha transition-transform active:scale-[.99]"
              >
                Fechar pedido
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

export function BotaoCarrinho() {
  const { quantidade, abrir } = useCarrinho()
  return (
    <button
      onClick={abrir}
      className="relative flex items-center gap-2 rounded-peca px-3 py-2 text-sm font-semibold hover:bg-white/10"
    >
      Carrinho
      {quantidade > 0 && (
        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-espectro-festa px-1 text-xs font-bold text-noite">
          {quantidade}
        </span>
      )}
    </button>
  )
}
