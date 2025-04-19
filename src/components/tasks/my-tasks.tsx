"use client";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { TaskItem } from "~/components/tasks/task-item";
import { EmptyState } from "~/components/tasks/empty-task";
import { TaskFilters } from "~/components/tasks/task-filters";

import type { Task } from "~/types/task";
import {
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
  type TaskDifficulty,
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUS,
  TASK_DIFFICULTY,
} from "~/lib/tasks";

import { mockTasks } from "~/lib/mock-data/tasks";

type MyTasksProps = {
  userId: string;
};

export const MyTasks = ({ userId }: MyTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<TaskCategory | "ALL">(
    "ALL",
  );
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">(
    "ALL",
  );

  // Initialize tasks from mock data
  useEffect(() => {
    const formattedTasks = mockTasks.map((task) => {
      const id = task.id;
      const now = new Date();

      // Type guard functions
      const isValidCategory = (category: string): category is TaskCategory =>
        Object.values(TASK_CATEGORIES).includes(category as TaskCategory);

      const isValidPriority = (priority: string): priority is TaskPriority =>
        Object.values(TASK_PRIORITIES).includes(priority as TaskPriority);

      const isValidStatus = (status: string): status is TaskStatus =>
        Object.values(TASK_STATUS).includes(status as TaskStatus);

      const isValidDifficulty = (
        difficulty: string,
      ): difficulty is TaskDifficulty =>
        Object.values(TASK_DIFFICULTY).includes(difficulty as TaskDifficulty);

      // Get validated values
      const category = isValidCategory(task.category) ? task.category : "OTHER";
      const priority = isValidPriority(task.priority)
        ? task.priority
        : "MEDIUM";
      const status = isValidStatus(task.status) ? task.status : "ACTIVE";
      const difficulty =
        task.difficulty && isValidDifficulty(task.difficulty)
          ? task.difficulty
          : "MODERATE";

      return {
        id,
        title: task.title,
        description: task.description ?? "",
        status,
        category,
        priority,
        difficulty,
        startDate: task.startDate ? new Date(task.startDate) : null,
        endDate: task.endDate ? new Date(task.endDate) : now,
        dateCompleted: null,
        estimatedMinutes: task.estimatedMinutes,
        userId: task.userId ?? userId,
        createdAt: new Date(task.createdAt),
        updatedAt: task.updatedAt ? new Date(task.updatedAt) : now,
        isRecurring: task.isRecurring ?? false,
        gardenId: null,
        containerId: null,
        containerPlantId: null,
        parentTaskId: null,
      } satisfies Task;
    });

    setTasks(formattedTasks);
  }, [userId]);
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Count active filters (excluding "all" which is the default)
  const activeFiltersCount = [
    statusFilter !== "ALL" ? 1 : 0,
    categoryFilter !== "ALL" ? 1 : 0,
    priorityFilter !== "ALL" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (statusFilter !== "ALL" && task.status !== statusFilter) return false;

    // Filter by category
    if (categoryFilter !== "ALL" && task.category !== categoryFilter)
      return false;

    // Filter by priority
    if (priorityFilter !== "ALL" && task.priority !== priorityFilter)
      return false;

    return true;
  });

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="text-primary">
        <div className="text-muted-foreground">
          {tasks.filter((t) => t.status !== "COMPLETED").length} tasks remaining
        </div>
      </CardHeader>
      <CardContent className="mb-6 flex flex-col gap-8">
        <TaskFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          activeFiltersCount={activeFiltersCount}
        />

        {filteredTasks.length > 0 ? (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        ) : (
          <EmptyState
            filter={
              statusFilter !== "ALL"
                ? statusFilter
                : categoryFilter !== "ALL"
                  ? categoryFilter
                  : priorityFilter
            }
          />
        )}
      </CardContent>
    </Card>
  );
};
