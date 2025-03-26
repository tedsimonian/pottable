"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { env } from "~/env";
import { useSession } from "~/lib/auth-client";

type PostHogProviderProps = {
  children: React.ReactNode;
};

export const PostHogProvider = ({ children }: PostHogProviderProps) => {
  const { data: session } = useSession();

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: env.NEXT_PUBLIC_POSTHOG_HOST as string,
      capture_pageview: false, // We capture pageviews manually
      capture_pageleave: true, // Enable pageleave capture
    });
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      console.log("Identifying user", session.user.id);
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    } else {
      console.log("Resetting posthog - no user session");
      posthog.reset();
    }
  }, [session?.user]);

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
};

const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += "?" + search;
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
};

const SuspendedPostHogPageView = () => {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
};
