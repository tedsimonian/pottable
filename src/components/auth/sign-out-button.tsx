"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

import { useAnalytics } from "~/hooks";
import { authClient } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";

export const SignOutButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const { captureEvent } = useAnalytics();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            captureEvent("user signed out", {
              distinctId: session?.user.id ?? "",
              properties: null,
            });
            const signInPath = getInternalRoute("sign_in", null);
            router.push(signInPath);
          },
        },
      });
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Button disabled={isPending} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
