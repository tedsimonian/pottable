"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, FlowerIcon } from "lucide-react"
import Link from "next/link"

// In a real app, this would fetch container data from your database
const getContainer = (id: string) => {
  return {
    id,
    name: id === "plot-1" ? "Large Pot" : "Medium Pot",
    type: "Pot",
    size: id === "plot-1" ? "Large" : "Medium",
  }
}

export function ContainerHeader({ gardenId, containerId }: { gardenId: string; containerId: string }) {
  const container = getContainer(containerId)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/dashboard/gardens/${gardenId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to garden</span>
            </Link>
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
            <FlowerIcon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">{container.name}</h1>
            <p className="text-sm text-muted-foreground">
              {container.type} • {container.size}
            </p>
          </div>
        </div>
        <div className="ml-auto mt-2 sm:mt-0">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/gardens/${gardenId}/containers/${containerId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Container
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  )
}

