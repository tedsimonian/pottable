"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

import { useAnalytics } from "~/hooks";
import { authClient } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";

export const SignOutMenuItem = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const { captureEvent } = useAnalytics();

  const handleSignOut = useCallback(async () => {
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
  }, [captureEvent, router, session?.user.id]);

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      disabled={isPending}
      className="cursor-pointer"
    >
      <LogOut />
      {"Sign Out"}
    </DropdownMenuItem>
  );
};
