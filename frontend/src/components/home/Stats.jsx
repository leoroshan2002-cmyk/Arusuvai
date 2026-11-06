import Section from '../common/Section';
import CountUp from '../common/CountUp';
import { useCatalog } from '../../context/CatalogContext';

export default function Stats({ k }) {
  const { products, categories } = useCatalog();
  const stats = [
    { n: 2, label: 'Languages · English & தமிழ்' },
    { n: products.length, label: 'Products' },
    { n: categories.length, label: 'Categories' },
  ];
  return (
    <Section k={k} className="dk stats">
      <div className="wrap">
        {stats.map((s, i) => (
          <div key={s.label} className="stat rv" style={i ? { '--d': `${i * 0.1}s` } : undefined}>
            <CountUp to={s.n} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
