import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (!reduced) {
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis;
  }
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (reduced) { els.forEach((e) => e.classList.add('in')); }
  else {
    els.forEach((el) => ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => { el.style.transitionDelay = (parseFloat(el.dataset.reveal || '0') || 0) + 's'; el.classList.add('in'); } }));
    // fallback sweep, so a fast scroll never leaves content hidden
    const sweep = () => els.forEach((el) => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); });
    let t = 0;
    addEventListener('scroll', () => { clearTimeout(t); t = window.setTimeout(sweep, 160); }, { passive: true });
    setTimeout(sweep, 1200);
    const h0 = document.documentElement.scrollHeight;
    (document as any).fonts?.ready.then(() => { if (Math.abs(document.documentElement.scrollHeight - h0) > 4) ScrollTrigger.refresh(); });
  }

  // phone dock: appears once the first screen has been passed; on a page with a form it jumps to that form
  const dock = document.querySelector<HTMLElement>('[data-dock]');
  if (dock) {
    const mark = () => document.documentElement.classList.toggle('scrolled', scrollY > 420);
    addEventListener('scroll', mark, { passive: true }); mark();
    const form = document.querySelector<HTMLElement>('[data-ef]');
    const enq = dock.querySelector<HTMLAnchorElement>('[data-dock-enquire]');
    if (form && form.id && enq) enq.href = '#' + form.id;
  }

  // header menu
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (burger && menu) {
    const set = (open: boolean) => {
      menu.hidden = !open; burger.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('menu-open', open);
      const l = (window as any).__lenis; if (l) open ? l.stop() : l.start();
    };
    burger.addEventListener('click', () => set(menu.hidden));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); burger.focus(); } });
    matchMedia('(min-width: 1181px)').addEventListener('change', (e) => e.matches && set(false));
  }
}
