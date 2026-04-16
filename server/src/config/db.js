import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  try {
    if (!env.mongoUri) {
        throw new Error("MONGO_URI environment variable is completely missing. Refusing to fallback to local MongoDB.");
    }
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.mongoUri, { 
      autoIndex: env.nodeEnv !== "production" 
    });
    // eslint-disable-next-line no-console
    console.log("MongoDB Connected ✅");
    return mongoose.connection;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("MongoDB Connection Error ❌", error.message);
    throw error;
  }
}
