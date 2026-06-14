-- ============================================================
--  Настройка базы данных отзывов для портфолио Lash
--  Где запустить: Supabase → проект → SQL Editor → New query →
--  вставить весь этот файл → Run.
-- ============================================================

-- 1) Таблица отзывов
create table if not exists public.reviews (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 40),
  text       text not null check (char_length(text) between 1 and 400),
  rating     int  not null check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

-- 2) Включаем защиту на уровне строк (RLS)
alter table public.reviews enable row level security;

-- 3) Разрешаем всем посетителям ЧИТАТЬ отзывы
create policy "Anyone can read reviews"
  on public.reviews
  for select
  to anon
  using (true);

-- 4) Разрешаем всем посетителям ДОБАВЛЯТЬ отзывы (с проверкой длины и оценки)
create policy "Anyone can insert reviews"
  on public.reviews
  for insert
  to anon
  with check (
    char_length(name) between 1 and 40
    and char_length(text) between 1 and 400
    and rating between 1 and 5
  );

-- Изменять и удалять отзывы посетители НЕ могут — только ты из панели Supabase.
