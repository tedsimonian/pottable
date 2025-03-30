"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";
import { ROLES } from "~/permissions";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;

    const isAdmin =
      session?.user.role === ROLES.ADMIN ||
      session?.user.role === ROLES.SUPER_ADMIN;

    if (!isAdmin) {
      router.push(getInternalRoute("home", null));
    }
  }, [router, session, isPending]);

  return <>{children}</>;
};

export default AdminLayout;
