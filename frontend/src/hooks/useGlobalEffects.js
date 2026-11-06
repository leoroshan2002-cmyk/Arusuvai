import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../utils/helpers';

// Small page-wide delights: button ripple, spice burst on click, 3D card tilt, hero mouse parallax.
export default function useGlobalEffects() {
  useEffect(() => {
    const RM = prefersReducedMotion();
    const FINE = hasFinePointer();
    const cleanups = [];
    const on = (target, type, fn, opts) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    // Button ripple
    on(document, 'click', (e) => {
      const b = e.target.closest('.btn');
      if (!b || RM) return;
      const r = b.getBoundingClientRect();
      const s = Math.max(r.width, r.height) * 2;
      const o = document.createElement('span');
      o.className = 'rip';
      o.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
      b.appendChild(o);
      setTimeout(() => o.remove(), 700);
    });

    // Spice burst
    on(document, 'click', (e) => {
      if (RM || e.target.closest('input,select,textarea,#dr')) return;
      const card = e.target.closest('.card');
      const base = card ? getComputedStyle(card).getPropertyValue('--cc').trim() : '';
      const colors = base ? [base, '#D9A441', '#FFF3D2'] : ['#D9A441', '#C8402A', '#3E9B4F', '#E39B16', '#FFF3D2'];
      for (let i = 0; i < 14; i++) {
        const g = document.createElement('i');
        g.className = 'gr2';
        const s = 5 + Math.random() * 6;
        g.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${s}px;height:${s * 1.5}px;background:${colors[i % colors.length]}`;
        document.body.appendChild(g);
        const a = Math.random() * 6.28;
        const r = 40 + Math.random() * 70;
        g.animate(
          [
            { transform: 'translate(-50%,-50%) scale(1) rotate(0)', opacity: 1 },
            { transform: `translate(${Math.cos(a) * r - 4}px,${Math.sin(a) * r - 20}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${Math.cos(a) * r * 1.15}px,${Math.sin(a) * r + 50}px) rotate(${Math.random() * 540}deg) scale(.4)`, opacity: 0 },
          ],
          { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.2,.7,.4,1)' }
        ).addEventListener('finish', () => g.remove());
      }
    });

    if (FINE) {
      // Hero mouse parallax
      on(document, 'mousemove', (e) => {
        const h = document.querySelector('.hero');
        if (!h) return;
        h.style.setProperty('--px', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        h.style.setProperty('--py', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      }, { passive: true });

      // Card 3D tilt + glare
      on(document, 'mousemove', (e) => {
        const c = e.target.closest && e.target.closest('.card');
        if (!c) return;
        const r = c.getBoundingClientRect();
        const a = (e.clientX - r.left) / r.width;
        const b = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((a - 0.5) * 10).toFixed(2) + 'deg');
        c.style.setProperty('--rx', ((0.5 - b) * 8).toFixed(2) + 'deg');
        c.style.setProperty('--mx', (a * 100).toFixed(1) + '%');
        c.style.setProperty('--my', (b * 100).toFixed(1) + '%');
      }, { passive: true });
      on(document, 'mouseout', (e) => {
        const c = e.target.closest && e.target.closest('.card');
        if (c && !c.contains(e.relatedTarget)) {
          c.style.setProperty('--rx', '0deg');
          c.style.setProperty('--ry', '0deg');
        }
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
