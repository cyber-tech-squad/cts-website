create extension if not exists pgcrypto;

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  email text not null unique,
  student_id text not null unique check (char_length(student_id) between 3 and 32),
  message text not null default '' check (char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;
-- No client-side policies: only the server's service_role key may insert/read.
