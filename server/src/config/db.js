import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  try {
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
