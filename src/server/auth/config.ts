import { prismaAdapter } from "better-auth/adapters/prisma";
import type { BetterAuthOptions } from "better-auth";
import { admin } from "better-auth/plugins";

import { db } from "~/server/db";
import { env } from "~/env";

/**
 * Options for Better-Auth.js used to configure adapters, providers, callbacks, etc.
 *
 */
export const authConfig = {
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET as string,
  plugins: [admin()],
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID as string,
      clientSecret: env.AUTH_GITHUB_SECRET as string,
    },
  },
} satisfies BetterAuthOptions;
