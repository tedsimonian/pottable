import { permanentRedirect } from "next/navigation";

import { getInternalRoute } from "~/lib/internal-routes";

export default function SignUpPage() {
  return permanentRedirect(getInternalRoute("sign_in", null));
}
