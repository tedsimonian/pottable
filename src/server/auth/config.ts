import { prismaAdapter } from "better-auth/adapters/prisma";
import type { BetterAuthOptions } from "better-auth";
import { admin, createAuthMiddleware } from "better-auth/plugins";

import { db } from "~/server/db";
import { env } from "~/env";
import { trackServerEvent } from "../posthog";
import { SOCIAL_PROVIDERS } from "~/constants";
import {
  accessControl,
  adminRole,
  superAdminRole,
  userRole,
} from "~/permissions";

/**
 * Options for Better-Auth.js used to configure adapters, providers, callbacks, etc.
 *
 */
export const authConfig = {
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    admin({
      ac: accessControl,
      roles: {
        admin: adminRole,
        user: userRole,
        superAdmin: superAdminRole,
      },
    }),
  ],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-in")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          console.log("After hook: User Registered");
          trackServerEvent("User Registered", {
            distinctId: newSession.user.id,
            properties: {
              name: newSession.user.name,
              email: newSession.user.email,
              provider: SOCIAL_PROVIDERS.GITHUB,
            },
          });
        } else {
          const session = ctx.context.session;
          if (session) {
            console.log("After hook: User Signed In");
            trackServerEvent("User Signed In", {
              distinctId: session.user.id,
              properties: {
                name: session.user.name,
                email: session.user.email,
                provider: SOCIAL_PROVIDERS.GITHUB,
              },
            });
          }
        }
      }
    }),
  },
} satisfies BetterAuthOptions;
