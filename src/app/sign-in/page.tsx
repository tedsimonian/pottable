"use client";

import { GalleryVerticalEnd } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SignInCard } from "~/components/auth/sign-in-card";
import { companyName } from "~/lib/constants";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const encodedRedirectUrl = searchParams.get("redirect_url");
  const redirectUrl = encodedRedirectUrl
    ? decodeURIComponent(encodedRedirectUrl)
    : null;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {companyName}
        </a>
        <SignInCard redirectTo={redirectUrl} />
      </div>
    </div>
  );
}
