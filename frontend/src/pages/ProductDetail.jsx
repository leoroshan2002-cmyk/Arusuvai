import { Link, useParams } from 'react-router-dom';
import Section from '../components/common/Section';
import NotFound from './NotFound';
import '../styles/pages/ProductDetail.css';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useFetch from '../hooks/useFetch';
import { api } from '../api/client';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { imgSrc, priceText } from '../utils/helpers';
import { productEnquiryText } from '../utils/whatsapp';

export default function ProductDetail() {
  const { slug } = useParams();
  const { wa } = useCatalog();
  const { addToCart } = useCart();
  const { data, loading, error } = useFetch(() => api.getProduct(slug), [slug]);

  useDocumentTitle(data ? `Arusuvai Foods | ${data.product.nameEn}` : 'Arusuvai Foods');

  if (error?.status === 404) return <NotFound />;
  if (loading || !data) return <Section k={0} className="pg" style={{ minHeight: '70vh' }} />;

  const { product: p } = data;

  return (
    <Section k={0} className="pg product-page">
      <div className="wrap product-detail-wrap">
        <div className="product-detail-card">
          <div className="product-detail-image-wrap">
            <img
              src={imgSrc(p.image)}
              alt={`${p.nameEn} (${p.nameTa}) in a wooden bowl`}
              className="product-detail-image"
              width="640"
              height="500"
            />
          </div>

          <div className="product-detail-body">
            <div className="product-detail-category">{p.category.toUpperCase()}</div>
            <h1 className="product-detail-name">{p.nameEn}</h1>
            <p className="ta product-detail-name-ta">{p.nameTa}</p>

            <button
              className="product-detail-primary"
              onClick={() => addToCart(p, document.querySelector('.product-detail-image'))}
            >
              Add to Cart
            </button>

            <div className="product-detail-meta">
              <a
                className="product-detail-link"
                href={wa(productEnquiryText(p))}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire
              </a>
              <span className="product-detail-price-block">Ask for Current Price </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
