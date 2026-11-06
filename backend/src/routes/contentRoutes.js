import { Router } from 'express';
import { getSite, getFaqs, getPolicy } from '../controllers/contentController.js';

const router = Router();
router.get('/site', getSite);
router.get('/faqs', getFaqs);
router.get('/policies/:key', getPolicy);
export default router;
