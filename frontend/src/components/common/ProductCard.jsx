import { Link } from 'react-router-dom';
import { useCatalog } from '../../context/CatalogContext';
import { useCart } from '../../context/CartContext';
import { imgSrc, priceText } from '../../utils/helpers';
import { productEnquiryText } from '../../utils/whatsapp';

export default function ProductCard({ product: p, index = 0 }) {
  const { colorOf, wa } = useCatalog();
  const { addToCart } = useCart();

  return (
    <article className="card rv" style={{ '--d': `${(index % 4) * 0.08}s`, '--cc': colorOf(p.category) }}>
      <Link to={`/p/${p.slug}`} className="im" aria-label={`${p.nameEn} details`}>
        <img src={imgSrc(p.image)} alt={`${p.nameEn} (${p.nameTa}) in a wooden bowl`} loading="lazy" width="640" height="500" />
      </Link>
      <div className="cb">
        <small>{p.category}</small>
        <h3>{p.nameEn}</h3>
        <span className="ta">{p.nameTa}</span>
        <span className="product-card-price ">{priceText(p)}</span>
        <div className="ar">
          <button className="btn" onClick={(e) => addToCart(p, e.currentTarget.closest('.card').querySelector('.im img'))}>
            Add to Cart
          </button>
          <a className="btn line" target="_blank" rel="noopener noreferrer" href={wa(productEnquiryText(p))}>
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
