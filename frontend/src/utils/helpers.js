export const imgSrc = (key) => `/images/${key}.webp`;
export const priceText = (p) => p.priceLabel || (p.approved && p.price ? `₹${p.price} / ${p.pack}` : 'Ask for Current Price');

export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
