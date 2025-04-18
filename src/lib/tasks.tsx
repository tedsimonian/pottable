import {
  Flower2,
  Droplets,
  Scissors,
  Apple,
  Wrench,
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";

export const TASK_CATEGORIES = {
  PLANTING: "PLANTING",
  WATERING: "WATERING",
  PRUNING: "PRUNING",
  HARVESTING: "HARVESTING",
  MAINTENANCE: "MAINTENANCE",
} as const;

export const TASK_PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const TASK_STATUS = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
} as const;

export type TaskCategory =
  (typeof TASK_CATEGORIES)[keyof typeof TASK_CATEGORIES];
export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const getCategoryIcon = (category: TaskCategory) => {
  switch (category) {
    case "PLANTING":
      return Flower2;
    case "WATERING":
      return Droplets;
    case "PRUNING":
      return Scissors;
    case "HARVESTING":
      return Apple;
    case "MAINTENANCE":
      return Wrench;
    default:
      return Flower2;
  }
};

export const getCategoryColor = (category: TaskCategory) => {
  switch (category) {
    case "PLANTING":
      return "text-primary border-green-200 bg-green-50 dark:text-primary dark:border-green-950 dark:bg-green-950";
    case "WATERING":
      return "text-primary border-blue-200 bg-blue-50 dark:text-primary dark:border-blue-950 dark:bg-blue-950";
    case "PRUNING":
      return "text-primary-foreground border-amber-200 bg-amber-950 dark:text-primary dark:border-amber-950 dark:bg-amber-950";
    case "HARVESTING":
      return "text-primary border-lime-200 bg-lime-50 dark:text-primary dark:border-lime-950 dark:bg-lime-950";
    case "MAINTENANCE":
      return "text-primary border-indigo-200 bg-indigo-50 dark:text-primary dark:border-indigo-950 dark:bg-indigo-950";
    default:
      return "text-primary border-primary/20 bg-primary/10";
  }
};

export const getPriorityIcon = (priority: TaskPriority) => {
  switch (priority) {
    case "LOW":
      return AlertCircle;
    case "MEDIUM":
      return AlertTriangle;
    case "HIGH":
      return AlertOctagon;
    default:
      return AlertCircle;
  }
};

export const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case "LOW":
      return "text-primary-foreground border-info bg-info dark:text-primary dark:border-info dark:bg-info";
    case "MEDIUM":
      return "text-primary-foreground border-warning bg-warning dark:text-primary dark:border-warning dark:bg-warning";
    case "HIGH":
      return "text-primary-foreground border-destructive bg-destructive dark:text-primary dark:border-destructive dark:bg-destructive";
    default:
      return "text-primary border-primary/20 bg-primary/10";
  }
};
