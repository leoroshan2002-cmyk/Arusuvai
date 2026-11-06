// Little SVG spice illustrations used for the falling-spice effect, page curtain and loader.
const anise =
  [...Array(8)]
    .map(
      (_, i) =>
        `<path d="M50 50L41 20Q50 5 59 20Z" fill="#8a5a36" transform="rotate(${i * 45} 50 50)"/><ellipse cx="50" cy="25" rx="3.2" ry="5.5" fill="#e2c493" transform="rotate(${i * 45} 50 50)"/>`
    )
    .join('') + '<circle cx="50" cy="50" r="11" fill="#6b4328"/><circle cx="50" cy="50" r="4" fill="#e2c493"/>';

export const SPICE_SHAPES = {
  leaf: '<path d="M50 3C86 26 90 70 50 97 10 70 14 26 50 3Z" fill="#2f8f4e"/><path d="M50 3C32 28 28 66 50 97Z" fill="#1f6e3b" opacity=".55"/><path d="M50 6V99" stroke="#dff1cf" stroke-width="2.2" opacity=".85"/><path d="M50 28L70 40M50 44L74 56M50 60L68 72M50 28L30 40M50 44L26 56M50 60L32 72" stroke="#dff1cf" stroke-width="1.3" opacity=".5"/>',
  cardamom: '<path d="M50 5C82 28 84 72 50 95 16 72 18 28 50 5Z" fill="#9CC37A"/><path d="M50 5C38 30 38 70 50 95M50 5C62 30 62 70 50 95M50 5C72 30 76 72 50 95M50 5C28 30 24 72 50 95" stroke="#6f9a52" stroke-width="2" fill="none"/><rect x="46" y="2" width="8" height="9" rx="3" fill="#7a5a3a"/>',
  pepper: '<circle cx="50" cy="50" r="36" fill="#3a2f28"/><path d="M26 42c6-12 18-17 30-13M28 64c9 9 22 11 33 4M62 50c4 7 2 14-4 18" stroke="#17110e" stroke-width="3.5" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="35" rx="10" ry="5" fill="#fff" opacity=".2" transform="rotate(-35 38 35)"/>',
  anise,
  cinnamon: '<g transform="rotate(-32 50 50)"><rect x="33" y="8" width="34" height="84" rx="15" fill="#a8683b"/><rect x="40" y="8" width="20" height="84" rx="10" fill="#cf9360"/><path d="M50 10v80" stroke="#7a4824" stroke-width="2"/><ellipse cx="50" cy="13" rx="13" ry="5" fill="#7a4824"/></g>',
  chili: '<path d="M28 22C38 10 54 14 58 30 66 58 72 78 88 92 58 90 34 68 28 44 25 34 22 28 28 22Z" fill="#c8321f"/><path d="M28 22C32 12 44 8 52 16" stroke="#3d7a3a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M34 28c4 14 12 34 30 52" stroke="#ef6a52" stroke-width="3" opacity=".65" fill="none" stroke-linecap="round"/>',
  seed: '<g transform="rotate(-40 50 50)"><ellipse cx="50" cy="50" rx="13" ry="36" fill="#b89455"/><path d="M50 16v68M44 20v60M56 20v60" stroke="#8a6a35" stroke-width="1.6" opacity=".8"/></g>',
};

export const spiceSvg = (key) => `<svg viewBox="0 0 100 100">${SPICE_SHAPES[key]}</svg>`;
