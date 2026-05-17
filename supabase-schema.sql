create table if not exists public.food_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  quantity text not null,
  storage_location text not null,
  purchase_date date,
  expiry_date date not null,
  note text default '',
  status text not null default 'active' check (status in ('active', 'used', 'discarded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  quantity text default '',
  category text default '',
  note text default '',
  checked boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.storage_locations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  storage_group text not null check (storage_group in ('fridge', 'freezer', 'pantry')),
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

alter table public.food_items enable row level security;
alter table public.shopping_items enable row level security;
alter table public.storage_locations enable row level security;

create policy "Users can read own food items"
on public.food_items for select
using (auth.uid() = user_id);

create policy "Users can insert own food items"
on public.food_items for insert
with check (auth.uid() = user_id);

create policy "Users can update own food items"
on public.food_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own food items"
on public.food_items for delete
using (auth.uid() = user_id);

create policy "Users can read own shopping items"
on public.shopping_items for select
using (auth.uid() = user_id);

create policy "Users can insert own shopping items"
on public.shopping_items for insert
with check (auth.uid() = user_id);

create policy "Users can update own shopping items"
on public.shopping_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own shopping items"
on public.shopping_items for delete
using (auth.uid() = user_id);

create policy "Users can read own storage locations"
on public.storage_locations for select
using (auth.uid() = user_id);

create policy "Users can insert own storage locations"
on public.storage_locations for insert
with check (auth.uid() = user_id);

create policy "Users can update own storage locations"
on public.storage_locations for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own storage locations"
on public.storage_locations for delete
using (auth.uid() = user_id);
