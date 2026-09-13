# Prompt para o Claude Cowork — Camaleão3D

> Arraste este arquivo para o Cowork e escreva: **"Siga este arquivo."**
> Não precisa copiar e colar nada.

---

## Contexto

Quero criar um site de e-commerce para o meu negócio de produtos impressos em 3D, chamado **Camaleão3D**. Sou iniciante e estou testando o potencial do mercado. Trabalho pelo terminal e quero o código versionado no GitHub, com segurança e backup desde o começo.

**Dados do negócio**

| Item | Valor |
|---|---|
| Nome | Camaleão3D |
| GitHub | https://github.com/Mathtloco |
| Repositório | `camaleao3d` |
| Banco de dados | Supabase (PostgreSQL + Storage) |
| Canais de venda | Instagram (principal), Shopee, Mercado Livre |
| Objetivo | Renda extra, validação rápida de mercado |
| Público | Brasil |

**Regra que define todo o catálogo:** nenhum produto pode exigir pintura. Tudo sai pronto da impressora, direto em PLA/PETG/TPU colorido.

---

## Os 5 nichos do catálogo

### 1. Chaveiros articulados — prioridade alta
- Preço de venda: R$ 35–49
- Exemplos: dragão, gato, tubarão, dinossauro
- Impressão: 2–4 h · Material: PLA colorido
- Lucro por unidade: R$ 25–35
- Por que entra: viraliza em Reels e TikTok, cliente compra mais de um

### 2. Organizadores personalizados — prioridade alta
- Preço de venda: R$ 45–80
- Exemplos: suporte de celular para painel de carro, organizador de gaveta, organizador de cabos, porta-canetas
- Impressão: 4–8 h · Material: PLA ou PETG colorido
- Lucro por unidade: R$ 30–50
- Por que entra: demanda constante, conteúdo de "antes e depois" performa muito bem

### 3. Miniaturas articuladas — prioridade média
- Preço de venda: R$ 60–120
- Exemplos: bonecos articulados, action figures, peças de coleção
- Impressão: 3–6 h · Material: PLA branco ou colorido (o acabamento natural fica premium)
- Lucro por unidade: R$ 40–80
- Por que entra: colecionador é público fiel e paga bem

### 4. Peças funcionais sob encomenda — prioridade média
- Preço de venda: R$ 30–200
- Exemplos: suportes técnicos, peças de reposição, adaptadores ergonômicos
- Impressão: 6–12 h · Material: PLA ou PETG
- Lucro por unidade: R$ 20–120
- Por que entra: pouca concorrência, atende pequenas empresas (B2B)

### 5. Capas e grips de celular — prioridade baixa
- Preço de venda: R$ 25–50
- Impressão: 3–5 h · Material: TPU flexível
- Lucro por unidade: R$ 15–30
- Ressalva: mercado saturado. Só vale com design exclusivo.

---

## O que o site precisa ter

**Páginas**
- Home com os 5 nichos e os produtos em destaque
- Catálogo com filtro por nicho
- Página individual de produto (várias fotos, descrição, prazo de produção)
- Sobre a Camaleão3D
- FAQ (prazos, como funciona impressão 3D, personalização, trocas)
- Contato com Instagram, WhatsApp e e-mail

**Funcionalidades**
- Carrinho de compras
- Checkout com PIX, cartão e boleto (Mercado Pago ou PagSeguro — decidir depois, deixar a estrutura pronta)
- Botão de WhatsApp para atendimento direto
- Painel admin para cadastrar produto, editar preço e controlar estoque
- Feed ou link do Instagram na home

**Design**
- Mobile-first: a maior parte do tráfego vem do Instagram, pelo celular
- Fotos dos produtos em destaque, fundo neutro
- Identidade ligada ao nome "Camaleão" — cor que muda, adaptação
- Rápido e leve

**SEO**
- Meta tags e Open Graph em todas as páginas (link bonito quando compartilhar no Instagram/WhatsApp)
- URLs limpas: `/produtos/chaveiro-dragao-articulado`
- Sitemap e robots.txt

---

## Segurança, backup e versionamento

**GitHub**
- Repositório `camaleao3d` na conta Mathtloco
- Branches: `main` (produção), `develop` (desenvolvimento), `feature/nome` (features novas)
- `.gitignore` bloqueando `.env`, `node_modules`, arquivos de build
- `.env.example` com o nome de cada variável, sem nenhum valor real
- README.md e SETUP.md explicando como rodar o projeto no terminal

**Segurança**
- Chaves e senhas só em variáveis de ambiente, nunca no código
- A `service_role key` do Supabase só pode ser usada no servidor, nunca no frontend
- Row Level Security ativado em todas as tabelas do Supabase
- Validação de dados no servidor, não só no formulário
- Rate limiting nas rotas de API
- HTTPS obrigatório
- Senha de admin com hash (bcrypt) ou o Auth do Supabase

**Backup**
- O GitHub é o backup principal do código
- Ativar backup automático diário no painel do Supabase
- Imagens no Supabase Storage
- Um script de export manual do banco, para eu rodar quando quiser uma cópia local

---

## Stack

- **Frontend e backend:** Next.js (App Router) + TypeScript
- **Estilo:** Tailwind CSS
- **Banco:** Supabase — PostgreSQL, Storage e Auth
- **Deploy:** Vercel, conectado ao GitHub, deploy automático ao dar push na `main`
- **Pagamento:** estrutura pronta para Mercado Pago (definir depois)

---

## Mercado Livre — deixar preparado, não implementar agora

Quero a estrutura pronta para uma integração futura:
- Campo no painel admin para guardar as chaves da API do Mercado Livre
- Espaço no modelo de produto para o ID do anúncio no ML
- Nada disso precisa funcionar agora. Só não quero ter que reescrever tudo depois.

---

## Como quero trabalhar

Pelo terminal. O fluxo precisa ser exatamente este e estar documentado no SETUP.md:

```bash
git clone https://github.com/Mathtloco/camaleao3d.git
cd camaleao3d
npm install
cp .env.example .env.local     # preencher com as chaves do Supabase
npm run dev                    # abre em http://localhost:3000
```

E para salvar mudanças:

```bash
git add .
git commit -m "feat: descrição do que mudou"
git push origin develop
```

---

## Observações importantes

Sou iniciante. Explique o que estiver fazendo em português e sem assumir que eu já sei os termos. Quando precisar que eu faça algo fora do terminal — criar conta no Supabase, pegar uma chave, configurar a Vercel — pare e me diga o passo a passo.

Sobre expectativa de resultado: a margem líquida real na impressão 3D no Brasil fica entre 15% e 40% depois de filamento, energia, falhas de impressão e taxa de marketplace (Shopee cobra ~14%, Mercado Livre 12–17%). Não estou contando com margem de 300%. O site precisa ser simples, funcionar e vender.

---

## Ordem de execução

1. Criar a estrutura do projeto e subir para o GitHub
2. Montar o schema do Supabase (produtos, categorias, pedidos, admin)
3. Home e catálogo funcionando com dados reais do banco
4. Página de produto e carrinho
5. Painel admin
6. Checkout e pagamento
7. Deploy na Vercel

Faça um passo de cada vez e me avise quando terminar cada um.
