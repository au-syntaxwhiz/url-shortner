import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/url-shortener";
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
