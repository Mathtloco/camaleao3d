// ---------------------------------------------------------------
// Catálogo Camaleão3D
//
// Regra que vale para tudo: nenhuma peça exige pintura.
// A cor vem do filamento, então não lasca nem desbota.
// ---------------------------------------------------------------

export type Categoria = {
  slug: string
  nome: string
  chamada: string
  cor: string          // hex, o tom do espectro desta categoria
  precoDe: number
  prazoDias: [number, number]
}

export const categorias: Categoria[] = [
  {
    slug: 'organizacao',
    nome: 'Organização',
    chamada: 'Para a gaveta, a bancada e o painel do carro',
    cor: '#12A66B',
    precoDe: 45,
    prazoDias: [2, 4],
  },
  {
    slug: 'festa',
    nome: 'Festa e decoração',
    chamada: 'Topo de bolo, nome, número e lembrancinha',
    cor: '#F5B700',
    precoDe: 35,
    prazoDias: [3, 5],
  },
  {
    slug: 'cafe',
    nome: 'Cantinho do café',
    chamada: 'Suporte de cápsula, porta-coador e dosador',
    cor: '#E0614F',
    precoDe: 50,
    prazoDias: [3, 5],
  },
  {
    slug: 'miniaturas',
    nome: 'Miniaturas',
    chamada: 'Articuladas, do jeito que saem da máquina',
    cor: '#2E8FD4',
    precoDe: 60,
    prazoDias: [3, 5],
  },
  {
    slug: 'chaveiros',
    nome: 'Chaveiros articulados',
    chamada: 'Se mexem inteiros. Ninguém leva só um',
    cor: '#7C5CD6',
    precoDe: 35,
    prazoDias: [2, 3],
  },
]

export const corDaCategoria = (slug?: string) =>
  categorias.find((c) => c.slug === slug)?.cor ?? '#12A66B'

// Cores de filamento oferecidas. O cliente escolhe e é essa que imprime.
export const filamentos = [
  { nome: 'Preto', hex: '#1C1C1C' },
  { nome: 'Branco', hex: '#F4F4F1' },
  { nome: 'Vermelho', hex: '#D22B2B' },
  { nome: 'Azul', hex: '#2B6FD2' },
  { nome: 'Verde', hex: '#1FA85F' },
  { nome: 'Amarelo', hex: '#F2C230' },
  { nome: 'Rosa', hex: '#E86AA6' },
  { nome: 'Laranja', hex: '#F07E22' },
  { nome: 'Roxo', hex: '#7C5CD6' },
  { nome: 'Cinza', hex: '#8A8A8A' },
  { nome: 'Dourado', hex: '#B8933F' },
  { nome: 'Prata', hex: '#A9AEB2' },
]

export type Produto = {
  id: string
  slug: string
  nome: string
  categoria: string
  preco: number
  precoRiscado?: number
  descricao: string
  personalizavel: boolean
  prazoDias: [number, number]
  destaque?: boolean
  avaliacao?: { nota: number; total: number }
  // Caminho da foto dentro de /public, ex.: '/produtos/dragao.jpg'.
  // Sem foto, o card mostra a silhueta colorida no lugar.
  foto?: string
}

// Produtos de exemplo para o site funcionar antes de ligar o Supabase.
// Depois de cadastrar no banco, estes somem sozinhos.
export const produtosExemplo: Produto[] = [
  {
    id: '1',
    slug: 'dragao-articulado',
    nome: 'Chaveiro dragão articulado',
    categoria: 'chaveiros',
    preco: 39.9,
    descricao:
      'Sai da impressora já se mexendo, uma peça só, sem cola e sem encaixe. Tem 11 cm de ponta a ponta.',
    personalizavel: false,
    prazoDias: [2, 3],
    destaque: true,
    avaliacao: { nota: 4.9, total: 38 },
  },
  {
    id: '2',
    slug: 'topo-de-bolo-nome',
    nome: 'Topo de bolo com nome',
    categoria: 'festa',
    preco: 49.9,
    descricao:
      'Você escolhe o nome, a idade e a cor. A gente modela e imprime só o seu.',
    personalizavel: true,
    prazoDias: [3, 5],
    destaque: true,
    avaliacao: { nota: 5, total: 22 },
  },
  {
    id: '3',
    slug: 'suporte-capsula-cafe',
    nome: 'Suporte de cápsulas',
    categoria: 'cafe',
    preco: 69.9,
    descricao:
      'Guarda 24 cápsulas em pé, ocupa 12 cm de bancada. Base com apoio de borracha.',
    personalizavel: false,
    prazoDias: [3, 5],
    destaque: true,
    avaliacao: { nota: 4.8, total: 15 },
  },
  {
    id: '4',
    slug: 'suporte-celular-painel',
    nome: 'Suporte de celular para painel',
    categoria: 'organizacao',
    preco: 54.9,
    descricao:
      'Encaixa na saída de ar. Segura celular de até 8,5 cm de largura sem tremer.',
    personalizavel: false,
    prazoDias: [2, 4],
    destaque: true,
    avaliacao: { nota: 4.7, total: 41 },
  },
  {
    id: '5',
    slug: 'divisoria-gaveta',
    nome: 'Divisória de gaveta (kit 4)',
    categoria: 'organizacao',
    preco: 79.9,
    precoRiscado: 99.6,
    descricao:
      'Quatro divisórias que se encaixam entre si. Você monta do tamanho da sua gaveta.',
    personalizavel: false,
    prazoDias: [3, 5],
    avaliacao: { nota: 4.9, total: 27 },
  },
  {
    id: '6',
    slug: 'gato-articulado',
    nome: 'Chaveiro gato articulado',
    categoria: 'chaveiros',
    preco: 35.9,
    descricao: 'O clássico da casa. Nove centímetros de rabo que balança.',
    personalizavel: false,
    prazoDias: [2, 3],
    avaliacao: { nota: 4.9, total: 63 },
  },
  {
    id: '7',
    slug: 'kit-3-chaveiros',
    nome: 'Kit 3 chaveiros articulados',
    categoria: 'chaveiros',
    preco: 94.9,
    precoRiscado: 119.7,
    descricao:
      'Escolha três bichos e três cores. Sai mais barato que comprar separado.',
    personalizavel: true,
    prazoDias: [3, 5],
    destaque: true,
    avaliacao: { nota: 5, total: 19 },
  },
  {
    id: '8',
    slug: 'boneco-articulado',
    nome: 'Boneco articulado grande',
    categoria: 'miniaturas',
    preco: 89.9,
    descricao:
      'Dezoito centímetros, braços e pernas que posicionam. Acabamento natural do filamento.',
    personalizavel: false,
    prazoDias: [4, 6],
    avaliacao: { nota: 4.8, total: 11 },
  },
]

export const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
