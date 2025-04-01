import { redirect } from "next/navigation";

import { getInternalRoute } from "~/lib/internal-routes";

// import { LatestPost } from "~/components/post";

export default function HomePage() {
  const path = getInternalRoute("dashboard", null);
  redirect(path);
}
