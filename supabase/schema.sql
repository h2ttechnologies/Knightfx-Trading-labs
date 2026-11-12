-- KnightFX Trading Labs content and contact schema.
-- Apply this in the Supabase SQL editor. Admin users must be assigned
-- app_metadata.role = 'admin' through a trusted server-side process.

create extension if not exists pgcrypto;

create or replace function public.is_knightfx_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null default '00',
  title text not null,
  description text not null default '',
  level text not null default 'All levels',
  topics text[] not null default '{}',
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.market_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text not null default '',
  content jsonb not null default '[]'::jsonb,
  featured_image_url text,
  author text not null default 'KnightFX Trading Labs',
  reading_time text not null default '4 min read',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.evidence (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null,
  result_owner text not null check (result_owner in ('founder', 'student', 'community')),
  evidence_url text not null,
  verification_reference text,
  verified boolean not null default false,
  published boolean not null default false,
  featured boolean not null default false,
  achieved_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('prop_firm', 'broker')),
  description text not null default '',
  logo_url text,
  affiliate_code text,
  discount text,
  affiliate_url text,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  public boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.courses enable row level security;
alter table public.market_posts enable row level security;
alter table public.evidence enable row level security;
alter table public.partners enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_submissions enable row level security;

drop policy if exists "Public reads published courses" on public.courses;
create policy "Public reads published courses" on public.courses for select using (status = 'published');
drop policy if exists "Admins manage courses" on public.courses;
create policy "Admins manage courses" on public.courses for all using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

drop policy if exists "Public reads published market posts" on public.market_posts;
create policy "Public reads published market posts" on public.market_posts for select using (status = 'published');
drop policy if exists "Admins manage market posts" on public.market_posts;
create policy "Admins manage market posts" on public.market_posts for all using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

drop policy if exists "Public reads verified published evidence" on public.evidence;
create policy "Public reads verified published evidence" on public.evidence for select using (published and verified);
drop policy if exists "Admins manage evidence" on public.evidence;
create policy "Admins manage evidence" on public.evidence for all using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

drop policy if exists "Public reads active partners" on public.partners;
create policy "Public reads active partners" on public.partners for select using (status = 'active');
drop policy if exists "Admins manage partners" on public.partners;
create policy "Admins manage partners" on public.partners for all using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

drop policy if exists "Public reads public settings" on public.site_settings;
create policy "Public reads public settings" on public.site_settings for select using (public);
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

drop policy if exists "Admins read contact submissions" on public.contact_submissions;
create policy "Admins read contact submissions" on public.contact_submissions for select using (public.is_knightfx_admin());
drop policy if exists "Admins update contact submissions" on public.contact_submissions;
create policy "Admins update contact submissions" on public.contact_submissions for update using (public.is_knightfx_admin()) with check (public.is_knightfx_admin());

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public reads KnightFX site assets" on storage.objects;
create policy "Public reads KnightFX site assets" on storage.objects for select using (bucket_id = 'site-assets');
drop policy if exists "Admins upload KnightFX site assets" on storage.objects;
create policy "Admins upload KnightFX site assets" on storage.objects for insert with check (bucket_id = 'site-assets' and public.is_knightfx_admin());
drop policy if exists "Admins update KnightFX site assets" on storage.objects;
create policy "Admins update KnightFX site assets" on storage.objects for update using (bucket_id = 'site-assets' and public.is_knightfx_admin()) with check (bucket_id = 'site-assets' and public.is_knightfx_admin());
drop policy if exists "Admins delete KnightFX site assets" on storage.objects;
create policy "Admins delete KnightFX site assets" on storage.objects for delete using (bucket_id = 'site-assets' and public.is_knightfx_admin());
