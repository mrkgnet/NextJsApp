import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/phone"; // اسم دیتابیس تو

if (!MONGODB_URI) {
  throw new Error("⚠️  MongoDB connection string is missing!");
}

// کش برای نگه‌داشتن اتصال و جلوگیری از چندبار کانکت شدن
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = !!db.connections[0].readyState;
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
