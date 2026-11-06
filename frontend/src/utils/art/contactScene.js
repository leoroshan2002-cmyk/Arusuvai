// Animated WhatsApp-to-shop illustration for the Contact page.
const bubble = (text, fill, path, begin) =>
  `<g opacity="0"><rect x="-36" y="-14" width="72" height="28" rx="14" fill="${fill}" stroke="rgba(0,0,0,.12)"/><text x="0" y="4" text-anchor="middle">${text}</text><animateMotion dur="5s" begin="${begin}s" repeatCount="indefinite" path="${path}"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="5s" begin="${begin}s" repeatCount="indefinite"/></g>`;

export const contactSceneHtml = () => {
  const out = 'M140 96C330 -10 640 -10 800 104';
  const back = 'M800 124C640 20 330 20 140 116';
  let stripes = '';
  for (let i = 0; i < 8; i++) {
    const c = i % 2 ? '#D9A441' : '#0B6B4B';
    stripes += `<rect x="${800 + i * 20}" y="78" width="20" height="30" fill="${c}"/><circle cx="${810 + i * 20}" cy="108" r="10" fill="${c}"/>`;
  }
  return `<svg viewBox="0 0 1000 230"><defs><linearGradient id="cbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE0D2"/><stop offset="1" stop-color="#FFF6E3"/></linearGradient></defs><rect width="1000" height="230" fill="url(#cbg)"/><path d="${out}" fill="none" stroke="#D9A441" stroke-width="2" stroke-dasharray="3 9" stroke-linecap="round"/><rect y="200" width="1000" height="30" fill="#E6D3B0"/><g class="rg3"><rect x="62" y="82" width="78" height="118" rx="14" fill="#202720"/><rect x="69" y="94" width="64" height="86" rx="6" fill="#FDFAEE"/><circle cx="101" cy="137" r="22" fill="#1f8a4c"/><path d="M92 128h18a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-6l-6 5v-5h-6a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4z" fill="#fff"/></g><path class="wvs" d="M154 96q12 12 0 24" stroke="#1f8a4c" stroke-width="3" fill="none" stroke-linecap="round"/><path class="wvs b" d="M166 88q18 20 0 40" stroke="#1f8a4c" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="800" y="104" width="160" height="96" fill="#F2EBDD" stroke="#79553A" stroke-width="2"/>${stripes}<rect x="862" y="140" width="40" height="60" rx="3" fill="#79553A"/><circle cx="894" cy="172" r="2.6" fill="#D9A441"/><rect x="812" y="124" width="36" height="34" rx="3" fill="#DDF1F6" stroke="#79553A"/><rect x="916" y="124" width="36" height="34" rx="3" fill="#DDF1F6" stroke="#79553A"/><rect x="800" y="40" width="160" height="32" rx="4" fill="#064E3B"/><text class="sg2" x="880" y="62" text-anchor="middle">ARUSUVAI</text><g class="pn2"><path d="M880 8a14 14 0 0 1 14 14c0 11-14 24-14 24s-14-13-14-24a14 14 0 0 1 14-14z" fill="#D1382B"/><circle cx="880" cy="22" r="5" fill="#fff"/></g>${bubble('Price?', '#fff', out, 0)}${bubble('50 kg ✓', '#fff', out, 1.7)}${bubble('Delivery?', '#fff', out, 3.4)}${bubble('Sure ✓', '#DCF8C6', back, 2.4)}${bubble('Confirmed', '#DCF8C6', back, 4.1)}</svg>`;
};
