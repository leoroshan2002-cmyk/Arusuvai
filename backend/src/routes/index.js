import { Router } from 'express';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import contentRoutes from './contentRoutes.js';

const router = Router();
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/', contentRoutes);
export default router;
