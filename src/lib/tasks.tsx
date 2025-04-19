import {
  Flower2,
  Droplets,
  Scissors,
  Apple,
  Wrench,
  Bug,
  Shovel,
  Sprout,
  MoveRight,
  Warehouse,
  Eye,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
  Clock,
  CheckCircle2,
  XCircle,
  TimerOff,
} from "lucide-react";

export const TASK_CATEGORIES = {
  WATERING: "WATERING",
  FERTILIZING: "FERTILIZING",
  HARVESTING: "HARVESTING",
  PRUNING: "PRUNING",
  WEEDING: "WEEDING",
  PLANTING: "PLANTING",
  MAINTENANCE: "MAINTENANCE",
  PEST_CONTROL: "PEST_CONTROL",
  RELOCATING: "RELOCATING",
  SOIL_CARE: "SOIL_CARE",
  MONITORING: "MONITORING",
  OTHER: "OTHER",
} as const;

export const TASK_PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export const TASK_STATUS = {
  ACTIVE: "ACTIVE",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  SKIPPED: "SKIPPED",
  STALE: "STALE",
} as const;

export const TASK_DIFFICULTY = {
  EASY: "EASY",
  MODERATE: "MODERATE",
  CHALLENGING: "CHALLENGING",
  DIFFICULT: "DIFFICULT",
} as const;

export type TaskCategory =
  (typeof TASK_CATEGORIES)[keyof typeof TASK_CATEGORIES];
export type TaskPriority =
  (typeof TASK_PRIORITIES)[keyof typeof TASK_PRIORITIES];
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type TaskDifficulty =
  (typeof TASK_DIFFICULTY)[keyof typeof TASK_DIFFICULTY];

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
    case "PEST_CONTROL":
      return Bug;
    case "WEEDING":
      return Shovel;
    case "FERTILIZING":
      return Sprout;
    case "RELOCATING":
      return MoveRight;
    case "SOIL_CARE":
      return Warehouse;
    case "MONITORING":
      return Eye;
    case "OTHER":
      return HelpCircle;
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
    case "PEST_CONTROL":
      return "text-primary border-red-200 bg-red-50 dark:text-primary dark:border-red-950 dark:bg-red-950";
    case "WEEDING":
      return "text-primary border-orange-200 bg-orange-50 dark:text-primary dark:border-orange-950 dark:bg-orange-950";
    case "FERTILIZING":
      return "text-primary border-emerald-200 bg-emerald-50 dark:text-primary dark:border-emerald-950 dark:bg-emerald-950";
    case "RELOCATING":
      return "text-primary border-purple-200 bg-purple-50 dark:text-primary dark:border-purple-950 dark:bg-purple-950";
    case "SOIL_CARE":
      return "text-primary border-yellow-200 bg-yellow-50 dark:text-primary dark:border-yellow-950 dark:bg-yellow-950";
    case "MONITORING":
      return "text-primary border-cyan-200 bg-cyan-50 dark:text-primary dark:border-cyan-950 dark:bg-cyan-950";
    case "OTHER":
      return "text-primary border-gray-200 bg-gray-50 dark:text-primary dark:border-gray-950 dark:bg-gray-950";
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
    case "URGENT":
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
    case "URGENT":
      return "text-primary-foreground border-destructive bg-destructive dark:text-primary dark:border-destructive dark:bg-destructive";
    default:
      return "text-primary border-primary/20 bg-primary/10";
  }
};

export const getStatusIcon = (status: TaskStatus) => {
  switch (status) {
    case "ACTIVE":
      return Clock;
    case "IN_PROGRESS":
      return AlertCircle;
    case "COMPLETED":
      return CheckCircle2;
    case "SKIPPED":
      return XCircle;
    case "STALE":
      return TimerOff;
    default:
      return Clock;
  }
};

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "ACTIVE":
      return "text-primary-foreground border-warning bg-warning dark:text-primary dark:border-warning dark:bg-warning";
    case "IN_PROGRESS":
      return "text-primary-foreground border-info bg-info dark:text-primary dark:border-info dark:bg-info";
    case "COMPLETED":
      return "text-primary-foreground border-success bg-success dark:text-primary dark:border-success dark:bg-success";
    case "SKIPPED":
      return "text-primary-foreground border-muted bg-muted dark:text-primary dark:border-muted dark:bg-muted";
    case "STALE":
      return "text-primary-foreground border-destructive bg-destructive dark:text-primary dark:border-destructive dark:bg-destructive";
    default:
      return "text-primary border-primary/20 bg-primary/10";
  }
};
