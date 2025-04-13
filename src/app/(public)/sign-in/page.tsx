"use client";

import { Leaf } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SignInCard } from "~/components/auth/sign-in-card";
import { InternalLink } from "~/components/common/internal-link";
import { companyName } from "~/lib/constants";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const encodedRedirectUrl = searchParams.get("redirect_url");
  const redirectUrl = encodedRedirectUrl
    ? decodeURIComponent(encodedRedirectUrl)
    : null;

  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <InternalLink
          path="home"
          params={null}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Leaf className="size-4" />
          </div>
          {companyName}
        </InternalLink>
        <SignInCard redirectTo={redirectUrl} />
      </div>
    </div>
  );
}
