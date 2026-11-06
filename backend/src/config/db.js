import mongoose from 'mongoose';

export default async function connectDB() {
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI must be set in production');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arusuvai';
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
