import "server-only";

import { prismaAdapter } from "better-auth/adapters/prisma";
import type { BetterAuthOptions } from "better-auth";
import { createAuthMiddleware } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

import { db } from "~/server/db";
import { env } from "~/env";
import { trackServerEvent } from "../posthog";
import { SOCIAL_PROVIDERS } from "~/lib/constants";

/**
 * Options for Better-Auth.js used to configure adapters, providers, callbacks, etc.
 *
 */
export const authConfig = {
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  logger: {
    level: "debug",
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  plugins: [nextCookies()],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (!ctx.path.includes("callback")) return;

      const { newSession } = ctx.context;

      if (!newSession) {
        console.log("No session data available");
        return;
      }

      // Get the user's creation time from the database
      const dbUser = await db.user.findUnique({
        where: { id: newSession.user.id },
        select: { createdAt: true },
      });

      // If createdAt is within the last few seconds, it's a new user
      const isNewUser =
        dbUser && Date.now() - dbUser.createdAt.getTime() < 5000; // Within last 5 seconds

      if (isNewUser) {
        trackServerEvent("user registered", {
          distinctId: newSession.user.id,
          properties: {
            name: newSession.user.name,
            email: newSession.user.email,
            provider: SOCIAL_PROVIDERS.GITHUB,
            login_type: "social",
          },
        });
      } else {
        trackServerEvent("user signed in", {
          distinctId: newSession.user.id,
          properties: {
            name: newSession.user.name,
            email: newSession.user.email,
            provider: SOCIAL_PROVIDERS.GITHUB,
            login_type: "social",
          },
        });
      }
    }),
  },
} satisfies BetterAuthOptions;
