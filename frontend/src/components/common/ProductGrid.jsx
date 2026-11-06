import ProductCard from './ProductCard';

export default function ProductGrid({ products, id }) {
  return (
    <div className="grid" id={id}>
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
