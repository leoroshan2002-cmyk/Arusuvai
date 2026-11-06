import { useEffect, useRef } from 'react';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import CtaBand from '../components/common/CtaBand';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useCatalog } from '../context/CatalogContext';
import { ICON_PLANT, ICON_SUN, ICON_TICK, ICON_BOWL } from '../utils/art/icons';
import { clamp } from '../utils/helpers';

const JOURNEY = [
  ['Soil', 'Rooted in Tamil Nadu', 'Every pantry favourite begins with good soil, patient hands and the turn of the seasons.', ICON_PLANT],
  ['Sun', 'Ripened by the sun', 'Long sunny days bring out the colour, aroma and flavour of spices, pulses and seeds.', ICON_SUN],
  ['Care', 'Chosen with care', 'We select suitable products and share clear details about name, pack size and price.', ICON_TICK],
  ['Kitchen', 'Ready for your kitchen', 'Explore the range and enquire on WhatsApp for current prices and delivery.', ICON_BOWL],
];

// A vine that "grows" down the page as you scroll, revealing four journey steps.
function Vine() {
  const ref = useRef(null);
  useEffect(() => {
    const vine = ref.current;
    const items = [...vine.querySelectorAll('.vc')];
    const update = () => {
      const r = vine.getBoundingClientRect();
      const vh = window.innerHeight;
      vine.style.setProperty('--vp', clamp((vh * 0.6 - r.top) / r.height).toFixed(3));
      items.forEach((c) => c.classList.toggle('on', c.getBoundingClientRect().top < vh * 0.65));
    };
    update();
    const t = setTimeout(update, 250);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="vine" ref={ref}>
      <i className="vl" />
      {JOURNEY.map(([tag, title, text, icon], i) => (
        <div key={tag} className={`vc ${i % 2 ? 'r' : 'l'}`}>
          <i className="vn" />
          <div className="vi2" dangerouslySetInnerHTML={{ __html: icon }} />
          <div className="vt">
            <small>
              0{i + 1} · {tag}
            </small>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const VALUES = [
  ['MISSION', 'To make everyday cooking essentials accessible through thoughtful selection, clear information and customer-friendly service.'],
  ['VISION', 'To become a trusted name for pantry essentials and familiar flavours.'],
  ['Quality', 'Choose suitable products and provide accurate details.'],
  ['Freshness', 'Appropriate storage and stock rotation matter.'],
  ['Taste', 'Celebrate the ingredients behind familiar everyday meals.'],
  ['Trust', 'Communicate weights, prices, availability and delivery terms honestly.'],
];

export default function About() {
  useDocumentTitle('Arusuvai Foods | About');
  const { site } = useCatalog();

  return (
    <>
      <Section k={0} className="pg">
        <div className="wrap">
          <div className="eye">About Arusuvai</div>
          <Heading as="h1">
            Rooted in Tradition. <em>Chosen with Care.</em>
          </Heading>

          <div className="bigm" aria-hidden="true">
            <div>{'Quality ✦ Freshness ✦ Taste ✦ Trust ✦ '.repeat(4)}</div>
            <div className="r2">{'தரம் ✦ புத்துணர்ச்சி ✦ சுவை ✦ நம்பிக்கை ✦ '.repeat(4)}</div>
          </div>

          <div className="split" style={{ marginTop: 50, alignItems: 'start' }}>
            <p className="lead rv" style={{ margin: 0, fontSize: '1.1rem' }}>
              Arusuvai celebrates the familiar flavours of Tamil Nadu and the everyday rituals of home cooking. From weekday sambar and comforting rasam to festive sweets and family gatherings, good ingredients help bring people together. Our aim is to make essential spices, pulses, seeds and pantry favourites easy to discover, with clear information and helpful service. As Arusuvai grows, we want to build lasting relationships with families, retailers and food businesses through honest communication and dependable product handling.
            </p>
            <div className="rv" style={{ '--d': '.15s' }}>
              <div className="card" style={{ padding: 26 }}>
                <small style={{ color: 'var(--gb)', fontWeight: 700, letterSpacing: '.14em' }}>COMPANY</small>
                <h3 style={{ margin: '8px 0' }}>Arusuvai Foods</h3>
                <p>
                  Operating company: {site?.company}
                  <br />
                  {site?.address}
                  <br />
                  {site?.ownerTitle}: {site?.owner}
                </p>
              </div>
            </div>
          </div>

          <div className="eye" style={{ marginTop: 80 }}>
            Our Journey
          </div>
          <h2>
            From the soil to <em>your kitchen.</em>
          </h2>
          <Vine />

          <div className="vals">
            {VALUES.map(([label, text], i) => (
              <div key={label} className="rv" style={{ '--i': i, ...(i === 1 ? { '--d': '.1s' } : {}) }}>
                {i < 2 ? <small>{label}</small> : <b>{label}</b>}
                {i < 2 ? <p>{text}</p> : text}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <CtaBand k={1} />
    </>
  );
}
