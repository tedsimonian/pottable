import "server-only";

import { PostHog } from "posthog-node";

import { type VALID_ANALYTIC_EVENTS } from "~/types/analytics";
import { env } from "~/env";

export const PostHogClient = () => {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
};

const analyticsServerClient = PostHogClient();

/**
 * Track a server event
 * @param event - The event to track
 * @param payload - The payload for the event
 * @example trackServerEvent("User Signed In", { distinctId: "123", properties: { name: "John Doe" } })
 * @returns void
 */
export const trackServerEvent = <TEventKey extends keyof VALID_ANALYTIC_EVENTS>(
  event: TEventKey,
  payload: {
    distinctId: string;
    properties: VALID_ANALYTIC_EVENTS[TEventKey];
  },
) => {
  console.debug("Tracking server event", event, payload);
  const { distinctId, properties } = payload;
  analyticsServerClient.capture({
    distinctId,
    event,
    properties: properties ?? {},
  });
};

export default PostHogClient;
