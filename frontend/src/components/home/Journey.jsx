import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../common/Heading';
import { clamp, easeOut, prefersReducedMotion } from '../../utils/helpers';

/* ---------- small helpers for the sky colour fade (dawn → noon → dusk) ---------- */
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (a) => `rgb(${a})`;
const SKY = [
  [0, '#FF9F6B', '#FFE1A8'],
  [0.28, '#86CDF2', '#EAF7FF'],
  [0.55, '#3FA9F0', '#C5ECFF'],
  [0.8, '#FF9E5E', '#FFDCA0'],
  [1, '#F2874A', '#FFD08E'],
];
const skyAt = (p, k) => {
  for (let i = 1; i < SKY.length; i++) {
    if (p <= SKY[i][0]) {
      const a = SKY[i - 1];
      const b = SKY[i];
      return rgb(mix(hex(a[k]), hex(b[k]), (p - a[0]) / (b[0] - a[0])));
    }
  }
  return SKY[4][k];
};

/* ---------- SVG pieces ---------- */
const Cloud = ({ y, w, t, dl }) => (
  <i className="cloud par" style={{ '--y': y, '--w': `${w}px`, '--t': `${t}s`, '--dl': `${dl}s`, '--f': 0.3 }} />
);

// t = position along the stem (0–1), sd = side (1/-1), an = angle, sz = size
const Leaf = ({ t, sd, an, sz, cls }) => (
  <g data-lt={t} data-sd={sd} data-an={an} data-sz={sz}>
    <path className={cls} d="M0 0C20 -28 64 -32 96 0 64 30 20 26 0 0Z" />
    <path d="M4 0C34 -4 62 -4 90 0" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" />
  </g>
);

const Chili = ({ t, s, sd }) => (
  <g data-ct={t} data-cs={s} data-sd={sd}>
    <path d="M0 0C10 -2 20 2 28 10" stroke="#2E8B3E" strokeWidth="4" fill="none" strokeLinecap="round" />
    <g transform="translate(28 10) rotate(-8)">
      <path d="M0 0C20 4 30 34 16 76 13 84 4 76 8 64 12 42 2 20 -4 6Z" fill="#D1382B" />
      <path d="M-8 -3C-3 -11 7 -11 12 0 5 5 -3 5 -8 -3Z" fill="#2f8f3e" />
      <path d="M7 16C12 34 14 50 11 64" stroke="#FF8B72" strokeWidth="2.5" fill="none" opacity=".7" />
    </g>
  </g>
);

const LEAVES = [
  [0.16, 1, -28, 1.15, 'lg1'], [0.26, -1, -36, 1.15, 'lg2'], [0.4, 1, -32, 1.05, 'lg2'], [0.5, -1, -30, 1.05, 'lg1'],
  [0.64, 1, -38, 0.9, 'lg1'], [0.74, -1, -34, 0.9, 'lg2'], [0.88, 1, -50, 0.7, 'lg2'], [0.92, -1, -50, 0.7, 'lg1'],
];
const CHILIS = [[0.45, 1, 1], [0.56, 1, -1], [0.7, 1, 1], [0.34, 1, -1]];

const STAGES = [
  ['01', 'Rooted in Tamil Nadu', 'Every pantry favourite begins with good soil, patient hands and the turn of the seasons.'],
  ['02', 'Ripened by the sun', 'Long sunny days bring out the colour, aroma and flavour of spices, pulses and seeds.'],
  ['03', 'Chosen with care', 'We select suitable products and share clear details about name, pack size and price.'],
  ['04', 'Ready for your kitchen', 'Explore the range and enquire on WhatsApp for current prices and delivery.'],
];

/**
 * "From the soil to your kitchen" – as you scroll, a chilli plant grows,
 * the sun crosses the sky and the day moves from dawn to dusk.
 */
function Journey() {
  const root = useRef(null);

  useEffect(() => {
    const jr = root.current;
    const RM = prefersReducedMotion();
    const stem = jr.querySelector('#jr-stem');
    const L = stem.getTotalLength();
    stem.style.strokeDasharray = L;

    const leaves = [...jr.querySelectorAll('[data-lt]')].map((g) => {
      const t = +g.dataset.lt;
      const pt = stem.getPointAtLength(L * t);
      return { g, t, x: pt.x, y: pt.y, side: +g.dataset.sd, ang: +g.dataset.an, sz: +g.dataset.sz || 1 };
    });
    const chilis = [...jr.querySelectorAll('[data-ct]')].map((g) => {
      const pt = stem.getPointAtLength(L * +g.dataset.ct);
      return { g, x: pt.x, y: pt.y, side: +g.dataset.sd };
    });
    const top = stem.getPointAtLength(L);
    const flower = jr.querySelector('#jr-fl');
    const sun = jr.querySelector('.jr-sun');
    const stages = [...jr.querySelectorAll('.jr-st')];
    const dots = [...jr.querySelectorAll('.jr-dots i')];
    const bowls = jr.querySelector('.jr-bowls');
    const hint = jr.querySelector('.jr-hint');
    const hills = jr.querySelectorAll('.jr-svg .hs');

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const r = jr.getBoundingClientRect();
      const total = jr.offsetHeight - vh;
      const p = RM ? 1 : clamp(-r.top / total); // overall progress 0 → 1

      // sky + sun
      jr.style.setProperty('--s1', skyAt(p, 1));
      jr.style.setProperty('--s2', skyAt(p, 2));
      const sp = clamp(p / 0.98);
      sun.style.setProperty('--jx', 8 + sp * 84 + '%');
      sun.style.setProperty('--jy', 66 - Math.sin(Math.PI * sp) * 46 + '%');
      const dusk = clamp((p - 0.6) / 0.4);
      sun.style.setProperty('--sc', rgb(mix(hex('#FFD84A'), hex('#FF7A2F'), dusk)));
      sun.style.setProperty('--sg', `rgba(255,${200 - Math.round(dusk * 80)},70,.55)`);
      const brightness = 1.02 - Math.abs(p - 0.5) * 0.5;
      hills.forEach((h) => (h.style.filter = `brightness(${brightness.toFixed(2)})`));

      // stem grows, then leaves, chillies and the flower
      const g = clamp(p / 0.7);
      stem.style.strokeDashoffset = L * (1 - easeOut(g));
      leaves.forEach((l) => {
        const s = easeOut(clamp((easeOut(g) - l.t) / 0.1));
        const sway = Math.sin(performance.now() / 1200 + l.t * 9) * 3;
        l.g.setAttribute('transform', `translate(${l.x} ${l.y}) rotate(${l.side * l.ang + sway * l.side}) scale(${l.side * s * l.sz} ${s * l.sz})`);
      });
      chilis.forEach((q, i) => {
        const s = easeOut(clamp((p - 0.62 - i * 0.04) / 0.12));
        q.g.setAttribute('transform', `translate(${q.x} ${q.y}) scale(${q.side * s} ${s})`);
      });
      const fs = easeOut(clamp((p - 0.76) / 0.14));
      flower.setAttribute('transform', `translate(${top.x} ${top.y}) rotate(${p * 120}) scale(${fs})`);

      // text stages, dots, bowls, hint
      const stage = Math.min(3, Math.floor(p * 4));
      stages.forEach((e, i) => e.classList.toggle('on', i === stage));
      dots.forEach((e, i) => e.classList.toggle('on', i === stage));
      bowls.style.setProperty('--b', easeOut(clamp((p - 0.8) / 0.16)).toFixed(3));
      if (hint) hint.style.opacity = p < 0.04 ? 1 : 0;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="jr" id="jr" ref={root} aria-label="From soil to your kitchen">
      <div className="jr-s">
        <div className="jr-sun" aria-hidden="true">
          <i className="ra" />
          <i className="co" />
        </div>
        <div className="jr-cl" aria-hidden="true">
          <Cloud y="12%" w={160} t={80} dl={-20} />
          <Cloud y="26%" w={110} t={110} dl={-60} />
        </div>

        <svg className="jr-svg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path className="hs" d="M0 430C160 380 300 410 460 370S760 320 940 380 1120 410 1200 360V700H0Z" fill="#9BD8A0" />
          <path className="hs" d="M0 500C200 450 360 520 560 480S900 430 1100 490 1180 490 1200 470V700H0Z" fill="#5DB36B" />
          <path className="hs" d="M0 570C260 530 460 590 720 560S1060 540 1200 570V700H0Z" fill="#2C8A4F" />
          <path className="hs" d="M0 640C300 615 700 655 960 628S1140 626 1200 640V700H0Z" fill="#1c6b3e" />
          <ellipse cx="700" cy="652" rx="130" ry="22" fill="#6d4426" />
          <ellipse cx="700" cy="648" rx="100" ry="14" fill="#8a5a33" />
          <path id="jr-stem" d="M700 650C690 570 722 500 702 430 686 362 716 300 700 232" fill="none" stroke="#2E8B3E" strokeWidth="9" strokeLinecap="round" />
          {LEAVES.map(([t, sd, an, sz, cls]) => (
            <Leaf key={t} t={t} sd={sd} an={an} sz={sz} cls={cls} />
          ))}
          {CHILIS.map(([t, s, sd]) => (
            <Chili key={t} t={t} s={s} sd={sd} />
          ))}
          <g id="jr-fl">
            {[...Array(8)].map((_, i) => (
              <ellipse key={i} cx="0" cy="-22" rx="9" ry="22" fill={['#FF6FA3', '#FF8A1F'][i % 2]} transform={`rotate(${i * 45})`} />
            ))}
            <circle r="10" fill="#8B4A12" />
            <circle r="4" fill="#FFD43B" />
          </g>
        </svg>

        <div className="jr-txt">
          <div className="eye">Soil to Kitchen</div>
          <Heading>
            From the soil to <em>your kitchen.</em>
          </Heading>
          {STAGES.map(([num, title, text], i) => (
            <div key={num} className={`jr-st${i === 0 ? ' on' : ''}`}>
              <b>
                <em>{num}</em>
                {title}
              </b>
              <p>{text}</p>
              {i === 3 && (
                <Link className="btn" to="/products">
                  Explore Products <i>→</i>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="jr-bowls" aria-hidden="true">
          {[['Green_Cardamom', 'Cardamom'], ['Turmeric_Powder', 'Turmeric'], ['Black_Peppercorns', 'Pepper']].map(([img, label]) => (
            <figure key={img}>
              <img src={`/images/${img}.webp`} alt="" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="jr-dots" aria-hidden="true">
          <i className="on" />
          <i />
          <i />
          <i />
        </div>
        <div className="jr-hint">Scroll ↓</div>
      </div>
    </section>
  );
}

export default memo(Journey);
