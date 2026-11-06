import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Faq from '../models/Faq.js';
import Policy from '../models/Policy.js';
import { categories, products, faqs, policies } from './data.js';

await connectDB();
await Promise.all([Category.deleteMany(), Product.deleteMany(), Faq.deleteMany(), Policy.deleteMany()]);
await Promise.all([
  Category.insertMany(categories),
  Product.insertMany(products),
  Faq.insertMany(faqs),
  Policy.insertMany(policies),
]);
console.log(`🌱 Seeded ${categories.length} categories, ${products.length} products, ${faqs.length} FAQs, ${policies.length} policies`);
await mongoose.disconnect();
