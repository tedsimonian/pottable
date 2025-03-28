import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import {
  accessControl,
  adminRole,
  superAdminRole,
  userRole,
} from "~/permissions";
import { getBaseUrl } from "~/lib/utils";

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    adminClient({
      ac: accessControl,
      roles: {
        admin: adminRole,
        user: userRole,
        superAdmin: superAdminRole,
      },
    }),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
