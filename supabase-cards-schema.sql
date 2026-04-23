-- ============================================================
-- 2ks digital — Cartes de visite numériques — Schema Supabase
-- ============================================================
-- À exécuter dans l'éditeur SQL du dashboard Supabase.
-- Ce script est idempotent (create if not exists / drop policy if exists).

-- 1) Extensions
create extension if not exists "pgcrypto";

-- =========================
-- PROFILES
-- =========================
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text,
  is_premium boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger: créer un profile automatiquement à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- =========================
-- BUSINESS CARDS
-- =========================
create table if not exists public.business_cards (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  slug         text not null unique,

  first_name   text not null,
  last_name    text not null,
  title        text,
  email        text,
  phone        text,
  website_url  text,

  avatar_url   text,
  socials      jsonb not null default '{}'::jsonb,

  theme        text not null default 'default',

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_business_cards_user_id on public.business_cards(user_id);
create index if not exists idx_business_cards_slug    on public.business_cards(slug);

alter table public.business_cards enable row level security;

-- User lit SES cartes (dashboard)
drop policy if exists "cards_read_own" on public.business_cards;
create policy "cards_read_own"
  on public.business_cards for select
  using (auth.uid() = user_id);

-- Create : seulement son propre user_id + limite 3 si pas premium
drop policy if exists "cards_insert_limit_3" on public.business_cards;
create policy "cards_insert_limit_3"
  on public.business_cards for insert
  with check (
    auth.uid() = user_id
    and (
      coalesce(
        (select is_premium from public.profiles where id = auth.uid()),
        false
      ) = true
      or (
        select count(*) from public.business_cards c where c.user_id = auth.uid()
      ) < 3
    )
  );

drop policy if exists "cards_update_own" on public.business_cards;
create policy "cards_update_own"
  on public.business_cards for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "cards_delete_own" on public.business_cards;
create policy "cards_delete_own"
  on public.business_cards for delete
  using (auth.uid() = user_id);


-- =========================
-- STORAGE BUCKET (avatars)
-- =========================
-- À créer manuellement via le dashboard Supabase → Storage → New bucket :
--   Name: card-avatars
--   Public: true (ou false + signed URLs)
-- Ensuite, appliquer cette policy storage :
-- (plus simple : bucket public)
