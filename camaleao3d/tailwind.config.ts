import type { Config } from 'tailwindcss'

// ---------------------------------------------------------------
// Camaleão3D — sistema visual
//
// A ideia: o site muda de cor conforme a categoria, do mesmo jeito
// que o camaleão muda conforme onde está. Cada categoria tem a sua
// cor do espectro, e ela aparece na página inteira daquela seção.
// A cor não é enfeite: ela diz onde você está.
// ---------------------------------------------------------------
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noite: '#0E2A22',   // verde de selva, quase preto
        casco: '#17382E',   // um tom acima, para superfícies
        folha: '#F1F5F0',   // fundo claro, esverdeado e frio
        nevoa: '#DCE4DA',   // bordas e divisões
        giz:   '#8FA396',   // texto secundário sobre fundo escuro

        // espectro do camaleão — uma cor por categoria
        espectro: {
          organizacao: '#12A66B',
          festa:       '#F5B700',
          cafe:        '#E0614F',
          miniatura:   '#2E8FD4',
          chaveiro:    '#7C5CD6',
          brinquedo:   '#EE7B30',
          sensorial:   '#17B3B0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-corpo)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { aperto: '-0.04em' },
      borderRadius: { peca: '14px' },
      backgroundImage: {
        camadas:
          'repeating-linear-gradient(180deg, rgba(255,255,255,.055) 0px, rgba(255,255,255,.055) 1px, transparent 1px, transparent 7px)',
      },
      keyframes: {
        subir: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'none' } },
        entrar: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'none' } },
      },
      animation: {
        subir: 'subir .35s ease-out both',
        entrar: 'entrar .28s cubic-bezier(.32,.72,0,1) both',
      },
    },
  },
  plugins: [],
}
export default config
