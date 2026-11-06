import SectionDecor, { Glitter } from './SectionDecor';
import { BandScene, MiniScene } from '../art/Scenes';

// A page section (.sec) that adds the decorative layers the original design has.
//   k      – index of the section on the page (varies decoration colours)
//   before – nodes rendered before the decoration (e.g. the Quality seal)
export default function Section({ k = 0, className = '', before = null, children, ...rest }) {
  const has = (c) => className.split(/\s+/).includes(c);
  const dark = has('dk') || has('band');

  return (
    <section className={`sec ${className}`.trim()} {...rest}>
      {before}
      {has('band') && <BandScene />}
      {has('pg') && !has('dk') && <MiniScene />}
      <SectionDecor k={k} dark={dark} />
      {children}
      {!has('dk') && !has('stats') && <Glitter />}
    </section>
  );
}
