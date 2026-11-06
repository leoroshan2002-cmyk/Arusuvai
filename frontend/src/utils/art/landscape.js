// Hero landscape: sun, clouds, rolling hills and a swaying flower meadow. Returns SVG/HTML strings.
export const PALETTE = ['#FF6FA3', '#FFD43B', '#FFFFFF', '#FF8A1F', '#B07CFF', '#FF5A5A'];

export const cloudHtml = (y, w, t, dl) =>
  `<i class="cloud par" style="--y:${y};--w:${w}px;--t:${t}s;--dl:${dl}s;--f:.3"></i>`;

export const sunHtml = (extra = '') =>
  `<div class="sun par" style="--f:.5;${extra}"><i class="ra"></i><i class="co"></i></div>`;

export const hillsHtml = (c) =>
  `<svg class="hill h1 par" style="--f:.62" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0 170C160 110 300 150 460 104S760 50 940 112 1240 150 1440 84V320H0Z" fill="#A5DBA8"/></svg>` +
  `<svg class="hill h2 par" style="--f:.4" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0 200C200 140 360 220 560 170S900 110 1100 180 1360 190 1440 150V320H0Z" fill="#62B86F"/></svg>` +
  `<svg class="hill h3 par" style="--f:.2" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0 250C220 206 420 268 700 226S1100 186 1440 238V320H0Z" fill="#1F8A55"/></svg>` +
  `<svg class="hill h4" viewBox="0 0 1440 320" preserveAspectRatio="none"><path d="M0 282C300 250 700 300 1000 266S1300 268 1440 282V320H0Z" fill="${c || '#064E3B'}"/></svg>`;

export const meadowHtml = (n) => {
  let h = '';
  for (let i = 0; i < n; i++) {
    const r = ((i * 9301 + 49297) % 233280) / 233280;
    const r2 = ((i * 7919 + 1013) % 9973) / 9973;
    const x = ((i / n) * 100 + r * 2).toFixed(1);
    const height = 34 + Math.round(r2 * 70);
    const kind = i % 4 === 0 ? 'fw' : i % 5 === 0 ? 'gr' : '';
    h += `<i class="${kind}" style="--x:${x}%;--h:${height}px;--w:${2 + (i % 3)}px;--t:${3 + r * 3}s;--dl:${-r * 4}s;--c:${PALETTE[i % PALETTE.length]}"></i>`;
  }
  return `<div class="meadow">${h}</div>`;
};

export const sceneHtml = () =>
  `${sunHtml()}${cloudHtml('9%', 170, 95, -30)}${cloudHtml('22%', 120, 120, -70)}${cloudHtml('5%', 210, 140, -110)}${cloudHtml('30%', 100, 100, -12)}${hillsHtml()}${meadowHtml(70)}`;

export const miniSceneHtml = () => sunHtml();

export const bandSceneHtml = () => `${sunHtml('--f:-.25')}${hillsHtml('#052e24')}${meadowHtml(46)}`;
