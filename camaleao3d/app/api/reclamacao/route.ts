import { NextResponse } from 'next/server'

// Controle simples de abuso: no máximo 5 chamados por IP a cada 10 minutos.
const janela = 10 * 60 * 1000
const limite = 5
const registro = new Map<string, number[]>()

function passouDoLimite(ip: string) {
  const agora = Date.now()
  const tentativas = (registro.get(ip) ?? []).filter((t) => agora - t < janela)
  tentativas.push(agora)
  registro.set(ip, tentativas)
  return tentativas.length > limite
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'desconhecido'
  if (passouDoLimite(ip)) {
    return NextResponse.json(
      { erro: 'Muitos chamados seguidos. Tente daqui a pouco.' },
      { status: 429 }
    )
  }

  const corpo = await req.json().catch(() => null)
  if (!corpo) {
    return NextResponse.json({ erro: 'Dados inválidos.' }, { status: 400 })
  }

  // Validação no servidor. O formulário também valida, mas quem decide é aqui.
  const pedido = String(corpo.pedido ?? '').trim().slice(0, 40)
  const email = String(corpo.email ?? '').trim().slice(0, 120)
  const problema = String(corpo.problema ?? '').trim().slice(0, 80)
  const descricao = String(corpo.descricao ?? '').trim().slice(0, 2000)
  const foto = String(corpo.foto ?? '').trim().slice(0, 500)
  const solucao = String(corpo.solucao ?? '').trim().slice(0, 40)

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!pedido || !emailValido || !descricao) {
    return NextResponse.json(
      { erro: 'Preencha o pedido, o e-mail e a descrição.' },
      { status: 400 }
    )
  }

  const protocolo = `C3D-${Date.now().toString(36).toUpperCase().slice(-6)}`

  // Quando o Supabase estiver conectado, grave aqui usando supabaseAdmin().
  // A tabela está pronta em database/migrations/002_reclamacoes.sql
  console.log('Novo chamado', {
    protocolo, pedido, email, problema, descricao, foto, solucao,
  })

  return NextResponse.json({ protocolo })
}
