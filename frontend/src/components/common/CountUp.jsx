import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/helpers';

// Number that counts up from 0 when it scrolls into view.
export default function CountUp({ to }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return setValue(to);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  return <b ref={ref}>{value}</b>;
}
