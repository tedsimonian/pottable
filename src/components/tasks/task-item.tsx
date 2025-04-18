"use client";

import { useState } from "react";
import { CheckCircle, Circle, Trash2, Edit, Save, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  type TaskCategory,
  type TaskPriority,
} from "~/lib/tasks";
import { cn } from "~/lib/utils";

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
};

export const TaskItem = (props: TaskItemProps) => {
  const { task, onToggleComplete, onDelete, onUpdate } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate({
        ...task,
        title: editedTitle,
        category: editedCategory,
        priority: editedPriority,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedCategory(task.category);
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  const CategoryIcon = getCategoryIcon(task.category);
  const categoryColor = getCategoryColor(task.category);
  const PriorityIcon = getPriorityIcon(task.priority);
  const priorityColor = getPriorityColor(task.priority);

  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-md",
        task.completed ? "bg-muted border-border" : "bg-card border-border",
      )}
    >
      {!isEditing ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleComplete(task.id)}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
            <span className="sr-only">
              {task.completed ? "Mark as incomplete" : "Mark as complete"}
            </span>
          </Button>

          <div className="flex-1">
            <div
              className={cn(
                "text-foreground font-medium",
                task.completed && "text-muted-foreground line-through",
              )}
            >
              {task.title}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
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
              {task.dueDate && (
                <span className="text-muted-foreground text-xs">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
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
          <div className="flex gap-2">
            <Select
              value={editedCategory}
              onValueChange={(value) =>
                setEditedCategory(value as TaskCategory)
              }
            >
              <SelectTrigger className="text-primary hover:text-primary hover:bg-primary/10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANTING">Planting</SelectItem>
                <SelectItem value="WATERING">Watering</SelectItem>
                <SelectItem value="PRUNING">Pruning</SelectItem>
                <SelectItem value="HARVESTING">Harvesting</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={editedPriority}
              onValueChange={(value) =>
                setEditedPriority(value as TaskPriority)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low Priority</SelectItem>
                <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                <SelectItem value="HIGH">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};
