import "server-only";

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "~/generated/prisma-client";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      // env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      ["error"],
  }).$extends(withAccelerate());

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

export type DBSession = typeof db;

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
