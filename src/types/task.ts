import type { Task as PrismaTask } from "~/generated/prisma-client";

import {
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
  type TaskDifficulty,
} from "~/lib/tasks";

export type Task = PrismaTask & {
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  difficulty: TaskDifficulty;
};
