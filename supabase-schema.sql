-- ============================================================
-- 2ks digital — Campaigns Admin — Schema Supabase
-- ============================================================
-- Exécuter ce script dans l'éditeur SQL de Supabase Dashboard.

-- 1. Extension UUID
create extension if not exists "uuid-ossp";

-- 2. Table contacts
create table if not exists public.contacts (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  phone      text not null unique,
  tags       text[] default '{}',
  opt_in     boolean default true,
  opted_out_at timestamptz,
  created_at timestamptz default now()
);

-- 3. Table campaigns
create table if not exists public.campaigns (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  channel         text not null check (channel in ('whatsapp', 'sms')),
  message         text not null,
  template_name   text,
  status          text not null default 'draft'
                    check (status in ('draft', 'scheduled', 'sending', 'done', 'cancelled')),
  scheduled_at    timestamptz,
  sent_count      integer default 0,
  delivered_count integer default 0,
  read_count      integer default 0,
  failed_count    integer default 0,
  created_at      timestamptz default now()
);

-- 4. Table campaign_messages
create table if not exists public.campaign_messages (
  id          uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  contact_id  uuid not null references public.contacts(id) on delete cascade,
  status      text not null default 'queued'
                check (status in ('queued', 'sent', 'delivered', 'read', 'failed')),
  provider_id text,
  error       text,
  sent_at     timestamptz,
  created_at  timestamptz default now()
);

-- 5. Index pour performances
create index if not exists idx_campaign_messages_campaign on public.campaign_messages(campaign_id);
create index if not exists idx_campaign_messages_contact  on public.campaign_messages(contact_id);
create index if not exists idx_contacts_phone             on public.contacts(phone);

-- 6. RLS (Row Level Security)
-- Active mais autorise tout pour l'utilisateur authentifié (admin)
alter table public.contacts enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_messages enable row level security;

create policy "Admin full access on contacts"
  on public.contacts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access on campaigns"
  on public.campaigns for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access on campaign_messages"
  on public.campaign_messages for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
