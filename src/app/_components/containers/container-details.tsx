"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplet, SproutIcon as Seedling, Sun, Thermometer } from "lucide-react"
import { InteractiveGardenLayout } from "@/components/gardens/interactive-garden-layout"

// In a real app, this would fetch container data from your database
const getContainerDetails = (containerId: string) => {
  if (containerId === "plot-1") {
    return {
      id: containerId,
      name: "Large Pot",
      type: "Pot",
      size: "Large",
      crop: "Tomato",
      status: "Growing",
      progress: 45,
      plantedDate: "2023-05-20",
      harvestDate: "2023-08-15",
      conditions: {
        sunlight: "Full Sun",
        water: "Medium",
        temperature: "Warm",
      },
      tasks: [
        { id: "task-1", name: "Water", dueDate: "Today" },
        { id: "task-2", name: "Fertilize", dueDate: "Next Week" },
      ],
    }
  } else if (containerId === "plot-2") {
    return {
      id: containerId,
      name: "Medium Pot",
      type: "Pot",
      size: "Medium",
      crop: "Bell Pepper",
      status: "Growing",
      progress: 30,
      plantedDate: "2023-06-01",
      harvestDate: "2023-09-01",
      conditions: {
        sunlight: "Full Sun",
        water: "Medium",
        temperature: "Warm",
      },
      tasks: [{ id: "task-3", name: "Water", dueDate: "Tomorrow" }],
    }
  } else {
    return {
      id: containerId,
      name: "Small Pot",
      type: "Pot",
      size: "Small",
      crop: null,
      status: "Empty",
      progress: 0,
      plantedDate: null,
      harvestDate: null,
      conditions: {
        sunlight: "Partial Sun",
        water: "Low",
        temperature: "Moderate",
      },
      tasks: [],
    }
  }
}

export function ContainerDetails({ containerId }: { containerId: string }) {
  const container = getContainerDetails(containerId)

  return (
    <Card className="garden-card border-none">
      <CardHeader className="bg-garden-lightGreen bg-opacity-20">
        <CardTitle className="text-garden-green">Container Details</CardTitle>
        <CardDescription>Information about your container and current crop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-garden-green">Status</h3>
          <div className="flex items-center gap-2">
            <Badge
              variant={container.crop ? "default" : "outline"}
              className={container.crop ? "bg-garden-green text-white" : "text-garden-green border-garden-green"}
            >
              {container.status}
            </Badge>
            {container.crop && (
              <Badge variant="outline" className="flex items-center gap-1 border-garden-green text-garden-green">
                <Seedling className="h-3 w-3" />
                {container.crop}
              </Badge>
            )}
          </div>
        </div>

        {container.crop && (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-garden-green">Growth Progress</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{container.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-garden-lightGreen bg-opacity-30">
                  <div className="h-full rounded-full bg-garden-green" style={{ width: `${container.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-garden-green">Timeline</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Planted</span>
                  <p className="text-sm font-medium">{container.plantedDate}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Expected Harvest</span>
                  <p className="text-sm font-medium">{container.harvestDate}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-garden-green">Growing Conditions</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-md border p-2 bg-garden-yellow bg-opacity-10">
              <Sun className="mb-1 h-4 w-4 text-garden-yellow" />
              <span className="text-xs text-muted-foreground">Sunlight</span>
              <span className="text-xs font-medium">{container.conditions.sunlight}</span>
            </div>
            <div className="flex flex-col items-center rounded-md border p-2 bg-garden-blue bg-opacity-10">
              <Droplet className="mb-1 h-4 w-4 text-garden-blue" />
              <span className="text-xs text-muted-foreground">Water</span>
              <span className="text-xs font-medium">{container.conditions.water}</span>
            </div>
            <div className="flex flex-col items-center rounded-md border p-2 bg-garden-orange bg-opacity-10">
              <Thermometer className="mb-1 h-4 w-4 text-garden-orange" />
              <span className="text-xs text-muted-foreground">Temperature</span>
              <span className="text-xs font-medium">{container.conditions.temperature}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-garden-green">Garden Layout</h3>
          <InteractiveGardenLayout gardenId="garden-1" editable={false} />
        </div>

        {container.crop && container.tasks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-garden-green">Upcoming Tasks</h3>
            <div className="space-y-2">
              {container.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-md border p-2 hover:bg-garden-lightGreen hover:bg-opacity-10 transition-colors"
                >
                  <span className="text-sm">{task.name}</span>
                  <Badge variant="outline" className="border-garden-green text-garden-green">
                    {task.dueDate}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {!container.crop && (
          <div className="rounded-md border border-dashed p-6 text-center border-garden-lightGreen">
            <Seedling className="mx-auto h-8 w-8 text-garden-green text-opacity-50" />
            <h3 className="mt-2 text-sm font-medium text-garden-green">No Crop Planted</h3>
            <p className="mt-1 text-xs text-muted-foreground">Select a crop to start growing in this container.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

