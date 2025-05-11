import "server-only";

import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth";
import { gardenRouter } from "~/server/api/routers/garden";
import { containerRouter } from "~/server/api/routers/container";
import { cropRouter } from "~/server/api/routers/crop";
import { userLevelRouter } from "~/server/api/routers/user-level";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  garden: gardenRouter,
  container: containerRouter,
  crop: cropRouter,
  userLevel: userLevelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
