// Animated line icons used in Quality / Journey blocks (strings, rendered with <Icon />).
export const ICON_SUN = `<svg viewBox="0 0 64 64"><g class="ic-r" stroke="#FFB31A" stroke-width="3.2" stroke-linecap="round">${[...Array(12)]
  .map((_, i) => {
    const a = (i * Math.PI) / 6;
    return `<path d="M${(32 + 19 * Math.cos(a)).toFixed(1)} ${(32 + 19 * Math.sin(a)).toFixed(1)}L${(32 + 27 * Math.cos(a)).toFixed(1)} ${(32 + 27 * Math.sin(a)).toFixed(1)}"/>`;
  })
  .join('')}</g><circle cx="32" cy="32" r="12" fill="#FFC93C" stroke="#FF9F1C" stroke-width="2"/></svg>`;

export const ICON_PLANT = `<svg viewBox="0 0 64 64"><path d="M6 56h52" stroke="#A3703F" stroke-width="4" stroke-linecap="round"/><path class="ic-st" d="M32 56V28" stroke="#3E9B4F" stroke-width="3.5" fill="none" stroke-linecap="round"/><path class="ic-l" d="M32 40C20 40 13 31 13 22c11 0 19 5 19 18Z" fill="#6BCB77"/><path class="ic-l b" d="M32 32c12 0 19-9 19-18-11 0-19 5-19 18Z" fill="#3E9B4F"/></svg>`;

export const ICON_BOWL = `<svg viewBox="0 0 64 64"><path d="M8 34h48c0 14-10 22-24 22S8 48 8 34Z" fill="#E0833B"/><ellipse cx="32" cy="34" rx="24" ry="4.5" fill="#F2B84B"/><path class="ic-sm" d="M24 28c-4-5 4-8 0-13"/><path class="ic-sm b" d="M32 28c-4-5 4-8 0-13"/><path class="ic-sm c" d="M40 28c-4-5 4-8 0-13"/></svg>`;

export const ICON_TICK = `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#3E9B4F"/><circle cx="32" cy="32" r="29" fill="none" stroke="#D9A441" stroke-width="2" stroke-dasharray="4 6" class="ic-r"/><path class="ck" pathLength="1" d="M20 33l9 9 16-18" style="stroke:#fff;stroke-width:5"/></svg>`;

export const ICON_CHECK = '<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="12"/><path pathLength="1" d="M8 14l4 4 8-9"/></svg>';
