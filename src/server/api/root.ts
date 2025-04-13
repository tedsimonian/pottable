import "server-only";
import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { authRouter } from "~/server/api/routers/auth";
import { gardenRouter } from "~/server/api/routers/garden";
import { containerRouter } from "~/server/api/routers/container";
import { cropRouter } from "~/server/api/routers/crop";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  garden: gardenRouter,
  container: containerRouter,
  crop: cropRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
