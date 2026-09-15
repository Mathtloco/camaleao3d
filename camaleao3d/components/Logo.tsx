/**
 * Logo Camaleão3D
 *
 * A marca é a espiral do rabo do camaleão — que é também o caminho
 * que o bico da impressora faz numa peça em espiral. Dois significados
 * no mesmo desenho, e é por isso que ela é feita de linhas soltas:
 * são as camadas da impressão.
 *
 * Funciona em qualquer tamanho. No celular usamos só o símbolo.
 */

export function Simbolo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      role="img"
      aria-label="Camaleão3D"
    >
      {/* espiral do rabo, desenhada em camadas */}
      <path
        d="M20 4c-8.8 0-16 7.2-16 16s7.2 16 16 16"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M20 36c6 0 11-5 11-11s-5-10-10-10-9 4-9 9 3.6 8 8 8 7-3.2 7-7-2.8-6-6-6-5 2.2-5 5 2 4 4 4 3.4-1.4 3.4-3.2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* o olho — o camaleão olha para os dois lados ao mesmo tempo */}
      <circle cx="12.5" cy="12.5" r="2.6" fill="currentColor" />
    </svg>
  )
}

export default function Logo({
  className = '',
  compacto = false,
}: {
  className?: string
  compacto?: boolean
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Simbolo className="h-8 w-8 shrink-0" />
      {!compacto && (
        <span className="font-display text-[1.35rem] font-bold leading-none tracking-aperto">
          Camaleão
          <span className="align-super text-[0.7em] font-extrabold">3D</span>
        </span>
      )}
    </span>
  )
}
