/**
 * Arte de abertura da home.
 *
 * Uma peça articulada descendo em elos, cada um numa cor do espectro:
 * é o camaleão mudando de cor e, ao mesmo tempo, o que a loja mais
 * vende. Desenho original, sem foto de ninguém.
 *
 * Para trocar por uma foto sua depois: coloque o arquivo em
 * /public/home.jpg e substitua este componente por uma <img>.
 */

const elos = [
  { cor: '#7C5CD6', y: 30, rx: 30, ry: 19 },
  { cor: '#2E8FD4', y: 66, rx: 27, ry: 17 },
  { cor: '#17B3B0', y: 98, rx: 24, ry: 15 },
  { cor: '#12A66B', y: 126, rx: 21, ry: 13 },
  { cor: '#F5B700', y: 150, rx: 17, ry: 11 },
  { cor: '#EE7B30', y: 170, rx: 14, ry: 9 },
  { cor: '#E0614F', y: 186, rx: 11, ry: 7 },
]

export default function ArteHome({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="Ilustração de uma peça articulada impressa em 3D, com elos em cores diferentes"
    >
      {/* mesa de impressão */}
      <rect
        x="18"
        y="196"
        width="184"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.18"
      />

      {/* argola de cima */}
      <circle
        cx="110"
        cy="30"
        r="21"
        fill="none"
        stroke="#7C5CD6"
        strokeWidth="7"
      />

      {/* elos, do maior ao menor */}
      {elos.slice(1).map((e) => (
        <ellipse
          key={e.y}
          cx="110"
          cy={e.y}
          rx={e.rx}
          ry={e.ry}
          fill="none"
          stroke={e.cor}
          strokeWidth="7"
        />
      ))}

      {/* linhas de camada atravessando, marca da impressão FDM */}
      <g opacity="0.14" stroke="currentColor" strokeWidth="1.4">
        {Array.from({ length: 22 }, (_, i) => (
          <line key={i} x1="26" y1={22 + i * 8} x2="194" y2={22 + i * 8} />
        ))}
      </g>
    </svg>
  )
}
