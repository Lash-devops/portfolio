/* ===== ОРБИТА — общие скрипты (анимации + утилиты) ===== */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Звёздное небо (canvas) ---------- */
  function starfield() {
    const cv = $('#stars');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let w, h, stars, scrollY = 0;

    const init = () => {
      w = cv.width = innerWidth;
      h = cv.height = innerHeight;
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,            // глубина → параллакс и размер
        r: Math.random() * 1.3 + 0.3,
        tw: Math.random() * Math.PI * 2,          // фаза мерцания
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const py = (s.y - scrollY * s.z * 0.25) % h;
        const y = py < 0 ? py + h : py;
        const flick = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(s.tw);
        ctx.globalAlpha = flick * s.z;
        ctx.fillStyle = s.z > 0.7 ? '#a5f3fc' : '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, y, s.r * s.z + 0.2, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) s.tw += 0.02;
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => { draw(); requestAnimationFrame(loop); };
    addEventListener('resize', init);
    addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
    init();
    if (reduce) draw(); else loop();
  }

  /* ---------- Появление при скролле ---------- */
  function reveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Анимированные счётчики ---------- */
  function counters() {
    const els = $$('[data-count]');
    if (!els.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1600; const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = val.toLocaleString('ru-RU') + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString('ru-RU') + suffix;
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Обратный отсчёт ---------- */
  function countdown() {
    const box = $('#countdown');
    if (!box) return;
    const target = new Date(box.dataset.target).getTime();
    const out = {
      d: $('[data-cd="d"]', box), h: $('[data-cd="h"]', box),
      m: $('[data-cd="m"]', box), s: $('[data-cd="s"]', box),
    };
    const pad = (n) => String(n).padStart(2, '0');
    const upd = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      if (out.d) out.d.textContent = d;
      if (out.h) out.h.textContent = pad(h);
      if (out.m) out.m.textContent = pad(m);
      if (out.s) out.s.textContent = pad(s);
    };
    upd();
    setInterval(upd, 1000);
  }

  /* ---------- 3D-наклон карточек ---------- */
  function tilt() {
    if (reduce) return;
    $$('.tilt').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Мобильное меню ---------- */
  function mobileNav() {
    const btn = $('#menu-toggle'), menu = $('#mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
    });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));
  }

  /* ---------- Активная ссылка в навигации ---------- */
  function navActive() {
    const page = location.pathname.split('/').pop() || 'index.html';
    $$('[data-nav]').forEach((a) => {
      if (a.dataset.nav === page) a.classList.add('text-accent-400');
    });
  }

  /* ---------- Год в подвале ---------- */
  function year() { $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear())); }

  document.addEventListener('DOMContentLoaded', () => {
    starfield(); reveal(); counters(); countdown(); tilt(); mobileNav(); navActive(); year();
  });
})();
