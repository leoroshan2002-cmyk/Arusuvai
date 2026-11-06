import Faq from '../models/Faq.js';
import Policy from '../models/Policy.js';
import { SITE } from '../config/site.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/site  -> contact details used across the frontend
export const getSite = (_req, res) => res.json({ success: true, data: SITE });

// GET /api/faqs
export const getFaqs = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await Faq.find().sort({ order: 1 }) });
});

// GET /api/policies/:key
export const getPolicy = asyncHandler(async (req, res) => {
  const policy = (await Policy.findOne({ key: req.params.key })) || (await Policy.findOne({ key: 'privacy' }));
  if (!policy) return res.status(404).json({ success: false, message: 'Policy not found' });
  res.json({ success: true, data: policy });
});
