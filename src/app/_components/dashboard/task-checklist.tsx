"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Calendar, ChevronDown, ChevronUp, Droplet, FlowerIcon, Leaf, Scissors, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the task interface
interface Task {
  id: string
  title: string
  description: string
  detailedInstructions: string
  dueDate: string
  priority: "high" | "medium" | "low"
  category: "watering" | "pruning" | "fertilizing" | "harvesting" | "planting" | "maintenance"
  garden: string
  plot: string
  crop?: string
  completed: boolean
}

// Mock data for tasks
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Water Tomato Plants",
    description: "Water your tomato plants thoroughly, ensuring the soil is moist but not waterlogged.",
    detailedInstructions:
      "Water at the base of the plant to avoid wetting the leaves, which can lead to disease. " +
      "Apply approximately 1-2 inches of water, allowing it to soak deeply into the soil. " +
      "The best time to water is early morning to allow excess moisture to evaporate during the day. " +
      "Check soil moisture by inserting your finger about 1 inch into the soil - if it feels dry, it's time to water.",
    dueDate: "Today",
    priority: "high",
    category: "watering",
    garden: "Balcony Garden",
    plot: "Large Pot",
    crop: "Tomato",
    completed: false,
  },
  {
    id: "task-2",
    title: "Prune Basil Plants",
    description: "Trim your basil plants to encourage bushier growth and prevent flowering.",
    detailedInstructions:
      "Using clean, sharp scissors, cut just above a pair of leaf nodes (where leaves branch out from the stem). " +
      "Remove any flower buds immediately to prevent the plant from going to seed. " +
      "Focus on removing the top 1-2 inches of each stem, which will encourage the plant to branch out. " +
      "After pruning, your basil will grow back fuller and produce more leaves. " +
      "Save the trimmed leaves for immediate use in cooking.",
    dueDate: "Today",
    priority: "medium",
    category: "pruning",
    garden: "Indoor Herbs",
    plot: "Herb Box",
    crop: "Basil",
    completed: false,
  },
  {
    id: "task-3",
    title: "Fertilize Bell Peppers",
    description: "Apply organic fertilizer to your bell pepper plants to support fruit development.",
    detailedInstructions:
      "Use a balanced organic fertilizer with an NPK ratio of 5-10-10 or similar. " +
      "Apply approximately 1 tablespoon per plant, working it gently into the soil around the base. " +
      "Keep the fertilizer at least 2 inches away from the stem to prevent burning. " +
      "Water thoroughly after application to help dissolve the nutrients. " +
      "Peppers benefit from fertilization every 4-6 weeks during the growing season.",
    dueDate: "Tomorrow",
    priority: "medium",
    category: "fertilizing",
    garden: "Balcony Garden",
    plot: "Medium Pot",
    crop: "Bell Pepper",
    completed: false,
  },
  {
    id: "task-4",
    title: "Move Mint to Sunnier Location",
    description: "Reposition your mint plant to receive more direct sunlight for optimal growth.",
    detailedInstructions:
      "Mint prefers partial to full sun, with at least 4-6 hours of direct sunlight daily. " +
      "Choose a location that receives morning sun but has some afternoon shade, especially in hot climates. " +
      "After moving, monitor the plant for signs of stress such as wilting or leaf scorch. " +
      "Water more frequently for the first few days after relocation to help the plant adjust. " +
      "Mint is adaptable but may take 3-5 days to fully adjust to its new light conditions.",
    dueDate: "This Week",
    priority: "low",
    category: "maintenance",
    garden: "Indoor Herbs",
    plot: "Windowsill Pot",
    crop: "Mint",
    completed: false,
  },
  {
    id: "task-5",
    title: "Plant Lettuce Seeds",
    description: "Sow lettuce seeds in your garden bed for a continuous harvest.",
    detailedInstructions:
      "Prepare the soil by loosening it to a depth of about 6 inches and mixing in compost. " +
      "Sow seeds thinly in rows spaced 12-18 inches apart, or broadcast over a wider area. " +
      "Cover seeds with just ¼ inch of fine soil - lettuce needs light to germinate. " +
      "Keep the soil consistently moist until germination, which typically takes 7-10 days. " +
      "For continuous harvest, plant small batches every 2-3 weeks throughout the growing season.",
    dueDate: "This Week",
    priority: "medium",
    category: "planting",
    garden: "Backyard Garden",
    plot: "Raised Bed",
    completed: false,
  },
]

// Category icons mapping
const categoryIcons = {
  watering: Droplet,
  pruning: Scissors,
  fertilizing: Leaf,
  harvesting: FlowerIcon,
  planting: Leaf,
  maintenance: Sun,
}

// Priority colors mapping
const priorityColors = {
  high: "text-red-500 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800",
  medium: "text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800",
  low: "text-green-500 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800",
}

export function TaskChecklist() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  const pendingTasksCount = tasks.filter((task) => !task.completed).length

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Garden Tasks</CardTitle>
            <CardDescription>{pendingTasksCount} pending tasks to complete</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FlowerIcon className="mb-2 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "pending"
                  ? "No pending tasks - your garden is happy!"
                  : "No tasks available"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const CategoryIcon = categoryIcons[task.category]
              const isExpanded = expandedTaskId === task.id

              return (
                <Collapsible
                  key={task.id}
                  open={isExpanded}
                  onOpenChange={() => toggleTaskExpansion(task.id)}
                  className={cn("rounded-lg border p-2 transition-colors", task.completed ? "bg-muted/50" : "bg-card")}
                >
                  <div className="grid grid-cols-12 items-start gap-2">
                    <div className="col-span-1 flex items-start pt-0.5">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                    </div>
                    <div className="col-span-11 min-w-0">
                      {/* Task header with grid layout */}
                      <div className="grid grid-cols-11 items-center gap-2 mb-1">
                        {/* Title column - 7/11 width */}
                        <div className="col-span-7">
                          <label
                            htmlFor={task.id}
                            className={cn(
                              "text-sm font-medium cursor-pointer break-words",
                              task.completed && "line-through text-muted-foreground",
                            )}
                          >
                            {task.title}
                          </label>
                        </div>

                        {/* Date column */}
                        <div className="col-span-2 flex justify-start">
                          <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                            <Calendar className="h-3 w-3" />
                            {task.dueDate}
                          </Badge>
                        </div>

                        {/* Priority column */}
                        <div className="col-span-1 flex justify-start">
                          <Badge
                            variant="outline"
                            className={cn("flex items-center gap-1 whitespace-nowrap", priorityColors[task.priority])}
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        {/* Action column */}
                        <div className="col-span-1 flex justify-start">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 flex-shrink-0">
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              <span className="sr-only">Toggle details</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                      </div>

                      <p className={cn("text-sm text-muted-foreground break-words", task.completed && "line-through")}>
                        {task.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                        <CategoryIcon className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">
                          {task.garden} • {task.plot}
                        </span>
                        {task.crop && (
                          <>
                            <span>•</span>
                            <span className="truncate">{task.crop}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <CollapsibleContent className="mt-3 space-y-3 pl-8">
                    <div className="rounded-md bg-muted p-3">
                      <h4 className="mb-2 text-sm font-medium">Detailed Instructions:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line break-words">
                        {task.detailedInstructions}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <Button variant="outline" className="w-full">
          View All Tasks in Calendar
        </Button>
      </CardFooter>
    </Card>
  )
}

