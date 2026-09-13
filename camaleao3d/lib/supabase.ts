import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/**
 * Cliente público. Pode ser usado no navegador.
 * A chave anon só enxerga o que a Row Level Security permitir,
 * por isso as políticas do banco precisam estar ligadas.
 */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null

/**
 * Cliente administrativo. SÓ no servidor.
 *
 * A service_role key ignora toda a Row Level Security. Se ela vazar
 * para o navegador, qualquer pessoa lê e apaga o banco inteiro.
 * Nunca importe este arquivo dentro de um componente com "use client".
 */
export function supabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error(
      'Faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env.local'
    )
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
