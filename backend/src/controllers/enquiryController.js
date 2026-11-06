import Enquiry from '../models/Enquiry.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { buildEnquiryMessage, whatsappLink } from '../utils/whatsapp.js';

// POST /api/enquiries  -> saves the wholesale enquiry and returns a ready WhatsApp link
export const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Enquiry saved',
    id: enquiry._id,
    whatsappUrl: whatsappLink(buildEnquiryMessage(enquiry)),
  });
});

// GET /api/enquiries  (admin only)
export const listEnquiries = asyncHandler(async (_req, res) => {
  const data = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: data.length, data });
});

// PATCH /api/enquiries/:id  { status }  (admin only)
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
  res.json({ success: true, data: enquiry });
});
