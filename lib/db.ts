import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";


const globalForPrisma = globalThis as unknown as {
    db: PrismaClient | undefined;
};

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

export const db = globalForPrisma.db ?? new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV  !== "production") {
    globalForPrisma.db = db; 
}