import { useMemo } from 'react';
import { mandalaHtml } from '../../utils/art/mandala';
import { PALETTE } from '../../utils/art/landscape';

const MANDALA = mandalaHtml();
const BLOB_LIGHT = [['#FFC857', '#8FD3A4'], ['#FF9A8B', '#7EC8F0'], ['#8FD3A4', '#FFC857'], ['#7EC8F0', '#FF9A8B']];
const BLOB_DARK = [['#0F8A66', '#E8B923'], ['#1AA48C', '#F27A5E'], ['#E8B923', '#2B8FD6'], ['#F27A5E', '#0F8A66']];

// Soft colour blobs, a mandala and floating pollen dots that sit behind a section's content.
// `k` is the section's position on the page (it varies the colours/positions, as in the original).
export default function SectionDecor({ k = 0, dark = false, hero = false }) {
  const [c1, c2] = (dark ? BLOB_DARK : BLOB_LIGHT)[k % 4];

  const dots = [...Array(6)].map((_, i) => (
    <i
      key={i}
      className="dot"
      aria-hidden="true"
      style={{
        left: `${((i * 23 + k * 31) % 92) + 3}%`,
        top: `${((i * 29 + k * 17) % 60) + 30}%`,
        '--dc': PALETTE[(i + k) % PALETTE.length],
        animationDelay: `${-i * 1.9}s`,
        animationDuration: `${8 + i}s`,
      }}
    />
  ));

  if (hero) return <>{dots}</>;

  const size1 = 300 + (k % 3) * 80;
  const size2 = 260 + (k % 2) * 90;
  return (
    <>
      <i
        className="blob par"
        aria-hidden="true"
        style={{
          '--f': 0.18 + (k % 3) * 0.1,
          left: `${((k * 31) % 60) - 10}%`,
          top: `${(k * 17) % 40}%`,
          width: size1,
          height: size1,
          background: `radial-gradient(circle,${c1},transparent 66%)`,
          opacity: dark ? 0.35 : 0.5,
        }}
      />
      <i
        className="blob par"
        aria-hidden="true"
        style={{
          '--f': -0.12 - (k % 2) * 0.1,
          right: `${((k * 23) % 40) - 10}%`,
          bottom: `${(k * 13) % 30}%`,
          width: size2,
          height: size2,
          background: `radial-gradient(circle,${c2},transparent 66%)`,
          opacity: dark ? 0.3 : 0.45,
        }}
      />
      <span
        className="mand par"
        aria-hidden="true"
        style={{
          '--f': 0.1,
          '--r': 0.05,
          [k % 2 ? 'left' : 'right']: -90,
          top: `${8 + (k % 3) * 18}%`,
          color: dark ? '#E8B923' : '#0B6B4B',
        }}
        dangerouslySetInnerHTML={{ __html: MANDALA }}
      />
      {dots}
    </>
  );
}

// Tiny drifting sparkles added at the end of light sections
export function Glitter() {
  const sparks = useMemo(
    () =>
      [...Array(8)].map(() => ({
        '--x': `${Math.random() * 100}%`,
        '--s': `${6 + Math.random() * 10}px`,
        '--t': `${10 + Math.random() * 10}s`,
        '--dl': `${-Math.random() * 14}s`,
        '--dx': `${Math.random() * 90 - 45}px`,
      })),
    []
  );
  return sparks.map((style, i) => <i key={i} className="gd gl" style={style} />);
}
