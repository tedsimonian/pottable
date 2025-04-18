"use client";

import type React from "react";
import { useState } from "react";

import { Calendar, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { format } from "date-fns";
import type { Task } from "~/types/task";
import type { TaskCategory, TaskPriority } from "~/lib/tasks";

type TaskFormProps = {
  onSubmit: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task;
};

export const TaskForm = (props: TaskFormProps) => {
  const { onSubmit, onCancel, initialTask } = props;
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [category, setCategory] = useState<TaskCategory>(
    initialTask?.category ?? "PLANTING",
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialTask?.priority ?? "MEDIUM",
  );
  const [date, setDate] = useState<Date | undefined>(
    initialTask?.dueDate ? new Date(initialTask.dueDate) : undefined,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        id: initialTask?.id ?? "",
        title: title.trim(),
        category,
        priority,
        completed: initialTask?.completed ?? false,
        dueDate: date?.toISOString(),
        createdAt: initialTask?.createdAt ?? new Date().toISOString(),
      });
      setTitle("");
      setCategory("PLANTING");
      setPriority("MEDIUM");
      setDate(undefined);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border bg-muted/50 mb-6 rounded-lg border p-4"
    >
      <h3 className="text-foreground mb-3 font-medium">
        {initialTask ? "Edit Task" : "Add New Garden Task"}
      </h3>

      <div className="space-y-3">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done in your garden?"
          className="border-input focus-visible:ring-primary"
          required
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as TaskCategory)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planting">Planting</SelectItem>
              <SelectItem value="watering">Watering</SelectItem>
              <SelectItem value="pruning">Pruning</SelectItem>
              <SelectItem value="harvesting">Harvesting</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as TaskPriority)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Set due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {initialTask ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </div>
    </form>
  );
};
