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
import { FlowerIcon, MoreHorizontal, Pencil, Trash2, Sun, Droplet, Ruler, Users } from "lucide-react"

// Mock data for gardens
const initialGardens = [
  {
    id: "garden-1",
    name: "My Balcony Garden",
    description: "A small garden on my east-facing balcony with morning sun and afternoon shade.",
    gardenType: "balcony",
    sunExposure: "partial",
    waterAccess: "easy",
    windExposure: "moderate",
    soilType: "potting",
    spaceWidth: 3,
    spaceLength: 5,
    isShared: false,
    createdAt: "2023-05-15",
    plotsCount: 3,
    activeCrops: 2,
  },
  {
    id: "garden-2",
    name: "Indoor Herbs",
    description: "Kitchen windowsill herb collection with good natural light.",
    gardenType: "windowsill",
    sunExposure: "partial",
    waterAccess: "easy",
    windExposure: "protected",
    soilType: "potting",
    spaceWidth: 2,
    spaceLength: 0.5,
    isShared: false,
    createdAt: "2023-06-01",
    plotsCount: 2,
    activeCrops: 2,
  },
  {
    id: "garden-3",
    name: "Backyard Vegetable Garden",
    description: "Larger garden with raised beds for vegetables and herbs.",
    gardenType: "backyard",
    sunExposure: "full",
    waterAccess: "moderate",
    windExposure: "moderate",
    soilType: "garden",
    spaceWidth: 10,
    spaceLength: 15,
    isShared: true,
    createdAt: "2023-04-10",
    plotsCount: 4,
    activeCrops: 4,
  },
]

export function GardensList() {
  const [gardens, setGardens] = useState(initialGardens)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [gardenToDelete, setGardenToDelete] = useState<string | null>(null)

  const handleDeleteClick = (gardenId: string) => {
    setGardenToDelete(gardenId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (gardenToDelete) {
      setGardens(gardens.filter((garden) => garden.id !== gardenToDelete))
      setDeleteDialogOpen(false)
      setGardenToDelete(null)
    }
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {gardens.map((garden) => (
          <Card key={garden.id} className="overflow-hidden flex flex-col h-full">
            <CardContent className="p-0 flex flex-col flex-1">
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">{garden.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/gardens/${garden.id}/edit`} className="flex items-center">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Garden
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClick(garden.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Garden
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{garden.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <FlowerIcon className="h-3 w-3" />
                    {garden.gardenType.charAt(0).toUpperCase() + garden.gardenType.slice(1)}
                  </Badge>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <Sun className="h-3 w-3 text-yellow-500" />
                    {garden.sunExposure === "full"
                      ? "Full Sun"
                      : garden.sunExposure === "partial"
                        ? "Partial Sun"
                        : "Shade"}
                  </Badge>

                  <Badge variant="outline" className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    {garden.spaceWidth} × {garden.spaceLength} ft
                  </Badge>

                  {garden.isShared && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Shared
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <FlowerIcon className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <span className="font-medium">{garden.plotsCount}</span> Plots
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <div className="text-sm">
                      <span className="font-medium">{garden.activeCrops}</span> Crops
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t bg-muted/50 p-3 flex justify-between mt-auto">
                <Button variant="default" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${garden.id}`}>View Garden</Link>
                </Button>

                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/dashboard/gardens/${garden.id}/plots/new`}>Add Plot</Link>
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
              This will permanently delete this garden and all its plots and crops. This action cannot be undone.
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

