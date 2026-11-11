import mongoose from 'mongoose';

export default async function connectDB() {
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI must be set in production');
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arusuvai';
  await mongoose.connect(uri);
  console.log('✅ MongoDB connected');
}
