import 'dotenv/config';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌿 Arusuvai API running on http://localhost:${PORT}`);
  void connectWithRetry();
});

async function connectWithRetry() {
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI must be set in production; database-backed routes will be unavailable');
    return;
  }

  let retryDelay = 5000;
  while (true) {
    try {
      await connectDB();
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection failed: ${err.message}. Retrying in ${retryDelay / 1000}s`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retryDelay = Math.min(retryDelay * 2, 60000);
    }
  }
}
