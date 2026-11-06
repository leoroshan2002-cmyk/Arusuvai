import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    business: { type: String, required: true, trim: true, minlength: 2 },
    buyerType: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: '' },
    country: { type: String, required: true, trim: true },
    products: { type: String, required: true, trim: true },
    quantities: { type: String, required: true, trim: true },
    packSizes: { type: String, trim: true, default: '' },
    deliveryLocation: { type: String, required: true, trim: true },
    notes: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
