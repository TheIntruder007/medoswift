import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function checkLocalDB() {
  const uri = process.env.MONGO_URI;
  console.log(`Attempting to connect to ${uri}...`);

  try {
    await mongoose.connect(uri);
    console.log("Connected to Local MongoDB successfully.");

    const collections = [
      "users",
      "doctorprofiles",
      "medicines",
      "appointments",
      "prescriptions",
      "orders",
      "reminders",
      "subscriptions",
      "sections"
    ];

    let hasData = false;

    for (const name of collections) {
      console.log(`\n--- Collection: ${name} ---`);
      
      const coll = mongoose.connection.collection(name);
      const count = await coll.countDocuments();
      
      console.log(`Count: ${count}`);

      if (count > 0) {
        hasData = true;
        const sample = await coll.findOne({});
        if (sample) {
          // Remove sensitive fields
          delete sample.passwordHash;
          delete sample.password;
          
          console.log("Sample Document:");
          console.dir(sample, { depth: 2, colors: true });
        }
      } else {
        console.log("No documents found in this collection.");
      }
    }

    console.log("\n===========================");
    if (hasData) {
      console.log("RESULT: Local DB has data");
    } else {
      console.log("RESULT: Local DB is empty");
    }
    console.log("===========================");

    await mongoose.disconnect();
    process.exit(0);

  } catch (err) {
    console.error("Failed to check local MongoDB:", err.message);
    process.exit(1);
  }
}

checkLocalDB();
