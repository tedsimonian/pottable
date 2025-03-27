"use client";

import { useRouter } from "next/navigation";
import { useAnalytics } from "~/hooks";
import { signOut, useSession } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { captureEvent } = useAnalytics();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("User Signed Out");
          captureEvent("User Signed Out", {
            distinctId: session?.user.id ?? "",
            properties: null,
          });
          router.push(getInternalRoute("sign_in", null));
        },
      },
    });
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};
