"use client";

import { useState } from "react";
import { Edit, Save, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import type { Task } from "~/types/task";
import {
  getCategoryIcon,
  getCategoryColor,
  getPriorityIcon,
  getPriorityColor,
  getStatusIcon,
  getStatusColor,
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
  type TaskDifficulty,
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUS,
  TASK_DIFFICULTY,
} from "~/lib/tasks";
import { cn } from "~/lib/utils";

type TaskItemProps = {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
};

export const TaskItem = (props: TaskItemProps) => {
  const { task, onUpdate, onDelete } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCategory, setEditedCategory] = useState<TaskCategory>(
    task.category as TaskCategory,
  );
  const [editedPriority, setPriority] = useState<TaskPriority>(
    task.priority as TaskPriority,
  );
  const [editedStatus, setEditedStatus] = useState<TaskStatus>(
    task.status as TaskStatus,
  );
  const [editedDifficulty, setEditedDifficulty] = useState<TaskDifficulty>(
    task.difficulty as TaskDifficulty,
  );

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate({
        ...task,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        category: editedCategory,
        priority: editedPriority,
        status: editedStatus,
        difficulty: editedDifficulty,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCategory(task.category as TaskCategory);
    setPriority(task.priority as TaskPriority);
    setEditedStatus(task.status as TaskStatus);
    setEditedDifficulty(task.difficulty as TaskDifficulty);
    setIsEditing(false);
  };

  const CategoryIcon = getCategoryIcon(task.category);
  const categoryColor = getCategoryColor(task.category);
  const PriorityIcon = getPriorityIcon(task.priority);
  const priorityColor = getPriorityColor(task.priority);
  const StatusIcon = getStatusIcon(task.status);
  const statusColor = getStatusColor(task.status);

  return (
    <li
      className={cn(
        "group flex items-start gap-3 rounded-lg border p-4 transition-all hover:shadow-md",
        task.status === "COMPLETED"
          ? "bg-muted border-border"
          : "bg-card border-border",
      )}
    >
      {!isEditing ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onUpdate({
                ...task,
                status:
                  task.status === TASK_STATUS.COMPLETED
                    ? TASK_STATUS.ACTIVE
                    : TASK_STATUS.COMPLETED,
                dateCompleted:
                  task.status === TASK_STATUS.COMPLETED ? null : new Date(),
                updatedAt: new Date(),
              })
            }
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            <StatusIcon className="h-5 w-5" />
            <span className="sr-only">
              {task.status === "COMPLETED"
                ? "Mark as incomplete"
                : "Mark as complete"}
            </span>
          </Button>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  "text-foreground font-medium",
                  task.status === "COMPLETED" &&
                    "text-muted-foreground line-through",
                )}
              >
                {task.title}
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="text-primary hover:text-primary hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">{"Edit"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">{"Delete"}</span>
                </Button>
              </div>
            </div>

            {task.description && (
              <p className="text-muted-foreground mt-1 text-sm">
                {task.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("flex items-center gap-1", statusColor)}
              >
                <StatusIcon className="h-3 w-3" />
                {task.status}
              </Badge>
              <Badge
                variant="outline"
                className={cn("flex items-center gap-1", categoryColor)}
              >
                <CategoryIcon className="h-3 w-3" />
                {task.category}
              </Badge>
              <Badge
                variant="outline"
                className={cn("flex items-center gap-1", priorityColor)}
              >
                <PriorityIcon className="h-3 w-3" />
                {task.priority}
              </Badge>
              {task.endDate && (
                <span className="text-muted-foreground text-xs">
                  {"Due: "}
                  {new Date(task.endDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border-input focus-visible:ring-primary"
            placeholder="Task title"
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="border-input focus-visible:ring-primary"
            placeholder="Task description"
          />
          <div className="flex flex-row gap-2">
            <Select
              value={editedStatus}
              onValueChange={(value) => setEditedStatus(value as TaskStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TASK_STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={editedCategory}
              onValueChange={(value) =>
                setEditedCategory(value as TaskCategory)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TASK_CATEGORIES).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={editedPriority}
              onValueChange={(value) => setPriority(value as TaskPriority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TASK_PRIORITIES).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={editedDifficulty}
              onValueChange={(value) =>
                setEditedDifficulty(value as TaskDifficulty)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TASK_DIFFICULTY).map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="mr-2 h-4 w-4" />
              {"Save"}
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              {"Cancel"}
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};
