# Como adicionar fotos dos produtos

1. Coloque o arquivo da foto dentro desta pasta (`public/produtos/`).
   Ex.: `dragao.jpg`.
2. Abra `lib/catalogo.ts`, ache o produto correspondente na lista
   `produtosExemplo` e adicione o campo `foto` com o caminho começando
   em `/produtos/`:

   ```ts
   {
     id: '1',
     slug: 'dragao-articulado',
     nome: 'Chaveiro dragão articulado',
     foto: '/produtos/dragao.jpg',
     ...
   }
   ```

3. Pronto — a foto aparece no card do catálogo e na página do produto.
   Sem o campo `foto`, continua aparecendo a silhueta colorida.

Dica: fotos quadradas (proporção 1:1) ficam melhores, porque o card e a
página do produto cortam a imagem num quadrado.
