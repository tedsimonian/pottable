import { type CaptureOptions } from "posthog-js";
import { usePostHog } from "posthog-js/react";

import { type VALID_ANALYTIC_EVENTS } from "~/types";

export const useAnalytics = <TEventKey extends keyof VALID_ANALYTIC_EVENTS>(
  event: TEventKey,
  payload: {
    distinctId: string;
    properties: VALID_ANALYTIC_EVENTS[TEventKey];
  },
  options?: CaptureOptions,
) => {
  const posthog = usePostHog();
  posthog?.capture(event, payload, options);
};

export default useAnalytics;
