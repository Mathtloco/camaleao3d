'use client'

import { useState } from 'react'
import { useCarrinho } from './Carrinho'
import { brl } from '@/lib/catalogo'
import { WHATSAPP, PIX } from '@/lib/contato'

export default function CheckoutWhatsapp({ frete }: { frete: number | null }) {
  const { itens, total } = useCarrinho()
  const [nome, setNome] = useState('')
  const [cep, setCep] = useState('')
  const [copiado, setCopiado] = useState(false)

  const totalFinal = total + (frete ?? 0)

  // Monta o pedido como texto para o WhatsApp.
  // O cliente só aperta enviar: chega tudo escrito e conferido.
  function montarMensagem() {
    const linhas = itens.map(
      (i) =>
        `• ${i.qtd}x ${i.nome} — cor ${i.cor.toLowerCase()}` +
        (i.personalizacao ? ` — escrito: "${i.personalizacao}"` : '') +
        ` — ${brl(i.preco * i.qtd)}`
    )

    return [
      'Olá! Quero fazer este pedido na Camaleão3D:',
      '',
      ...linhas,
      '',
      `Subtotal: ${brl(total)}`,
      frete !== null ? `Frete: ${frete === 0 ? 'grátis' : brl(frete)}` : null,
      `Total: ${brl(totalFinal)}`,
      '',
      nome ? `Nome: ${nome}` : null,
      cep ? `CEP: ${cep}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  function enviar() {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(montarMensagem())}`
    window.open(url, '_blank')
  }

  async function copiarPix() {
    await navigator.clipboard.writeText(PIX)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  return (
    <div>
      <div className="grid gap-3">
        <div>
          <label htmlFor="nome" className="text-sm font-semibold">
            Seu nome
          </label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como te chamar"
            className="mt-1.5 w-full rounded-peca border border-nevoa bg-white px-3 py-2.5"
          />
        </div>
        <div>
          <label htmlFor="cepEntrega" className="text-sm font-semibold">
            CEP de entrega
          </label>
          <input
            id="cepEntrega"
            value={cep}
            onChange={(e) => setCep(e.target.value.slice(0, 9))}
            placeholder="00000-000"
            inputMode="numeric"
            className="mt-1.5 w-full rounded-peca border border-nevoa bg-white px-3 py-2.5"
          />
        </div>
      </div>

      <button
        onClick={enviar}
        className="mt-5 w-full rounded-peca bg-[#25D366] py-4 font-bold text-white transition-transform active:scale-[.99]"
      >
        Enviar pedido pelo WhatsApp
      </button>

      <p className="mt-2.5 text-center text-xs leading-relaxed text-noite/60">
        O pedido vai escrito e conferido. A gente confirma o prazo e manda o
        PIX. A impressão começa depois do pagamento.
      </p>

      {PIX && (
        <div className="mt-5 rounded-peca bg-white p-4">
          <p className="text-sm font-semibold">Pagar no PIX</p>
          <p className="mt-1 break-all font-mono text-sm text-noite/70">
            {PIX}
          </p>
          <button
            onClick={copiarPix}
            className="mt-3 w-full rounded-peca border border-noite py-2.5 text-sm font-semibold"
          >
            {copiado ? 'Chave copiada' : 'Copiar chave PIX'}
          </button>
        </div>
      )}
    </div>
  )
}
