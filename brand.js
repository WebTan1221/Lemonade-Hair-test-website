/* ══════════════════════════════════════
   Lemonade Hair Swansea — Shared Scripts
   ══════════════════════════════════════ */

// ── Mobile menu
(function() {
  const navEl = document.getElementById('nav');
  if (!navEl) return;

  // Hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  navEl.appendChild(hamburger);

  // Full-screen menu overlay
  const menu = document.createElement('div');
  menu.className = 'mobile-menu';
  const inner = document.createElement('div');
  inner.className = 'mobile-menu-inner';

  // Collect all nav links from both .nav-links groups
  navEl.querySelectorAll('.nav-links a').forEach(link => {
    const clone = link.cloneNode(true);
    clone.addEventListener('click', close);
    inner.appendChild(clone);
  });
  menu.appendChild(inner);
  document.body.appendChild(menu);

  function open()  { menu.classList.add('open'); document.body.classList.add('menu-open'); }
  function close() { menu.classList.remove('open'); document.body.classList.remove('menu-open'); }

  hamburger.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  menu.addEventListener('click', e => { if (e.target === menu) close(); });
})();

// ── Cursor
const cur  = document.getElementById('cur');
const curF = document.getElementById('cur-f');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function loop() {
  fx += (mx - fx) * .12; fy += (my - fy) * .12;
  curF.style.left = fx + 'px'; curF.style.top = fy + 'px';
  requestAnimationFrame(loop);
})();

// ── Nav scroll
const nav = document.getElementById('nav');
if (nav) {
  addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 55);
  });
}

// ── Reveal on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0, rootMargin: '0px 0px 60px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Ethereal shadow animation
const esMatrices = document.querySelectorAll('.es-matrix');
if (esMatrices.length) {
  let esT = 0;
  const esP = Math.PI * 2 / 3;
  const esScale = 5, esBias = -4;
  (function esFrame() {
    esT += 0.006;
    const e1 = Math.exp(2.2 * Math.cos(esT));
    const e2 = Math.exp(2.2 * Math.cos(esT + esP));
    const e3 = Math.exp(2.2 * Math.cos(esT + esP * 2));
    const es = e1 + e2 + e3;
    const wr = e1/es, wg = e2/es, wb = e3/es;
    const m = `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${(esScale*wr).toFixed(4)} ${(esScale*wg).toFixed(4)} ${(esScale*wb).toFixed(4)} 0 ${esBias}`;
    esMatrices.forEach(el => el.setAttribute('values', m));
    requestAnimationFrame(esFrame);
  })();
}
