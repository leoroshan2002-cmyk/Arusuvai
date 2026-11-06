import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    nameEn: { type: String, required: true, trim: true },
    nameTa: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true }, // Category.name
    image: { type: String, required: true }, // file name (without .webp) in frontend/public/images
    price: { type: Number, default: null },
    currency: { type: String, default: 'INR' },
    pack: { type: String, default: '500 g (to be confirmed)' },
    approved: { type: Boolean, default: false }, // price is shown only when approved
    featured: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 0 }, // position in the home page "Fresh picks" deck
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.index({ nameEn: 'text', nameTa: 'text', category: 'text' });

// Same wording as the original site
productSchema.virtual('priceLabel').get(function () {
  return this.approved && this.price ? `₹${this.price} / ${this.pack}` : 'Ask for Current Price';
});
productSchema.set('toJSON', { virtuals: true, versionKey: false });

export default mongoose.model('Product', productSchema);
