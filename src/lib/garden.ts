export const GARDEN_TYPES = [
  "outdoor",
  "indoor",
  "balcony",
  "raised-bed",
  "container",
  "community",
  "rooftop",
  "vertical",
] as const;

export const gardenTypeList = [
  { value: "outdoor", label: "Outdoor Garden" },
  { value: "indoor", label: "Indoor Garden" },
  { value: "balcony", label: "Balcony Garden" },
  { value: "raised-bed", label: "Raised Bed" },
  { value: "container", label: "Container Garden" },
  { value: "community", label: "Community Garden" },
  { value: "rooftop", label: "Rooftop Garden" },
  { value: "vertical", label: "Vertical Garden" },
];

export const GARDEN_STATUS_TYPES = {
  HEALTHY: "healthy",
  READY_TO_HARVEST: "ready-to-harvest",
  NEEDS_WATERING: "needs-watering",
  NEEDS_FERTILIZING: "needs-fertilizing",
  NEEDS_PEST_CONTROL: "needs-pest-control",
  NEEDS_PRUNING: "needs-pruning",
  NEEDS_TREATMENT: "needs-treatment",
  NEEDS_TRANSPLANTING: "needs-transplanting",
  WITHERING: "withering",
  DYING: "dying",
  DEAD: "dead",
} as const;

export const gardenStatusList = {
  [GARDEN_STATUS_TYPES.HEALTHY]: "Healthy",
  [GARDEN_STATUS_TYPES.READY_TO_HARVEST]: "Ready to Harvest",
  [GARDEN_STATUS_TYPES.NEEDS_WATERING]: "Needs Watering",
  [GARDEN_STATUS_TYPES.NEEDS_FERTILIZING]: "Needs Fertilizing",
  [GARDEN_STATUS_TYPES.NEEDS_PEST_CONTROL]: "Needs Pest Control",
  [GARDEN_STATUS_TYPES.NEEDS_PRUNING]: "Needs Pruning",
  [GARDEN_STATUS_TYPES.NEEDS_TREATMENT]: "Needs Treatment",
  [GARDEN_STATUS_TYPES.NEEDS_TRANSPLANTING]: "Needs Transplanting",
  [GARDEN_STATUS_TYPES.WITHERING]: "Withering",
  [GARDEN_STATUS_TYPES.DYING]: "Dying",
  [GARDEN_STATUS_TYPES.DEAD]: "Dead",
} as const;
