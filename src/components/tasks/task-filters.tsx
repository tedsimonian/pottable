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

interface TaskFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
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
          onValueChange={onStatusFilterChange}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger className="cursor-pointer" value="ALL">
              All
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="ACTIVE">
              Active
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="COMPLETED">
              Completed
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
                  {categoryFilter}
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
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "PLANTING"}
              onCheckedChange={() => onCategoryFilterChange("PLANTING")}
            >
              Planting
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "WATERING"}
              onCheckedChange={() => onCategoryFilterChange("WATERING")}
            >
              Watering
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "PRUNING"}
              onCheckedChange={() => onCategoryFilterChange("PRUNING")}
            >
              Pruning
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "HARVESTING"}
              onCheckedChange={() => onCategoryFilterChange("HARVESTING")}
            >
              Harvesting
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={categoryFilter === "MAINTENANCE"}
              onCheckedChange={() => onCategoryFilterChange("MAINTENANCE")}
            >
              Maintenance
            </DropdownMenuCheckboxItem>
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
                  {priorityFilter}
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
            <DropdownMenuCheckboxItem
              checked={priorityFilter === "LOW"}
              onCheckedChange={() => onPriorityFilterChange("LOW")}
            >
              Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilter === "MEDIUM"}
              onCheckedChange={() => onPriorityFilterChange("MEDIUM")}
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={priorityFilter === "HIGH"}
              onCheckedChange={() => onPriorityFilterChange("HIGH")}
            >
              High
            </DropdownMenuCheckboxItem>
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
