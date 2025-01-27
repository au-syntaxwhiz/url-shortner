import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectToDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      logger.error("MONGO_URI is not defined in the environment variables");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    logger.info("Successfully connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", { error });
    process.exit(1);
  }
};
