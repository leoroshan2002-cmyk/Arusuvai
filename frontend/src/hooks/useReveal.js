import { useEffect } from 'react';

// Adds the "in" class to any .rv / .sp element when it scrolls into view
// (fade-up cards, word-by-word headings). Also picks up elements rendered later.
export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          el.classList.add('in');
          io.unobserve(el);
          if (el.style.getPropertyValue('--d')) {
            el.addEventListener('transitionend', () => el.style.setProperty('--d', '0s'), { once: true });
          }
        }),
      { threshold: 0.12 }
    );

    const scan = () =>
      document.querySelectorAll('.rv:not(.in),.sp:not(.in)').forEach((n) => {
        if (n.dataset.watched) return;
        n.dataset.watched = '1';
        io.observe(n);
      });

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
