# Setup — do zero até o site rodando

Este guia assume que você nunca fez isso antes. Faça na ordem.

---

## 1. Instalar o que é necessário

Você precisa de duas coisas na sua máquina:

- **Node.js 18 ou superior** — https://nodejs.org (baixe a versão LTS)
- **Git** — https://git-scm.com/downloads

Confira se deu certo abrindo o terminal e digitando:

```bash
node --version     # deve mostrar algo como v20.x.x
git --version      # deve mostrar algo como 2.4x.x
```

Se aparecer "command not found", o programa não instalou. Reinstale e reabra o terminal.

---

## 2. Criar o repositório no GitHub

1. Entre em https://github.com/new
2. **Repository name:** `camaleao3d`
3. Escolha **Private** (você pode deixar público depois, se quiser)
4. **Não marque** nenhuma opção de "Add a README" ou "Add .gitignore" — o projeto já tem os dois
5. Clique em **Create repository**

---

## 3. Subir o código pela primeira vez

Abra o terminal dentro da pasta do projeto e rode, uma linha por vez:

```bash
git init
git add .
git commit -m "chore: estrutura inicial do projeto"
git branch -M main
git remote add origin https://github.com/Mathtloco/camaleao3d.git
git push -u origin main
```

Se o GitHub pedir senha, ele **não** aceita a senha da conta. Você precisa de um token:
Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → marque `repo` → copie o token e use ele no lugar da senha.

---

## 4. Criar o banco no Supabase

1. Entre em https://supabase.com e crie uma conta (o plano grátis serve para começar)
2. **New project** → nome `camaleao3d` → escolha a região **South America (São Paulo)** → defina uma senha forte para o banco e **guarde essa senha**
3. Espere uns 2 minutos enquanto o projeto é criado

**Criar as tabelas:**

4. No menu lateral, abra **SQL Editor** → **New query**
5. Abra o arquivo `database/migrations/001_inicial.sql` deste projeto, copie todo o conteúdo e cole ali
6. Clique em **Run**. Deve aparecer "Success"

**Pegar as chaves:**

7. Vá em **Settings** (engrenagem) → **API**
8. Anote três coisas:
   - **Project URL**
   - **anon public** — a chave pública
   - **service_role** — a chave secreta, clique em "Reveal" para ver

> A `service_role` dá acesso total ao banco. Não coloque em nenhum lugar público, não mande por mensagem, não commite.

**Ligar o backup automático:**

9. **Settings** → **Database** → **Backups** → ative o backup diário

---

## 5. Configurar as variáveis na sua máquina

```bash
cp .env.example .env.local
```

Abra o `.env.local` em qualquer editor de texto e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=cole_a_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_a_chave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=cole_a_chave_service_role_aqui

NEXT_PUBLIC_WHATSAPP=5511999999999
NEXT_PUBLIC_INSTAGRAM=camaleao3d
```

O WhatsApp vai sem `+`, sem espaço e sem traço: código do país (55) + DDD + número.

Esse arquivo fica só no seu computador. O `.gitignore` impede que ele suba para o GitHub.

---

## 6. Rodar o site

```bash
npm install      # baixa as dependências, demora alguns minutos na primeira vez
npm run dev
```

Abra http://localhost:3000 no navegador.

Para parar o servidor: `Ctrl + C` no terminal.

---

## 7. O dia a dia: salvar e enviar mudanças

Sempre que mexer em alguma coisa:

```bash
git add .
git commit -m "feat: descrição curta do que mudou"
git push
```

A mensagem do commit segue um padrãozinho que ajuda a se achar depois:

| Prefixo | Quando usar |
|---|---|
| `feat:` | funcionalidade nova |
| `fix:` | conserto de erro |
| `style:` | mudança visual |
| `docs:` | documentação |
| `chore:` | configuração, arrumação |

**Trabalhando com branches** (recomendado quando for mexer em algo grande):

```bash
git checkout -b feature/carrinho     # cria e entra numa branch nova
# ... faz as mudanças ...
git add .
git commit -m "feat: carrinho de compras"
git push origin feature/carrinho

# quando estiver funcionando, junta na main:
git checkout main
git merge feature/carrinho
git push origin main
```

A vantagem: se quebrar alguma coisa na branch, a `main` continua intacta.

---

## 8. Colocar o site no ar (Vercel)

1. Entre em https://vercel.com e faça login **com a conta do GitHub**
2. **Add New** → **Project** → escolha o repositório `camaleao3d` → **Import**
3. Antes de clicar em Deploy, abra **Environment Variables** e cadastre as mesmas variáveis do `.env.local`, uma por uma
4. **Deploy**

Pronto. A partir daí, todo `git push origin main` publica a nova versão sozinho.

Se algo quebrar em produção: no painel da Vercel, aba **Deployments**, escolha a versão anterior e clique em **Promote to Production**. O site volta ao que era em segundos.

---

## 9. Backup local do banco

Existe um script em `scripts/backup.sh` que baixa uma cópia do banco para a sua máquina.

```bash
chmod +x scripts/backup.sh    # só na primeira vez
./scripts/backup.sh
```

O arquivo cai na pasta `backups/`, que está no `.gitignore` de propósito — cópia de banco não vai para o GitHub.

---

## Quando der errado

| Erro | O que fazer |
|---|---|
| `command not found: npm` | Node.js não instalou. Reinstale e reabra o terminal. |
| `Module not found` | Rode `npm install` de novo. |
| Página em branco, erro de Supabase | Confira se o `.env.local` está preenchido e **reinicie** o `npm run dev`. Variável de ambiente só é lida quando o servidor inicia. |
| `permission denied` no push | Use um Personal Access Token no lugar da senha (passo 3). |
| Commitou o `.env.local` sem querer | **Troque as chaves no Supabase imediatamente.** Apagar o commit não basta, o histórico guarda. |
