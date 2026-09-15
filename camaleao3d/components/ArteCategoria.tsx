/**
 * Arte de categoria.
 *
 * Enquanto não existe foto real da peça, cada produto mostra um desenho
 * da sua categoria, na cor dela. São formas simples e geométricas,
 * claramente ilustração — não tentam passar por foto, para o cliente
 * nunca achar que está vendo a peça que vai receber.
 *
 * Quando a foto chegar, é só preencher o campo `imagem` do produto:
 * o desenho some sozinho.
 */

export default function ArteCategoria({
  categoria,
  cor,
  className = '',
}: {
  categoria: string
  cor: string
  className?: string
}) {
  const traco = {
    stroke: cor,
    strokeWidth: 5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  }

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {desenhos(categoria, cor, traco)}
    </svg>
  )
}

function desenhos(
  categoria: string,
  cor: string,
  t: Record<string, unknown>
) {
  switch (categoria) {
    // Argola com elos que descem — o chaveiro articulado
    case 'chaveiros':
      return (
        <>
          <circle cx="60" cy="26" r="13" {...t} />
          <ellipse cx="60" cy="54" rx="15" ry="10" {...t} />
          <ellipse cx="60" cy="72" rx="13" ry="9" {...t} />
          <ellipse cx="60" cy="88" rx="10" ry="8" {...t} />
          <ellipse cx="60" cy="101" rx="7" ry="6" {...t} />
        </>
      )

    // Cubo dobrável do fidget
    case 'brinquedos':
      return (
        <>
          <rect x="24" y="24" width="34" height="34" rx="6" {...t} />
          <rect x="62" y="24" width="34" height="34" rx="6" {...t} />
          <rect x="24" y="62" width="34" height="34" rx="6" {...t} />
          <rect x="62" y="62" width="34" height="34" rx="6" {...t} />
          <circle cx="60" cy="60" r="5" fill={cor} />
        </>
      )

    // Elos que deslizam entre os dedos
    case 'sensorial':
      return (
        <>
          <ellipse cx="38" cy="45" rx="16" ry="11" {...t} />
          <ellipse cx="66" cy="45" rx="16" ry="11" {...t} />
          <ellipse cx="52" cy="75" rx="16" ry="11" {...t} />
          <ellipse cx="80" cy="75" rx="16" ry="11" {...t} />
        </>
      )

    // Divisórias de gaveta vistas de cima
    case 'organizacao':
      return (
        <>
          <rect x="20" y="28" width="80" height="64" rx="6" {...t} />
          <path d="M50 28v64M20 60h30M50 60h50" {...t} />
        </>
      )

    // Topo de bolo: haste e estrela
    case 'festa':
      return (
        <>
          <path d="M60 62v38" {...t} />
          <path
            d="M60 18l9 19 21 3-15 15 4 21-19-10-19 10 4-21-15-15 21-3z"
            {...t}
          />
        </>
      )

    // Xícara
    case 'cafe':
      return (
        <>
          <path d="M28 42h52v28a22 22 0 01-22 22H50a22 22 0 01-22-22z" {...t} />
          <path d="M80 50h10a12 12 0 010 24h-10" {...t} />
          <path d="M44 20v10M60 16v14M76 20v10" {...t} />
        </>
      )

    // Boneco articulado
    case 'miniaturas':
      return (
        <>
          <circle cx="60" cy="28" r="12" {...t} />
          <path d="M60 40v30" {...t} />
          <path d="M60 46l-20 14M60 46l20 14" {...t} />
          <path d="M60 70l-14 30M60 70l14 30" {...t} />
        </>
      )

    default:
      return <circle cx="60" cy="60" r="30" {...t} />
  }
}
