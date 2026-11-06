import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../utils/helpers';
import { spiceSvg } from '../../utils/art/spiceShapes';

// Splash screen shown for 1.5s on first load.
export default function Loader() {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setOut(true);
      document.body.classList.remove('ld');
      setTimeout(() => setGone(true), 900);
    }, prefersReducedMotion() ? 0 : 1500);
    return () => clearTimeout(t1);
  }, []);

  if (gone) return null;
  return (
    <div id="ld" className={out ? 'out' : ''} aria-hidden="true">
      <div className="ldc">
        <svg className="ldr" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" />
        </svg>
        <span className="ldp">
          <img id="ldi" src="/images/logo.webp" alt="" />
        </span>
        <i className="ldx" dangerouslySetInnerHTML={{ __html: spiceSvg('anise') }} />
      </div>
      <p>ARUSUVAI</p>
    </div>
  );
}
