"use client";

import { useRouter } from "next/navigation";
import { useAnalytics } from "~/hooks";
import { signOut, useSession } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";

export const SignOut = () => {
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

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
