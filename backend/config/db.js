const mongoose = require('mongoose');
const dns = require('dns');

// Use reliable public DNS servers for MongoDB Atlas SRV resolution.
dns.setServers(['8.8.8.8', '1.1.1.1']);

async function connectDB() {
  try {
    if (process.env.DEMO_MODE === 'true' && !process.env.MONGODB_URI) {
      console.log('[db] Demo mode: skipping MongoDB connection.');
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured in backend/.env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log('[db] MongoDB connected.');
  } catch (err) {
    console.error('[db] Connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;