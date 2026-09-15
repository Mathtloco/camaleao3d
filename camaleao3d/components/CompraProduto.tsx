'use client'

import { useState } from 'react'
import { useCarrinho } from './Carrinho'
import { filamentos, brl, type Produto } from '@/lib/catalogo'

export default function CompraProduto({ p }: { p: Produto }) {
  const { adicionar } = useCarrinho()
  const [cor, setCor] = useState(filamentos[0])
  const [texto, setTexto] = useState('')
  const [qtd, setQtd] = useState(1)

  const faltaTexto = p.personalizavel && texto.trim().length === 0

  return (
    <div>
      {/* Cor do filamento — o que mais decide a compra */}
      <fieldset className="mt-8">
        <legend className="font-semibold">
          Cor do filamento:{' '}
          <span className="font-normal text-noite/65">{cor.nome}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {filamentos.map((f) => {
            const ativo = f.nome === cor.nome
            return (
              <button
                key={f.nome}
                onClick={() => setCor(f)}
                title={f.nome}
                aria-label={`Cor ${f.nome}`}
                aria-pressed={ativo}
                className={`h-10 w-10 rounded-full ring-1 ring-nevoa transition-transform ${
                  ativo ? 'scale-110 ring-2 ring-noite' : 'hover:scale-105'
                }`}
                style={{ background: f.hex }}
              />
            )
          })}
        </div>
      </fieldset>

      {/* Personalização */}
      {p.personalizavel && (
        <div className="mt-7">
          <label htmlFor="personalizacao" className="font-semibold">
            O que escrever na peça
          </label>
          <p className="mt-1 text-sm text-noite/60">
            Nome, idade ou frase curta. Até 20 caracteres.
          </p>
          <input
            id="personalizacao"
            value={texto}
            onChange={(e) => setTexto(e.target.value.slice(0, 20))}
            placeholder="Ex.: Helena, 5 anos"
            className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
          />
          <p className="mt-1 text-right text-xs text-noite/50">
            {texto.length}/20
          </p>
        </div>
      )}

      {/* Quantidade e compra */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-peca border border-nevoa">
          <button
            onClick={() => setQtd((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-xl leading-none hover:bg-nevoa"
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span className="min-w-8 text-center font-semibold">{qtd}</span>
          <button
            onClick={() => setQtd((q) => q + 1)}
            className="px-4 py-3 text-xl leading-none hover:bg-nevoa"
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>

        <button
          disabled={faltaTexto}
          onClick={() =>
            adicionar({
              id: p.id,
              slug: p.slug,
              nome: p.nome,
              preco: p.preco,
              cor: cor.nome,
              corHex: cor.hex,
              personalizacao: texto.trim() || undefined,
              qtd,
            })
          }
          className="flex-1 rounded-peca bg-noite px-8 py-4 font-bold text-folha transition-transform active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {faltaTexto
            ? 'Escreva o texto da peça'
            : `Adicionar · ${brl(p.preco * qtd)}`}
        </button>
      </div>

      <p className="mt-4 text-sm text-noite/60">
        No PIX ou em até 3x sem juros. Frete grátis acima de {brl(150)}.
      </p>
    </div>
  )
}
