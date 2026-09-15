import { Suspense } from 'react'
import CatalogoLista from '@/components/CatalogoLista'

export const metadata = { title: 'Produtos' }

export default function Catalogo() {
  return (
    <Suspense fallback={null}>
      <CatalogoLista />
    </Suspense>
  )
}
