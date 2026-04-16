import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDb } from "./src/config/db.js";
import { User } from "./src/models/User.js";
import { DoctorProfile } from "./src/models/DoctorProfile.js";

async function verifyDB() {
  console.log("=== DB AUDIT START ===");
  try {
    await connectDb();
    
    const userCount = await User.countDocuments();
    console.log(`\n1. Users in database: ${userCount}`);
    
    const roles = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]);
    console.log("Role distribution:");
    roles.forEach(r => console.log(`   - ${r._id}: ${r.count}`));
    
    console.log("\n2. Validating required accounts:");
    const accountsToCheck = [
      { email: "admin@medoswift.dev", role: "admin", label: "Admin" },
      { email: "user@medoswift.dev", role: "user", label: "User" },
      { email: "aditi@medoswift.dev", role: "doctor", label: "Doctor" },
    ];
    
    for (const acc of accountsToCheck) {
      const u = await User.findOne({ email: acc.email });
      if (u) {
        console.log(`✅ ${acc.label} (${acc.email}) exists with role: '${u.role}'`);
        // Test auth flow manually using bcrypt.compare (assuming standard password config or the ones we seeded)
        // I won't print the hash, just verify it exists
        if (u.passwordHash) {
             console.log(`   -> Password hash is present.`);
        } else {
             console.error(`❌ -> Missing password hash!`);
        }
      } else {
        console.error(`❌ ${acc.label} (${acc.email}) is MISSING from database!`);
      }
    }

    console.log("\n3. Testing bcrypt auth for Admin (Admin@123):");
    const admin = await User.findOne({ email: "admin@medoswift.dev" });
    if (admin) {
        const ok = await bcrypt.compare("Admin@123", admin.passwordHash);
        if (ok) console.log("   ✅ password matches correctly via bcrypt.compare!");
        else console.log("   ❌ password does NOT match.");
    }

    console.log("\n4. Checking if any doctor profiles exist:");
    const doctorCount = await DoctorProfile.countDocuments();
    console.log(`   Total DoctorProfiles: ${doctorCount}`);
    
    // Check missing images/UI context (sections collection)
    const sectionsCollection = mongoose.connection.collection('sections');
    if (sectionsCollection) {
        const sectionCount = await sectionsCollection.countDocuments();
        console.log(`\n5. Sections collection (UI Banners) count: ${sectionCount}`);
    } else {
        console.log("\n5. Sections collection does not exist.");
    }

    console.log("\n=== DB AUDIT COMPLETE ===");
    process.exit(0);
  } catch(e) {
    console.error("DB Verifier Failed:", e);
    process.exit(1);
  }
}
verifyDB();
