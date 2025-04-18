import type { TaskCategory, TaskPriority } from "~/lib/tasks";

export type Task = {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
};
