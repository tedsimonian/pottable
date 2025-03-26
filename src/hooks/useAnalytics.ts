import { type CaptureOptions } from "posthog-js";
import { usePostHog } from "posthog-js/react";

import { type VALID_ANALYTIC_EVENTS } from "~/types";

export const useAnalytics = () => {
  const posthog = usePostHog();

  const captureEvent = <TEventKey extends keyof VALID_ANALYTIC_EVENTS>(
    event: TEventKey,
    payload: {
      distinctId: string;
      properties: VALID_ANALYTIC_EVENTS[TEventKey];
    },
    options?: CaptureOptions,
  ) => {
    posthog?.capture(event, payload, options);
  };

  return { captureEvent };
};

export default useAnalytics;
