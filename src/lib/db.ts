// File: db.ts
// Folder: src/lib
// Role: Global database client singleton using Prisma v7 Driver Adapter

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // 1. Create a standard Postgres connection pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  // 2. Wrap it in the Prisma Adapter
  const adapter = new PrismaPg(pool);

  // 3. Pass the adapter to your generated client
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}