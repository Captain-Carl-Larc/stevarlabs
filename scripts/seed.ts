// File: seed.ts
// Folder: scripts
// Description: Terminal script to inject active, verified test users into the database.

import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Starting database seeding...");

  // Hash a default password that all test users will share
  const passwordHash = await bcrypt.hash("password123", 12);

  // Array of test users to create
  const testUsers = [
    {
      name: "Jane Editor",
      email: "jane.editor@example.com",
      role: "EDITOR",
      status: "ACTIVE",
    },
    {
      name: "Mark Admin",
      email: "mark.admin@example.com",
      role: "ADMIN",
      status: "ACTIVE",
    },
    {
      name: "Suspended Sam",
      email: "sam.suspended@example.com",
      role: "EDITOR",
      status: "DEACTIVATED", // Using DEACTIVATED to match your schema
    }
  ];

  for (const u of testUsers) {
    // Upsert ensures we don't accidentally create duplicates
    const user = await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role as any,
        status: u.status as any,
        emailVerifiedAt: new Date(), // Hardcode them as already verified
      },
    });
    console.log(`✅ Created user: ${user.name} (${user.email})`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  });