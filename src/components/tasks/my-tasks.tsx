"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { TaskItem } from "~/components/tasks/task-item";
import { EmptyState } from "~/components/tasks/empty-task";
import { TaskForm } from "~/components/tasks/task-form";
import { TaskFilters } from "~/components/tasks/task-filters";

import type { Task } from "~/types/task";

import mockTasks from "~/lib/mock-data/tasks.json";

export const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks as Task[]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
    setIsAddingTask(false);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  // Count active filters (excluding "all" which is the default)
  const activeFiltersCount = [
    statusFilter !== "ALL" ? 1 : 0,
    categoryFilter !== "ALL" ? 1 : 0,
    priorityFilter !== "ALL" ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (statusFilter === "ACTIVE" && task.completed) return false;
    if (statusFilter === "COMPLETED" && !task.completed) return false;

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
          {tasks.filter((t) => !t.completed).length} tasks remaining
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

        {isAddingTask ? (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setIsAddingTask(false)}
          />
        ) : null}

        {filteredTasks.length > 0 ? (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ))}
          </ul>
        ) : (
          <EmptyState
            filter={
              statusFilter !== "all"
                ? statusFilter
                : categoryFilter !== "all"
                  ? categoryFilter
                  : priorityFilter
            }
          />
        )}
      </CardContent>
    </Card>
  );
};
