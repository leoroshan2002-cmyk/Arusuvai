import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/categories  -> each category with its product count
export const getCategories = asyncHandler(async (_req, res) => {
  const [categories, counts] = await Promise.all([
    Category.find().sort({ order: 1 }).lean(),
    Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
  ]);
  const map = Object.fromEntries(counts.map((c) => [c._id, c.count]));
  res.json({
    success: true,
    data: categories.map((c) => ({ ...c, productCount: map[c.name] || 0 })),
  });
});
