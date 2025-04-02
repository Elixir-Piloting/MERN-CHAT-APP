const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const MONGO_URI = process.env.MONGO_URI;  // Ensure this exists in your .env file

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ Connected to MongoDB`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;
