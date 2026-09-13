-- =====================================================================
-- Camaleão3D — estrutura inicial do banco
--
-- Como rodar: Supabase > seu projeto > SQL Editor > cole > Run
-- =====================================================================

-- ---------------------------------------------------------------------
-- Categorias (os 5 nichos)
-- ---------------------------------------------------------------------
create table if not exists categorias (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  nome        text not null,
  descricao   text,
  ordem       int  not null default 0,
  criado_em   timestamptz not null default now()
);

insert into categorias (slug, nome, ordem) values
  ('chaveiros-articulados', 'Chaveiros articulados', 1),
  ('organizadores',         'Organizadores sob medida', 2),
  ('miniaturas',            'Miniaturas articuladas', 3),
  ('pecas-funcionais',      'Peças funcionais', 4),
  ('capas-e-grips',         'Capas e grips', 5)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- Produtos
-- ---------------------------------------------------------------------
create table if not exists produtos (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  nome            text not null,
  descricao       text,
  categoria_id    uuid references categorias(id) on delete set null,

  preco           numeric(10,2) not null check (preco >= 0),
  estoque         int not null default 0 check (estoque >= 0),

  -- produção
  material        text,              -- PLA, PETG, TPU
  cores           text[] default '{}',
  horas_impressao numeric(4,1),
  peso_gramas     int,

  -- mídia: URLs do Supabase Storage
  imagens         text[] default '{}',

  ativo           boolean not null default true,
  destaque        boolean not null default false,

  -- reservado para a integração futura com o Mercado Livre
  ml_item_id      text,

  criado_em       timestamptz not null default now(),
  atualizado_em   timestamptz not null default now()
);

create index if not exists idx_produtos_categoria on produtos(categoria_id);
create index if not exists idx_produtos_ativo     on produtos(ativo) where ativo = true;
create index if not exists idx_produtos_destaque  on produtos(destaque) where destaque = true;

-- ---------------------------------------------------------------------
-- Pedidos
-- ---------------------------------------------------------------------
create type status_pedido as enum (
  'aguardando_pagamento', 'pago', 'imprimindo', 'enviado', 'entregue', 'cancelado'
);

create table if not exists pedidos (
  id               uuid primary key default gen_random_uuid(),
  numero           serial unique,

  cliente_nome     text not null,
  cliente_email    text not null,
  cliente_telefone text,

  endereco         jsonb,
  itens            jsonb not null,           -- [{produto_id, nome, cor, qtd, preco}]

  subtotal         numeric(10,2) not null,
  frete            numeric(10,2) not null default 0,
  total            numeric(10,2) not null,

  status           status_pedido not null default 'aguardando_pagamento',
  pagamento_id     text,
  pagamento_metodo text,                      -- pix, cartao, boleto
  rastreio         text,

  criado_em        timestamptz not null default now(),
  atualizado_em    timestamptz not null default now()
);

create index if not exists idx_pedidos_status on pedidos(status);
create index if not exists idx_pedidos_email  on pedidos(cliente_email);

-- ---------------------------------------------------------------------
-- Atualiza atualizado_em sozinho
-- ---------------------------------------------------------------------
create or replace function tocar_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end $$;

drop trigger if exists trg_produtos_atualizado on produtos;
create trigger trg_produtos_atualizado before update on produtos
  for each row execute function tocar_atualizado_em();

drop trigger if exists trg_pedidos_atualizado on pedidos;
create trigger trg_pedidos_atualizado before update on pedidos
  for each row execute function tocar_atualizado_em();

-- =====================================================================
-- SEGURANÇA — Row Level Security
--
-- Sem isto, a chave pública do site lê e escreve tudo.
-- Com isto, o visitante só enxerga produto ativo, e mais nada.
-- =====================================================================
alter table categorias enable row level security;
alter table produtos   enable row level security;
alter table pedidos    enable row level security;

-- Qualquer visitante pode ver as categorias
drop policy if exists "categorias visíveis" on categorias;
create policy "categorias visíveis" on categorias
  for select using (true);

-- Qualquer visitante vê apenas produto ativo
drop policy if exists "produtos ativos visíveis" on produtos;
create policy "produtos ativos visíveis" on produtos
  for select using (ativo = true);

-- Pedido: ninguém lê pela chave pública. Só o servidor,
-- que usa a service_role e ignora RLS.
-- Nenhuma policy de select é criada de propósito.

-- Escrita em produtos e categorias também fica só para o servidor.
