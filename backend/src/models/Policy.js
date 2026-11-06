import mongoose from 'mongoose';

const policySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // privacy | shipping | returns | terms
    title: { type: String, required: true },
    sections: [{ heading: String, body: String, _id: false }],
  },
  { timestamps: true }
);

export default mongoose.model('Policy', policySchema);
