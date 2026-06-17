# Lash — Портфолио Frontend-разработчика

Адаптивный одностраничный сайт-портфолио, собранный на чистом HTML, Tailwind CSS и ванильном JavaScript. Без сборки и зависимостей — открывается одним файлом.

## ✨ Возможности

- 📱 Адаптивный mobile-first дизайн
- 🌗 Тёмная / светлая тема с сохранением выбора
- 🎬 Анимации появления при скролле
- ⭐ Отзывы посетителей с реальной базой данных (Supabase)
- 📬 Рабочая контактная форма с отправкой на почту (Web3Forms)
- 🛡️ Защита форм от спама: honeypot + проверка времени заполнения + пауза между отправками
- ♿ Доступность (ARIA, навигация с клавиатуры)
- 🔍 SEO и Open Graph разметка

## 🛠️ Технологии

- HTML5 (семантическая вёрстка)
- Tailwind CSS (Play CDN)
- JavaScript (без фреймворков)
- Supabase — база данных отзывов (REST API)
- Web3Forms — отправка контактной формы на email

## ⚙️ Настройка бэкенда

Ключи задаются в блоке `НАСТРОЙКИ` в начале `<script>` в `index.html`:

- `WEB3FORMS_KEY` — access key с [web3forms.com](https://web3forms.com)
- `SUPABASE_URL` и `SUPABASE_KEY` — Project URL и публичный anon-ключ из Supabase

SQL для создания таблицы отзывов и правил доступа — в [`supabase-setup.sql`](supabase-setup.sql).
Если ключи не заданы, сайт работает в демо-режиме (формы не уходят на сервер).

## 🚀 Запуск

Просто открой `index.html` в браузере. Для авто-обновления используй расширение Live Server в VS Code.

## 🌐 Демо

Сайт опубликован через GitHub Pages: **https://lash-devops.github.io/portfolio/**

## 🗂️ Проекты-примеры

Учебные проекты в папке [`projects/`](projects/), отсортированы от простого к сложному. У каждого свой README с описанием.

| # | Проект | Сложность | Что демонстрирует | Демо | Код |
|---|--------|-----------|-------------------|------|-----|
| 1 | **Сайт-визитка** | 🟢 Лёгкий | базовая вёрстка, vCard, анимации | [демо](https://lash-devops.github.io/portfolio/projects/business-card/) | [папка](projects/business-card/) |
| 2 | **Лендинг кофейни** | 🟡 Средний | секционная вёрстка, мобильное меню, лайтбокс, карта | [демо](https://lash-devops.github.io/portfolio/projects/coffee-shop/) | [папка](projects/coffee-shop/) |
| 3 | **Магазин одежды** | 🔴 Сложный | состояние, корзина, фильтры, `localStorage` | [демо](https://lash-devops.github.io/portfolio/projects/clothing-store/) | [папка](projects/clothing-store/) |
| 4 | **ОРБИТА — космотуризм** | 🟣 Эксперт | многостраничный сайт (6 стр.), мастер бронирования и «Мои полёты», canvas-анимации | [демо](https://lash-devops.github.io/portfolio/projects/space-travel/) | [папка](projects/space-travel/) |

## 📁 Структура репозитория

```
portfolio/
├── index.html              — главный сайт-портфолио
├── supabase-setup.sql      — SQL для базы отзывов
└── projects/               — проекты-примеры
    ├── business-card/      — 🟢 сайт-визитка
    ├── coffee-shop/        — 🟡 лендинг кофейни
    ├── clothing-store/     — 🔴 интернет-магазин
    └── space-travel/       — 🟣 ОРБИТА (многостраничный)
```

---

© 2026 Lash · [GitHub](https://github.com/Lash-devops) · [Сайт](https://lash-devops.github.io/portfolio/)
