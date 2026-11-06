import { ICON_SUN, ICON_PLANT, ICON_BOWL } from '../../utils/art/icons';

const ITEMS = [
  { icon: ICON_SUN, title: 'Quality', text: 'We aim to select suitable products and provide accurate details about product name, pack size and price.' },
  { icon: ICON_PLANT, title: 'Freshness', text: 'Appropriate storage, hygienic handling and stock rotation matter for pantry products.' },
  { icon: ICON_BOWL, title: 'Taste', text: 'Everyday ingredients help create the dishes families know and love.' },
];

// "Quality / Freshness / Taste" three-column block.
export default function QualityBlock({ ticks = false }) {
  return (
    <>
      {ticks && (
        <ul className="tick">
          {['Accurate product details', 'Hygienic handling', 'Stock rotation'].map((t, i) => (
            <li key={t} style={{ '--i': i }}>
              <svg viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="12" />
                <path pathLength="1" d="M8 14l4 4 8-9" />
              </svg>
              {t}
            </li>
          ))}
        </ul>
      )}
      <div className="q3">
        {ITEMS.map((it, i) => (
          <div key={it.title} className="rv" style={i ? { '--d': `${i * 0.12}s` } : undefined}>
            <i className="qi" dangerouslySetInnerHTML={{ __html: it.icon }} />
            <b>{it.title}</b>
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
