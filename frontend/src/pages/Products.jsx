import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Section from '../components/common/Section';
import Heading from '../components/common/Heading';
import ProductGrid from '../components/common/ProductGrid';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useCatalog } from '../context/CatalogContext';
import { imgSrc } from '../utils/helpers';

// Wooden beam with every product hanging from it – each one links to its page.
function HangingProducts({ products, colorOf }) {
  return (
    <div className="hang">
      <div className="beam" />
      <div className="hrow">
        {products.map((p, i) => (
          <Link key={p.slug} className="hk" to={`/p/${p.slug}`} aria-label={p.nameEn} style={{ '--i': i, '--r': `${14 + (i % 4) * 15}px`, '--c': colorOf(p.category) }}>
            <i className="rope" />
            <span className="hkb">
              <img src={imgSrc(p.image)} alt="" />
            </span>
            <small>{p.nameEn}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  useDocumentTitle('Arusuvai Foods | Products');
  const { products, categories, colorOf } = useCatalog();
  const { category: categoryParam } = useParams(); // /products/:category
  const [category, setCategory] = useState(categoryParam ? decodeURIComponent(categoryParam) : '');
  const [query, setQuery] = useState('');

  useEffect(() => setCategory(categoryParam ? decodeURIComponent(categoryParam) : ''), [categoryParam]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => (!category || p.category === category) && (!q || `${p.nameEn} ${p.nameTa} ${p.category}`.toLowerCase().includes(q))
    );
  }, [products, category, query]);

  const reset = () => {
    setCategory('');
    setQuery('');
  };

  return (
    <Section k={0} className="pg">
      <div className="wrap">
        <div className="eye">Our Products · எங்கள் தயாரிப்புகள்</div>
        <Heading as="h1" style={{ fontSize: 'clamp(2.4rem,6vw,4.4rem)' }}>
          Spices, dals &amp; <em>pantry favourites.</em>
        </Heading>
        <p className="lead">All {products.length} products with English and Tamil names. Tap Enquire for current price, pack sizes and delivery.</p>

        <HangingProducts products={products} colorOf={colorOf} />

        <div className="tool">
          <input id="q" type="search" placeholder="Search products in English or தமிழ்" aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />
          <div className="chips" id="ch">
            {[{ name: '' , label: 'All' }, ...categories.map((c) => ({ name: c.name, label: c.name }))].map((c) => (
              <button key={c.label} className="chip" aria-pressed={category === c.name} onClick={() => setCategory(c.name)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <p id="ct" style={{ marginTop: 18, color: 'var(--mu)' }} aria-live="polite">
          {filtered.length} of {products.length} products
        </p>

        {filtered.length ? (
          <ProductGrid products={filtered} id="pg" />
        ) : (
          <div className="grid" id="pg">
            <div className="empty">
              <p>No products match your search.</p>
              <button className="btn line" style={{ marginTop: 14 }} onClick={reset}>
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
