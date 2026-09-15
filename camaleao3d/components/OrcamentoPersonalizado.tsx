import { WHATSAPP } from '@/lib/contato'

export default function OrcamentoPersonalizado() {
  const mensagem = encodeURIComponent(
    'Olá! Não achei no catálogo a peça que eu queria. Pode me ajudar com um orçamento personalizado?'
  )

  return (
    <div className="mt-14 flex flex-col items-start gap-5 rounded-peca border border-nevoa bg-white p-7 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold">Não achou o que queria?</h2>
        <p className="mt-1.5 max-w-md leading-relaxed text-noite/70">
          A gente também modela peça personalizada. Manda a ideia — ou uma
          foto de referência — e te passamos o orçamento pelo WhatsApp.
        </p>
      </div>
      <a
        href={`https://wa.me/${WHATSAPP}?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-peca bg-[#25D366] px-6 py-3.5 text-center text-sm font-bold text-white transition-transform active:scale-[.99]"
      >
        Converse conosco
      </a>
    </div>
  )
}
