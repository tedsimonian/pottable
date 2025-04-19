"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { InternalLink } from "../common/internal-link";

import type { Task } from "~/types/task";
import {
  getCategoryIcon,
  getCategoryColor,
  getPriorityIcon,
  getPriorityColor,
  type TaskCategory,
  type TaskPriority,
  TASK_STATUS,
} from "~/lib/tasks";
import { cn } from "~/lib/utils";

type TaskListWidgetProps = {
  maxTasks?: number;
  className?: string;
};

export const TaskListWidget = (props: TaskListWidgetProps) => {
  const { maxTasks = 5, className } = props;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<string>("priority");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("gardenTasks");
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks) as Task[];
        setTasks(parsedTasks);
      } catch (e) {
        console.error("Error parsing saved tasks:", e);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gardenTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === TASK_STATUS.COMPLETED
                  ? TASK_STATUS.ACTIVE
                  : TASK_STATUS.COMPLETED,
              dateCompleted:
                task.status === TASK_STATUS.COMPLETED ? null : new Date(),
            }
          : task,
      ),
    );
  };

  // Filter and sort tasks based on the active tab
  const getFilteredTasks = () => {
    const filteredTasks = [...tasks].filter(
      (task) => task.status !== TASK_STATUS.COMPLETED,
    );

    if (activeTab === "priority") {
      // Sort by priority (high → medium → low)
      const priorityOrder = {
        HIGH: 0,
        MEDIUM: 1,
        LOW: 2,
      } as Record<TaskPriority, number>;

      filteredTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
    } else if (activeTab === "date") {
      // Sort by end date (if available)
      filteredTasks.sort((a, b) => {
        if (!a.endDate) return 1;
        if (!b.endDate) return -1;
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      });
    } else if (activeTab === "category") {
      // Group by category
      const categoryOrder = {
        PLANTING: 0,
        WATERING: 1,
        PRUNING: 2,
        HARVESTING: 3,
        MAINTENANCE: 4,
      } as Record<TaskCategory, number>;

      filteredTasks.sort(
        (a, b) => categoryOrder[a.category] - categoryOrder[b.category],
      );
    }

    return filteredTasks.slice(0, maxTasks);
  };

  const displayTasks = getFilteredTasks();
  const totalActiveTasks = tasks.filter(
    (task) => task.status !== TASK_STATUS.COMPLETED,
  ).length;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <Button variant="outline" size="sm" asChild>
          <InternalLink path="view_tasks" params={null}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </InternalLink>
        </Button>
      </div>
      <Card className={cn("h-full w-full", className)}>
        <CardHeader>
          <CardTitle className="text-primary flex items-center justify-between truncate font-medium">
            Garden Tasks
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="bg-primary/20 text-primary border-primary/30"
              >
                {totalActiveTasks} active
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex-1">
          <Tabs
            defaultValue="priority"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-2 grid w-full grid-cols-3">
              <TabsTrigger className="cursor-pointer" value="priority">
                Priority
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="date">
                Due Date
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="category">
                Category
              </TabsTrigger>
            </TabsList>
            <TabsContent value="priority" className="mt-0">
              <TaskList
                tasks={displayTasks}
                onToggleComplete={handleToggleComplete}
              />
            </TabsContent>
            <TabsContent value="date" className="mt-0">
              <TaskList
                tasks={displayTasks}
                onToggleComplete={handleToggleComplete}
              />
            </TabsContent>
            <TabsContent value="category" className="mt-0">
              <TaskList
                tasks={displayTasks}
                onToggleComplete={handleToggleComplete}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="p-6" />
      </Card>
    </div>
  );
};

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
};

const TaskList = (props: TaskListProps) => {
  const { tasks, onToggleComplete } = props;

  if (tasks.length === 0) {
    return (
      <div className="text-muted-foreground py-6 text-center text-sm">
        No active tasks. Your garden is looking great!
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => {
        const CategoryIcon = getCategoryIcon(task.category);
        const categoryColor = getCategoryColor(task.category);
        const PriorityIcon = getPriorityIcon(task.priority);
        const priorityColor = getPriorityColor(task.priority);
        const isCompleted = task.status === TASK_STATUS.COMPLETED;

        return (
          <li
            key={task.id}
            className="border-border bg-card hover:bg-muted/50 flex items-center gap-2 rounded-md border p-2 transition-colors"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary hover:bg-primary/10 h-6 w-6"
              onClick={() => onToggleComplete(task.id)}
            >
              {isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isCompleted ? "Mark as incomplete" : "Mark as complete"}
              </span>
            </Button>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{task.title}</div>
              <div className="mt-1 flex items-center gap-1">
                <Badge
                  variant="outline"
                  className={cn(
                    "flex h-5 items-center gap-1 px-1.5 py-0 text-xs",
                    categoryColor,
                  )}
                >
                  <CategoryIcon className="h-3 w-3" />
                  <span className="truncate">{task.category}</span>
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "flex h-5 items-center gap-1 px-1.5 py-0 text-xs",
                    priorityColor,
                  )}
                >
                  <PriorityIcon className="h-3 w-3" />
                  <span className="truncate">{task.priority}</span>
                </Badge>
                {task.endDate && (
                  <span className="text-muted-foreground truncate text-xs">
                    {new Date(task.endDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
