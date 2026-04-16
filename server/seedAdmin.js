import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDb } from "./src/config/db.js";
import { User } from "./src/models/User.js";

async function run() {
  try {
    await connectDb();
    const adminEmail = "admin@medoswift.dev";
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      console.log("Admin not found. Creating admin user...");
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      admin = new User({
        name: "Admin",
        email: adminEmail,
        passwordHash: hashedPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Admin user seeded successfully.");
    } else {
      console.log("Admin user already exists in the database.");
    }
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

run();
