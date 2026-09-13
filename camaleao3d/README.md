# Camaleão3D

Loja de peças impressas em 3D. Regra do catálogo: **nenhuma peça exige pintura** — a cor vem do filamento.

- **Site:** Next.js 14 (App Router) + TypeScript + Tailwind
- **Banco e imagens:** Supabase (PostgreSQL + Storage)
- **Deploy:** Vercel, automático a cada push na `main`
- **Repositório:** https://github.com/Mathtloco/camaleao3d

Para rodar na sua máquina pela primeira vez, siga o [SETUP.md](SETUP.md).

---

## Os 5 nichos

| Nicho | Preço | Impressão | Material | Prioridade |
|---|---|---|---|---|
| Chaveiros articulados | R$ 35–49 | 2–4 h | PLA colorido | Alta |
| Organizadores sob medida | R$ 45–80 | 4–8 h | PLA / PETG | Alta |
| Miniaturas articuladas | R$ 60–120 | 3–6 h | PLA | Média |
| Peças funcionais | R$ 30–200 | 6–12 h | PLA / PETG | Média |
| Capas e grips | R$ 25–50 | 3–5 h | TPU | Baixa |

---

## Estrutura das pastas

```
camaleao3d/
├── app/                    páginas do site
│   ├── page.tsx            home
│   ├── produtos/           catálogo
│   ├── sobre/
│   ├── layout.tsx          fonte, metadados, SEO
│   └── globals.css
├── components/             componentes reutilizáveis
├── lib/
│   ├── supabase.ts         conexão com o banco
│   └── nichos.ts           dados dos 5 nichos
├── database/migrations/    SQL para criar as tabelas
├── scripts/backup.sh       cópia local do banco
├── docs/
├── .env.example            template das variáveis (sem senha)
└── .gitignore
```

---

## Comandos

```bash
npm run dev      # roda em http://localhost:3000
npm run build    # gera a versão de produção
npm run start    # roda a versão de produção
npm run lint     # verifica erros no código
```

---

## Regras de segurança deste projeto

1. **Nada de senha no código.** Tudo em `.env.local`, que está no `.gitignore`.
2. **A `SUPABASE_SERVICE_ROLE_KEY` nunca vai para o navegador.** Ela ignora todas as regras de permissão do banco. Só use em código de servidor, nunca em arquivo com `"use client"`.
3. **Row Level Security ligada em todas as tabelas.** Já vem configurada na migration `001_inicial.sql`.
4. **Se uma chave vazar, troque na hora** no painel do Supabase. Apagar o commit não resolve — o histórico do Git guarda tudo.

---

## Backup

| O que | Onde | Com que frequência |
|---|---|---|
| Código | GitHub | A cada `git push` |
| Banco de dados | Supabase, backup automático | Diário (ativar no painel) |
| Cópia local do banco | `scripts/backup.sh` | Quando você rodar |
| Imagens | Supabase Storage | Junto com o banco |

---

## Próximos passos

- [ ] Criar o projeto no Supabase e rodar a migration
- [ ] Cadastrar os primeiros produtos
- [ ] Página individual de produto
- [ ] Carrinho e checkout
- [ ] Pagamento (Mercado Pago)
- [ ] Painel admin
- [ ] Deploy na Vercel
- [ ] Integração com o Mercado Livre (a estrutura já está preparada)
