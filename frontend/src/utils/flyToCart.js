import { prefersReducedMotion } from './helpers';

// The product picture "flies" into the cart icon, then the icon wiggles.
export function flyToCart(imgEl) {
  const cartBtn = document.querySelector('#cb');
  if (!imgEl || !cartBtn || prefersReducedMotion()) return;

  const r = imgEl.getBoundingClientRect();
  const t = cartBtn.getBoundingClientRect();
  const size = Math.min(110, r.width);
  const fly = document.createElement('img');
  fly.src = imgEl.src;
  fly.className = 'fly';
  fly.style.cssText = `width:${size}px;height:${size * 0.8}px;left:${r.left + r.width / 2 - size / 2}px;top:${r.top + r.height / 2 - size * 0.4}px`;
  document.body.appendChild(fly);

  const dx = t.left + t.width / 2 - (r.left + r.width / 2);
  const dy = t.top + t.height / 2 - (r.top + r.height / 2);
  fly
    .animate(
      [
        { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
        { transform: `translate(${dx * 0.5}px,${dy * 0.5 - 90}px) scale(.7) rotate(160deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px,${dy}px) scale(.12) rotate(360deg)`, opacity: 0.6 },
      ],
      { duration: 850, easing: 'cubic-bezier(.5,0,.7,.4)' }
    )
    .addEventListener('finish', () => {
      fly.remove();
      cartBtn.classList.remove('wg2');
      void cartBtn.offsetWidth;
      cartBtn.classList.add('wg2');
    });
}
