import { Link } from 'react-router-dom';
import Section from '../common/Section';
import Heading from '../common/Heading';
import ProductGrid from '../common/ProductGrid';
import { useCatalog } from '../../context/CatalogContext';

export default function FeaturedSection({ k }) {
  const { featured } = useCatalog();
  return (
    <Section k={k}>
      <div className="wrap">
        <div className="eye">Featured</div>
        <Heading className="rv">
          From our <em>pantry</em> to yours.
        </Heading>
        <ProductGrid products={featured} />
        <div className="cta">
          <Link className="btn" to="/products">
            View All Products <i>→</i>
          </Link>
        </div>
      </div>
    </Section>
  );
}
