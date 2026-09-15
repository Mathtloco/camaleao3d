-- ---------------------------------------------------------------------
-- Chamados de garantia
-- ---------------------------------------------------------------------
create type status_chamado as enum (
  'aberto', 'em_analise', 'aprovado', 'recusado', 'resolvido'
);

create table if not exists reclamacoes (
  id           uuid primary key default gen_random_uuid(),
  protocolo    text unique not null,

  pedido       text not null,
  email        text not null,
  problema     text not null,
  descricao    text not null,
  foto_url     text,
  solucao      text,                       -- reimprimir ou estornar

  status       status_chamado not null default 'aberto',
  resposta     text,

  criado_em    timestamptz not null default now(),
  respondido_em timestamptz
);

create index if not exists idx_reclamacoes_status on reclamacoes(status);
create index if not exists idx_reclamacoes_pedido on reclamacoes(pedido);

-- Segurança: o visitante pode abrir chamado, mas não pode ler os
-- chamados dos outros. Leitura fica só para o servidor.
alter table reclamacoes enable row level security;

drop policy if exists "qualquer um abre chamado" on reclamacoes;
create policy "qualquer um abre chamado" on reclamacoes
  for insert with check (true);
