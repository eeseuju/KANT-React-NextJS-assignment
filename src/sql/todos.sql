create table public.todos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title      text not null check (char_length(btrim(title)) between 1 and 50),
  content    text not null default '',
  due_date   date,
  due_time   time,
  done       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.todos enable row level security;

create policy "todos_select_own" on public.todos
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "todos_insert_own" on public.todos
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "todos_update_own" on public.todos
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "todos_delete_own" on public.todos
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create index todos_user_created_idx on public.todos (user_id, created_at desc);