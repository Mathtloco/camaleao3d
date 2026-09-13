import type { Config } from 'tailwindcss'

// Paleta Camaleão3D
// casca  — verde quase preto, a pele do camaleão na sombra
// placa  — cinza-esverdeado frio, a mesa de impressão
// As três cores de acento formam a "virada" do camaleão e são
// usadas como faixa de espectro, nunca como fundo degradê.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        casca: '#101613',
        cascaClara: '#1C2621',
        placa: '#E6E9E3',
        placaEscura: '#CFD4CB',
        musgo: '#2FA35C',
        ambar: '#E8B23A',
        coral: '#D9534F',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        aperto: '-0.035em',
      },
      backgroundImage: {
        // linhas de camada — o desenho que a impressora deixa na peça
        camadas:
          'repeating-linear-gradient(180deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 6px)',
      },
    },
  },
  plugins: [],
}
export default config
