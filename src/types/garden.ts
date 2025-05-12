import type { GARDEN_STATUS_TYPES } from "~/lib/garden";

export type GardenStatusType =
  (typeof GARDEN_STATUS_TYPES)[keyof typeof GARDEN_STATUS_TYPES];
