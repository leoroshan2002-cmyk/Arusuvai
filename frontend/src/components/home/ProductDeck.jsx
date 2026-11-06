import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { imgSrc } from '../../utils/helpers';
import { mandalaHtml } from '../../utils/art/mandala';

const MANDALA = mandalaHtml();

// Rotating "Fresh picks" card stack in the hero. Pauses while the mouse is over it.
export default function ProductDeck() {
  const { featured, colorOf } = useCatalog();
  const [current, setCurrent] = useState(0);
  const [hold, setHold] = useState(false);
  const n = featured.length;

  useEffect(() => {
    if (hold || !n) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % n), 3200);
    return () => clearInterval(id);
  }, [hold, n]);

  if (!n) return null;
  return (
    <div className="deck" id="dk" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <span className="dmd" dangerouslySetInnerHTML={{ __html: MANDALA }} />
      <span className="dgl" />
      <span className="dtag">Fresh picks</span>

      {featured.map((p, i) => (
        <Link key={p.slug} className="dc" data-p={(i - current + n) % n} to={`/p/${p.slug}`} style={{ '--cc': colorOf(p.category) }} aria-label={p.nameEn}>
          <span className="dm">
            <img src={imgSrc(p.image)} alt={p.nameEn} />
          </span>
          <span className="dt">
            <small>{p.category}</small>
            <b>{p.nameEn}</b>
            <span className="ta">{p.nameTa}</span>
            <span className="go">
              <span>Ask for current price</span>
              <span>View →</span>
            </span>
          </span>
        </Link>
      ))}

      <div className="dd">
        {featured.map((p, i) => (
          <i key={p.slug} className={i === current ? 'on' : ''} role="button" aria-label={`Show product ${i + 1}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
    </div>
  );
}
