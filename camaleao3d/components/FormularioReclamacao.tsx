'use client'

import { useState } from 'react'

type Estado = 'parado' | 'enviando' | 'enviado' | 'erro'

const problemas = [
  'Peça quebrada ou trincada',
  'Peça chegou torta ou deformada',
  'Cor errada',
  'Personalização errada',
  'Peça faltando no pacote',
  'Outro',
]

export default function FormularioReclamacao() {
  const [estado, setEstado] = useState<Estado>('parado')
  const [protocolo, setProtocolo] = useState('')

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEstado('enviando')
    const dados = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const r = await fetch('/api/reclamacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      })
      if (!r.ok) throw new Error()
      const json = await r.json()
      setProtocolo(json.protocolo)
      setEstado('enviado')
    } catch {
      setEstado('erro')
    }
  }

  if (estado === 'enviado') {
    return (
      <div className="rounded-peca bg-espectro-organizacao/15 p-8">
        <h3 className="font-display text-xl font-bold tracking-aperto">
          Chamado aberto
        </h3>
        <p className="mt-2 leading-relaxed text-noite/80">
          Seu protocolo é <strong className="font-mono">{protocolo}</strong>.
          Guarde esse número. Respondemos em até 24 horas no e-mail que você
          informou.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Campo nome="pedido" rotulo="Número do pedido" obrigatorio placeholder="Ex.: 1042" />
        <Campo nome="email" rotulo="Seu e-mail" tipo="email" obrigatorio placeholder="voce@email.com" />
      </div>

      <div>
        <label htmlFor="problema" className="font-semibold">
          O que aconteceu
        </label>
        <select
          id="problema"
          name="problema"
          required
          className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
        >
          {problemas.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="descricao" className="font-semibold">
          Conte com as suas palavras
        </label>
        <p className="mt-1 text-sm text-noite/60">
          Quanto mais detalhe, mais rápido a gente resolve.
        </p>
        <textarea
          id="descricao"
          name="descricao"
          required
          rows={5}
          placeholder="A peça chegou com uma trinca na base, do lado direito."
          className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="foto" className="font-semibold">
          Link da foto
        </label>
        <p className="mt-1 text-sm text-noite/60">
          Se preferir, mande a foto direto no WhatsApp com o número do
          protocolo.
        </p>
        <input
          id="foto"
          name="foto"
          type="url"
          placeholder="https://..."
          className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
        />
      </div>

      <div>
        <p className="font-semibold">O que você prefere</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {['Imprimir de novo', 'Dinheiro de volta'].map((o, i) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-3 rounded-peca border border-nevoa bg-white px-4 py-3 has-[:checked]:border-noite"
            >
              <input
                type="radio"
                name="solucao"
                value={o}
                defaultChecked={i === 0}
                className="accent-noite"
              />
              {o}
            </label>
          ))}
        </div>
      </div>

      {estado === 'erro' && (
        <p className="rounded-peca bg-espectro-cafe/15 px-4 py-3 text-sm">
          O envio não completou. Tente de novo ou chame no WhatsApp.
        </p>
      )}

      <button
        disabled={estado === 'enviando'}
        className="rounded-peca bg-noite px-8 py-4 font-bold text-folha disabled:opacity-50"
      >
        {estado === 'enviando' ? 'Enviando...' : 'Abrir chamado'}
      </button>
    </form>
  )
}

function Campo({
  nome,
  rotulo,
  tipo = 'text',
  obrigatorio,
  placeholder,
}: {
  nome: string
  rotulo: string
  tipo?: string
  obrigatorio?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={nome} className="font-semibold">
        {rotulo}
      </label>
      <input
        id={nome}
        name={nome}
        type={tipo}
        required={obrigatorio}
        placeholder={placeholder}
        className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
      />
    </div>
  )
}
