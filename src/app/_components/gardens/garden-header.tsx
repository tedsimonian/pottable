"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, FlowerIcon } from "lucide-react"
import Link from "next/link"

// In a real app, this would fetch garden data from your database
const getGarden = (id: string) => {
  return {
    id,
    name: id === "garden-1" ? "Balcony Garden" : "Indoor Herbs",
    description:
      id === "garden-1" ? "My small balcony garden with vegetables and herbs" : "Kitchen windowsill herb collection",
  }
}

export function GardenHeader({ gardenId }: { gardenId: string }) {
  const garden = getGarden(gardenId)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-garden-green hover:bg-garden-lightGreen hover:bg-opacity-20"
          >
            <Link href="/dashboard/gardens">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to gardens</span>
            </Link>
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-garden-green bg-opacity-20 flex-shrink-0">
            <FlowerIcon className="h-5 w-5 text-garden-green" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate text-garden-green">{garden.name}</h1>
            <p className="text-sm text-muted-foreground line-clamp-2">{garden.description}</p>
          </div>
        </div>
        <div className="ml-auto mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="rounded-full border-garden-green text-garden-green hover:bg-garden-lightGreen hover:text-garden-green hover:border-garden-green"
          >
            <Link href={`/dashboard/gardens/${gardenId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Garden
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="bg-garden-lightGreen" />
    </div>
  )
}

