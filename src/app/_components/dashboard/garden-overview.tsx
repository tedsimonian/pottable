"use client"

import { GardenCard } from "@/components/ui/garden-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FlowerIcon } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your database
const gardens = [
  {
    id: "garden-1",
    name: "Balcony Garden",
    plotsCount: 3,
    activeCrops: 2,
  },
  {
    id: "garden-2",
    name: "Indoor Herbs",
    plotsCount: 2,
    activeCrops: 3,
  },
]

export function GardenOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Gardens</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/gardens">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {gardens.map((garden) => (
          <GardenCard
            key={garden.id}
            header={
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <FlowerIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{garden.name}</h3>
                </div>
              </div>
            }
            content={
              <div className="text-sm text-muted-foreground">
                {garden.plotsCount} plots • {garden.activeCrops} active crops
              </div>
            }
            footer={
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href={`/dashboard/gardens/${garden.id}`}>Manage Garden</Link>
              </Button>
            }
          />
        ))}
      </div>
    </div>
  )
}

