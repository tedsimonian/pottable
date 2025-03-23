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
import { FlowerIcon, MoreHorizontal, Pencil, Trash2, Droplet, Ruler, CircleIcon, SquareIcon } from "lucide-react"

// Mock function to get containers
const getContainers = (gardenId: string) => [
  {
    id: "container-1",
    name: "Tomato Pot",
    type: "pot",
    shape: "circular",
    soilType: "potting",
    hasDrainage: true,
    width: 2,
    length: 2,
    depth: 1,
    crops: [
      {
        id: "crop-1",
        name: "Tomato",
        type: "Vegetable",
        picture: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "crop-2",
        name: "Basil",
        type: "Herb",
        picture: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: "container-2",
    name: "Raised Bed",
    type: "raised-bed",
    shape: "rectangular",
    soilType: "garden",
    hasDrainage: true,
    width: 4,
    length: 8,
    depth: 1.5,
    crops: [
      {
        id: "crop-3",
        name: "Carrot",
        type: "Root Vegetable",
        picture: "/placeholder.svg?height=60&width=60",
      },
      {
        id: "crop-4",
        name: "Lettuce",
        type: "Leafy Green",
        picture: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: "container-3",
    name: "Herb Pot",
    type: "pot",
    shape: "circular",
    soilType: "potting",
    hasDrainage: true,
    width: 1,
    length: 1,
    depth: 0.5,
    crops: [
      {
        id: "crop-2",
        name: "Basil",
        type: "Herb",
        picture: "/placeholder.svg?height=60&width=60",
      },
    ],
  },
  {
    id: "container-4",
    name: "Empty Container",
    type: "container",
    shape: "rectangular",
    soilType: "potting",
    hasDrainage: true,
    width: 2,
    length: 1,
    depth: 0.75,
    crops: [],
  },
]

export function ContainerList({ gardenId }: { gardenId: string }) {
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
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                    {container.shape === "circular" ? (
                      <CircleIcon className="h-3 w-3" />
                    ) : container.shape === "square" ? (
                      <SquareIcon className="h-3 w-3" />
                    ) : (
                      <SquareIcon className="h-3 w-3" />
                    )}
                    {container.shape.charAt(0).toUpperCase() + container.shape.slice(1)}
                  </Badge>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <FlowerIcon className="h-3 w-3" />
                    {container.type.charAt(0).toUpperCase() + container.type.slice(1)}
                  </Badge>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    {container.shape === "circular"
                      ? `${container.width} ft diameter`
                      : `${container.width} × ${container.length} ft`}
                  </Badge>

                  {container.hasDrainage && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Droplet className="h-3 w-3" />
                      Drainage
                    </Badge>
                  )}
                </div>

                {container.crops.length > 0 ? (
                  <div className="space-y-3 mb-3">
                    <div className="text-sm font-medium">Crops</div>
                    <div className="flex flex-wrap gap-2">
                      {container.crops.map((crop) => (
                        <div key={crop.id} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                          <div className="h-8 w-8 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                            <img
                              src={crop.picture || "/placeholder.svg"}
                              alt={crop.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{crop.name}</div>
                            <div className="text-xs text-muted-foreground">{crop.type}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 bg-muted/30 rounded-md mb-3">
                    <div className="text-center">
                      <FlowerIcon className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground mt-1">No crops planted</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t bg-muted/50 p-3 flex justify-between">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${gardenId}/containers/${container.id}`}>View Details</Link>
                </Button>

                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${gardenId}/containers/${container.id}/edit`}>Edit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

