-- Wedding Seat Planner cloud sync table.
-- Run this in Supabase SQL Editor for the project you want to use.

create table if not exists public.wedding_planner_sync (
  sync_key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.wedding_planner_sync enable row level security;

grant select, insert, update on public.wedding_planner_sync to anon, authenticated;

drop policy if exists wedding_planner_sync_by_header on public.wedding_planner_sync;

create policy wedding_planner_sync_by_header
on public.wedding_planner_sync
for all
to anon, authenticated
using (
  sync_key = nullif(current_setting('request.headers', true)::json ->> 'x-sync-key', '')
)
with check (
  sync_key = nullif(current_setting('request.headers', true)::json ->> 'x-sync-key', '')
);
