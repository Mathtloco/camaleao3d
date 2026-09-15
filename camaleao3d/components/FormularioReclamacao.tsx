'use client'

import { useState } from 'react'
import { WHATSAPP } from '@/lib/contato'

/**
 * Abertura de chamado de garantia pelo WhatsApp.
 *
 * O site é publicado como arquivo estático, sem servidor, então não há
 * para onde um formulário enviar. Em vez de um formulário que falha,
 * montamos a reclamação como mensagem pronta: o cliente confere,
 * aperta enviar e a conversa começa com tudo já escrito.
 */

const problemas = [
  'Peça quebrada ou trincada',
  'Peça chegou torta ou deformada',
  'Cor errada',
  'Personalização errada',
  'Peça faltando no pacote',
  'Outro',
]

export default function FormularioReclamacao() {
  const [pedido, setPedido] = useState('')
  const [problema, setProblema] = useState(problemas[0])
  const [descricao, setDescricao] = useState('')
  const [solucao, setSolucao] = useState('Imprimir de novo')

  const pronto = pedido.trim() !== '' && descricao.trim() !== ''

  function enviar() {
    const msg = [
      'Olá! Preciso abrir um chamado de garantia.',
      '',
      `Pedido: ${pedido}`,
      `Problema: ${problema}`,
      '',
      descricao,
      '',
      `O que eu prefiro: ${solucao.toLowerCase()}`,
      '',
      '(vou mandar a foto em seguida)',
    ].join('\n')

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  return (
    <div className="grid gap-5">
      <div>
        <label htmlFor="pedido" className="font-semibold">
          Número do pedido
        </label>
        <p className="mt-1 text-sm text-noite/60">
          Está na conversa em que você fez a compra. Se não achar, escreva a
          data.
        </p>
        <input
          id="pedido"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
          placeholder="Ex.: 1042"
          className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="problema" className="font-semibold">
          O que aconteceu
        </label>
        <select
          id="problema"
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
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
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={5}
          placeholder="A peça chegou com uma trinca na base, do lado direito."
          className="mt-2 w-full rounded-peca border border-nevoa bg-white px-4 py-3"
        />
      </div>

      <div>
        <p className="font-semibold">O que você prefere</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {['Imprimir de novo', 'Dinheiro de volta'].map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-3 rounded-peca border border-nevoa bg-white px-4 py-3 has-[:checked]:border-noite"
            >
              <input
                type="radio"
                name="solucao"
                value={o}
                checked={solucao === o}
                onChange={() => setSolucao(o)}
                className="accent-noite"
              />
              {o}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={enviar}
        disabled={!pronto}
        className="rounded-peca bg-[#25D366] px-8 py-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pronto ? 'Abrir chamado no WhatsApp' : 'Preencha o pedido e a descrição'}
      </button>

      <p className="text-sm leading-relaxed text-noite/60">
        A conversa abre com tudo já escrito. É só apertar enviar e mandar a foto
        do problema em seguida. Respondemos em até 24 horas.
      </p>
    </div>
  )
}
