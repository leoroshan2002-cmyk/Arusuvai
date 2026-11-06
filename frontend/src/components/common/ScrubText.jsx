import { Fragment, useEffect, useRef } from 'react';
import { clamp } from '../../utils/helpers';

// Paragraph whose words light up one by one as you scroll past it.
export default function ScrubText({ children, className = 'lead scrub' }) {
  const ref = useRef(null);
  const words = children.trim().split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    const spans = [...el.querySelectorAll('.sw')];
    let last = -1;
    const update = () => {
      const vh = window.innerHeight;
      const k = Math.round(clamp((vh * 0.88 - el.getBoundingClientRect().top) / (vh * 0.46)) * spans.length);
      if (k === last) return;
      spans.forEach((w, i) => w.classList.toggle('on', i < k));
      last = k;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <p ref={ref} className={className} aria-label={children.trim()}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="sw" aria-hidden="true">
            {w}
          </span>
        </Fragment>
      ))}
    </p>
  );
}
