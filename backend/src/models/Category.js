import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true }, // e.g. "Dals & Pulses" (matches Product.category)
    title: { type: String, required: true, trim: true }, // display title on the home page
    color: { type: String, default: '#D9A441' }, // accent colour used for cards
    image: { type: String, required: true }, // image key shown when hovering the category tile
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);
