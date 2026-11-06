import { useCatalog } from '../../context/CatalogContext';

// Scrolling ribbon of product names (English ◆ Tamil), with a Tamil-only reverse row.
export default function Marquee() {
  const { products } = useCatalog();
  const doubled = [...products, ...products];
  return (
    <div className="mq" aria-hidden="true">
      <div>
        {doubled.map((p, i) => (
          <span key={i}>
            {p.nameEn}
            <i>◆</i>
            {p.nameTa}
            <i>◆</i>
          </span>
        ))}
      </div>
      <div className="rev">
        {doubled.map((p, i) => (
          <span key={i}>
            {p.nameTa}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
