"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Leaf,
  MoreHorizontal,
  Pencil,
  Trash2,
  Droplet,
  Ruler,
  SproutIcon as SeedingIcon,
  Plus,
  Calendar,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for containers
const getContainers = (gardenId: string) => [
  {
    id: "plot-1",
    name: "Tomato Pot",
    containerType: "pot",
    containerSize: {
      width: 1.5,
      length: 1.5,
      depth: 1.2,
    },
    soilType: "potting",
    hasDrainage: true,
    location: "East side of balcony",
    crop: {
      id: "crop-1",
      name: "Tomato",
      type: "Vegetable",
      plantedDate: "2023-05-20",
      daysToMaturity: 75,
      progress: 45,
      nextTask: {
        name: "Water",
        dueDate: "Today",
      },
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
  },
  {
    id: "plot-2",
    name: "Bell Pepper Container",
    containerType: "container",
    containerSize: {
      width: 1.2,
      length: 1.2,
      depth: 1.0,
    },
    soilType: "potting",
    hasDrainage: true,
    location: "South corner of balcony",
    crop: {
      id: "crop-2",
      name: "Bell Pepper",
      type: "Vegetable",
      plantedDate: "2023-06-01",
      daysToMaturity: 80,
      progress: 30,
      nextTask: {
        name: "Fertilize",
        dueDate: "Tomorrow",
      },
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
  },
  {
    id: "plot-3",
    name: "Herb Pot",
    containerType: "pot",
    containerSize: {
      width: 0.8,
      length: 0.8,
      depth: 0.6,
    },
    soilType: "potting",
    hasDrainage: true,
    location: "Kitchen windowsill",
    crop: {
      id: "crop-3",
      name: "Basil",
      type: "Herb",
      plantedDate: "2023-06-15",
      daysToMaturity: 60,
      progress: 70,
      nextTask: {
        name: "Harvest",
        dueDate: "This week",
      },
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
  },
  {
    id: "plot-4",
    name: "Empty Pot",
    containerType: "pot",
    containerSize: {
      width: 1.0,
      length: 1.0,
      depth: 0.8,
    },
    soilType: "potting",
    hasDrainage: true,
    location: "West side of balcony",
    crop: null,
  },
]

interface ContainersListProps {
  gardenId: string
}

export function ContainersList({ gardenId }: ContainersListProps) {
  const [containers, setContainers] = useState(getContainers(gardenId))
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [containerToDelete, setContainerToDelete] = useState<string | null>(null)

  const handleDeleteClick = (containerId: string) => {
    setContainerToDelete(containerId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (containerToDelete) {
      setContainers(containers.filter((container) => container.id !== containerToDelete))
      setDeleteDialogOpen(false)
      setContainerToDelete(null)
    }
  }

  return (
    <>
      {containers.map((container) => (
        <Card key={container.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium truncate">{container.name}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/dashboard/gardens/${gardenId}/containers/${container.id}/edit`}
                        className="flex items-center"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Container
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteClick(container.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Container
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  {container.containerType.charAt(0).toUpperCase() + container.containerType.slice(1)}
                </Badge>

                <Badge variant="outline" className="flex items-center gap-1">
                  <Ruler className="h-3 w-3" />
                  {container.containerSize.width} × {container.containerSize.length} ft
                </Badge>

                {container.hasDrainage && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Droplet className="h-3 w-3" />
                    Drainage
                  </Badge>
                )}
              </div>

              {container.crop ? (
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                    <img
                      src={container.crop.imageUrl || "/placeholder.svg"}
                      alt={container.crop.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{container.crop.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <SeedingIcon className="h-3 w-3" />
                      <span>Planted: {container.crop.plantedDate}</span>
                    </div>

                    <div className="mt-1 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Growth Progress</span>
                        <span>{container.crop.progress}%</span>
                      </div>
                      <Progress value={container.crop.progress} className="h-1.5" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-24 bg-muted/30 rounded-md mb-3">
                  <div className="text-center">
                    <SeedingIcon className="h-8 w-8 mx-auto text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground mt-1">No crop planted</p>
                  </div>
                </div>
              )}

              {container.crop?.nextTask && (
                <div className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{container.crop.nextTask.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {container.crop.nextTask.dueDate}
                  </Badge>
                </div>
              )}
            </div>

            <div className="border-t bg-muted/50 p-3 flex justify-between">
              {container.crop ? (
                <Button variant="default" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${gardenId}/containers/${container.id}`}>Manage Crop</Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${gardenId}/containers/${container.id}/add-crop`}>
                    <Plus className="mr-1 h-3 w-3" />
                    Add Crop
                  </Link>
                </Button>
              )}

              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/gardens/${gardenId}/containers/${container.id}`}>Details</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this container and any associated crop data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

