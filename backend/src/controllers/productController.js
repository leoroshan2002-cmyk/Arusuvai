import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/products?category=Spices&search=cardamom&featured=true
export const getProducts = asyncHandler(async (req, res) => {
  const { category, search, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (featured === 'true') filter.featured = true;
  if (search) {
    const rx = new RegExp(escapeRegex(String(search).trim()), 'i');
    filter.$or = [{ nameEn: rx }, { nameTa: rx }, { category: rx }];
  }
  const sort = featured === 'true' ? { featuredOrder: 1 } : { order: 1 };
  const products = await Product.find(filter).sort(sort);
  res.json({ success: true, count: products.length, data: products });
});

// GET /api/products/:slug  -> product + related + prev/next (circular, like the original site)
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const all = await Product.find().sort({ order: 1 }).select('slug nameEn image');
  const i = all.findIndex((p) => p.slug === product.slug);
  const prev = all[(i - 1 + all.length) % all.length];
  const next = all[(i + 1) % all.length];
  const related = await Product.find({ category: product.category, slug: { $ne: product.slug } })
    .sort({ order: 1 })
    .limit(4);

  res.json({ success: true, data: { product, prev, next, related } });
});
