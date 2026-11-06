import { useEffect } from 'react';

// Sets --d (distance from viewport centre) on every .par element; the CSS turns that into a parallax shift.
export default function useParallax() {
  useEffect(() => {
    let frame = 0;
    const sectionOf = new WeakMap();

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll('.par').forEach((el) => {
        let section = sectionOf.get(el);
        if (!section || !section.isConnected) {
          section = el.closest('.sec,.hero,.jr') || document.body;
          sectionOf.set(el, section);
        }
        const r = section.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) return;
        const d = section.classList.contains('hero') ? r.top : r.top + r.height / 2 - vh / 2;
        el.style.setProperty('--d', d.toFixed(1));
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    const mo = new MutationObserver(queue);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
}
