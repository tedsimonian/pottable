"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import {
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  TASK_STATUS,
} from "~/lib/tasks";
import { toTitleCase } from "~/lib/utils";

interface TaskFiltersProps {
  statusFilter: TaskStatus | "ALL";
  onStatusFilterChange: (status: TaskStatus | "ALL") => void;
  categoryFilter: TaskCategory | "ALL";
  onCategoryFilterChange: (category: TaskCategory | "ALL") => void;
  priorityFilter: TaskPriority | "ALL";
  onPriorityFilterChange: (priority: TaskPriority | "ALL") => void;
  activeFiltersCount: number;
}

export function TaskFilters({
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  activeFiltersCount,
}: TaskFiltersProps) {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <div className="flex gap-2">
        <Tabs
          defaultValue="ALL"
          value={statusFilter}
          onValueChange={(value) =>
            onStatusFilterChange(value as TaskStatus | "ALL")
          }
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger className="cursor-pointer" value="ALL">
              {"All"}
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value={TASK_STATUS.ACTIVE}>
              {toTitleCase(TASK_STATUS.ACTIVE)}
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value={TASK_STATUS.IN_PROGRESS}
            >
              {toTitleCase(TASK_STATUS.IN_PROGRESS)}
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              value={TASK_STATUS.COMPLETED}
            >
              {toTitleCase(TASK_STATUS.COMPLETED)}
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value={TASK_STATUS.SKIPPED}>
              {toTitleCase(TASK_STATUS.SKIPPED)}
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value={TASK_STATUS.STALE}>
              {toTitleCase(TASK_STATUS.STALE)}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-start gap-1"
            >
              Category
              {categoryFilter !== "ALL" && (
                <Badge variant="secondary" className="ml-1 font-normal">
                  {toTitleCase(categoryFilter)}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "ALL"}
              onCheckedChange={() => onCategoryFilterChange("ALL")}
            >
              All Categories
            </DropdownMenuCheckboxItem>
            {Object.values(TASK_CATEGORIES).map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={categoryFilter === category}
                onCheckedChange={() => onCategoryFilterChange(category)}
              >
                {toTitleCase(category)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-start gap-1"
            >
              Priority
              {priorityFilter !== "ALL" && (
                <Badge variant="secondary" className="ml-1 font-normal">
                  {toTitleCase(priorityFilter)}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={priorityFilter === "ALL"}
              onCheckedChange={() => onPriorityFilterChange("ALL")}
            >
              All Priorities
            </DropdownMenuCheckboxItem>
            {Object.values(TASK_PRIORITIES).map((priority) => (
              <DropdownMenuCheckboxItem
                key={priority}
                checked={priorityFilter === priority}
                onCheckedChange={() => onPriorityFilterChange(priority)}
              >
                {toTitleCase(priority)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onStatusFilterChange("ALL");
            onCategoryFilterChange("ALL");
            onPriorityFilterChange("ALL");
          }}
          className="text-muted-foreground hover:text-foreground ml-auto"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
