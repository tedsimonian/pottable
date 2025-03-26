import "server-only";

import { PostHog } from "posthog-node";

import { type VALID_ANALYTIC_EVENTS } from "~/types";
import { env } from "~/env";

export const PostHogClient = () => {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST as string,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
};

const analyticsServerClient = PostHogClient();

export const trackServerEvent = <TEventKey extends keyof VALID_ANALYTIC_EVENTS>(
  event: TEventKey,
  payload: {
    distinctId: string;
    properties: VALID_ANALYTIC_EVENTS[TEventKey];
  },
) => {
  console.log("Tracking server event", event, payload);
  const { distinctId, properties } = payload;
  analyticsServerClient.capture({
    distinctId,
    event,
    properties: properties ?? {},
  });
};

export default PostHogClient;
