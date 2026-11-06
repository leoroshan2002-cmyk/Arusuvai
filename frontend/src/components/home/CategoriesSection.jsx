import { Link } from 'react-router-dom';
import Section from '../common/Section';
import Heading from '../common/Heading';
import { useCatalog } from '../../context/CatalogContext';
import { imgSrc } from '../../utils/helpers';

export default function CategoriesSection({ k }) {
  const { categories } = useCatalog();
  return (
    <Section k={k} className="cr">
      <div className="wrap">
        <div className="eye">Categories</div>
        <Heading className="rv">
          Five shelves of <em>everyday</em> flavour.
        </Heading>
        <div className="cats">
          {categories.map((c, i) => (
            <Link key={c._id} className="cat rv" style={{ '--d': `${i * 0.08}s`, '--cc': c.color }} to={`/products/${encodeURIComponent(c.name)}`}>
              <span className="n">0{i + 1}</span>
              <img className="cp" src={imgSrc(c.image)} alt="" loading="lazy" />
              <div>
                <small>{c.productCount} PRODUCTS</small>
                <br />
                <b>{c.title}</b>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
