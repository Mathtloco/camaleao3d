import FormularioReclamacao from '@/components/FormularioReclamacao'

export const metadata = {
  title: 'Garantia',
  description:
    'Chegou com defeito? Você tem 3 dias para abrir um chamado. A gente imprime de novo ou devolve o dinheiro.',
}

export default function Garantia() {
  return (
    <main>
      <section className="bg-noite text-folha">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Chegou com defeito? A gente resolve em 3 dias.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-giz">
            Cada peça é conferida antes de sair daqui, mas impressão 3D às vezes
            falha e transporte é transporte. Se acontecer, você não precisa
            discutir com ninguém.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="text-2xl font-extrabold">Como funciona</h2>

        <ol className="mt-7 space-y-7">
          {[
            { t: 'Você tem 3 dias corridos', d: 'Contados a partir do dia em que o pedido chegou, segundo o rastreio dos Correios.' },
            { t: 'Abra o chamado aqui embaixo', d: 'Com o número do pedido e uma foto do problema. Leva um minuto.' },
            { t: 'Respondemos em até 24 horas', d: 'E você escolhe: imprimimos outra na hora ou devolvemos o dinheiro pelo PIX.' },
            { t: 'Não precisa devolver a peça', d: 'Na maior parte dos casos o frete de volta custa mais que a peça. Fique com ela.' },
          ].map((p, i) => (
            <li key={p.t} className="flex gap-5">
              <span className="font-display text-2xl font-extrabold tracking-aperto text-espectro-organizacao">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{p.t}</h3>
                <p className="mt-1 leading-relaxed text-noite/75">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-peca border border-nevoa p-6">
          <h2 className="text-lg font-bold">O que a garantia cobre</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-semibold text-espectro-organizacao">Cobre</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-noite/75">
                <li>Peça quebrada ou trincada na chegada</li>
                <li>Peça torta, com falha de camada ou mal formada</li>
                <li>Cor diferente da que você pediu</li>
                <li>Nome ou texto impresso errado</li>
                <li>Item faltando no pacote</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-espectro-cafe">Não cobre</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-noite/75">
                <li>Quebra por queda ou uso depois de recebida</li>
                <li>Peça deixada no sol ou dentro do carro fechado</li>
                <li>Arrependimento depois dos 3 dias</li>
                <li>Personalização que você digitou errado no pedido</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-noite/65">
            Fora da garantia, valem os 7 dias de arrependimento do Código de
            Defesa do Consumidor para compras online. Peças personalizadas com
            nome são feitas só para você, então esse prazo não se aplica a elas.
          </p>
        </div>
      </section>

      <section id="reclamacao" className="border-t border-nevoa bg-nevoa/30">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <h2 className="text-3xl font-extrabold">Abrir um chamado</h2>
          <p className="mt-2 text-noite/70">
            Preencha e você recebe um número de protocolo na hora.
          </p>
          <div className="mt-8">
            <FormularioReclamacao />
          </div>
        </div>
      </section>
    </main>
  )
}
