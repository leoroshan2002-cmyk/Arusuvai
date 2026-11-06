import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createEnquiry, listEnquiries, updateEnquiryStatus } from '../controllers/enquiryController.js';
import { validateEnquiry } from '../middleware/validateEnquiry.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

router.post('/', limiter, validateEnquiry, createEnquiry);
router.get('/', adminAuth, listEnquiries);
router.patch('/:id', adminAuth, updateEnquiryStatus);
export default router;
