// Os 5 nichos da Camaleão3D.
// Regra do catálogo: nenhuma peça exige pintura. A cor vem do filamento.
// Enquanto o Supabase não estiver populado, a home lê daqui.

export type Nicho = {
  slug: string
  nome: string
  resumo: string
  precoMin: number
  precoMax: number
  horasMin: number
  horasMax: number
  material: string
  prioridade: 'alta' | 'media' | 'baixa'
  exemplos: string[]
}

export const nichos: Nicho[] = [
  {
    slug: 'chaveiros-articulados',
    nome: 'Chaveiros articulados',
    resumo:
      'Sai da impressora já se mexendo. É a peça que o cliente leva três de uma vez.',
    precoMin: 35,
    precoMax: 49,
    horasMin: 2,
    horasMax: 4,
    material: 'PLA colorido',
    prioridade: 'alta',
    exemplos: ['Dragão', 'Gato', 'Tubarão', 'Dinossauro'],
  },
  {
    slug: 'organizadores',
    nome: 'Organizadores sob medida',
    resumo:
      'Feitos para o espaço que você tem, não para o espaço que a loja imaginou.',
    precoMin: 45,
    precoMax: 80,
    horasMin: 4,
    horasMax: 8,
    material: 'PLA ou PETG',
    prioridade: 'alta',
    exemplos: [
      'Suporte de celular para painel',
      'Divisória de gaveta',
      'Organizador de cabos',
      'Porta-canetas',
    ],
  },
  {
    slug: 'miniaturas',
    nome: 'Miniaturas articuladas',
    resumo:
      'Acabamento natural do filamento, sem tinta para descascar com o tempo.',
    precoMin: 60,
    precoMax: 120,
    horasMin: 3,
    horasMax: 6,
    material: 'PLA branco ou colorido',
    prioridade: 'media',
    exemplos: ['Bonecos articulados', 'Figuras de coleção'],
  },
  {
    slug: 'pecas-funcionais',
    nome: 'Peças funcionais',
    resumo:
      'Aquela peça que quebrou e não se acha mais para comprar. A gente refaz.',
    precoMin: 30,
    precoMax: 200,
    horasMin: 6,
    horasMax: 12,
    material: 'PLA ou PETG',
    prioridade: 'media',
    exemplos: ['Peça de reposição', 'Suporte técnico', 'Adaptador'],
  },
  {
    slug: 'capas-e-grips',
    nome: 'Capas e grips',
    resumo: 'Material flexível, impresso na cor final. Design exclusivo.',
    precoMin: 25,
    precoMax: 50,
    horasMin: 3,
    horasMax: 5,
    material: 'TPU flexível',
    prioridade: 'baixa',
    exemplos: ['Grip de celular', 'Capa personalizada'],
  },
]

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
