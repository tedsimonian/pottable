"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ContainerList } from "@/components/containers/container-list"
import { ArrowLeft, Edit, FlowerIcon, Sun, Wind, Compass, MapPin } from "lucide-react"
import { GardenLayout } from "@/components/gardens/garden-layout"

// Mock function to get garden data
const getGardenData = (gardenId: string) => {
  return {
    id: gardenId,
    name: "My Backyard Garden",
    description: "A small garden in my backyard with good sun exposure.",
    location: "Backyard",
    directionality: "south",
    sunExposure: "full",
    windExposure: "moderate",
    environmentalNotes: "Surrounded by a fence on the north side, providing some wind protection.",
    width: 10,
    length: 15,
    depth: 1,
    createdAt: "2023-05-15",
    containersCount: 3,
    activeCrops: 5,
  }
}

export function GardenDetail({ gardenId }: { gardenId: string }) {
  const [activeTab, setActiveTab] = useState("containers")

  // In a real app, fetch garden data based on gardenId
  const garden = getGardenData(gardenId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="mt-1">
            <Link href="/dashboard/gardens">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to gardens</span>
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold">{garden.name}</h1>
            <p className="text-muted-foreground">{garden.description}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {garden.location}
              </Badge>

              <Badge variant="outline" className="flex items-center gap-1">
                <Compass className="h-3 w-3" />
                {garden.directionality.charAt(0).toUpperCase() + garden.directionality.slice(1)} Facing
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
                <Wind className="h-3 w-3 text-sky-500" />
                {garden.windExposure === "protected"
                  ? "Protected"
                  : garden.windExposure === "moderate"
                    ? "Moderate Wind"
                    : "Exposed"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/gardens/${gardenId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Garden
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FlowerIcon className="h-4 w-4" />
            <span>
              {garden.containersCount} containers • {garden.activeCrops} crops
            </span>
          </div>
        </div>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="layout">Garden Layout</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="containers" className="space-y-4 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Containers</h2>
              <p className="text-sm text-muted-foreground">Manage your garden containers and crops</p>
            </div>
            <Button asChild>
              <Link href={`/dashboard/gardens/${gardenId}/containers/new`}>
                <FlowerIcon className="mr-2 h-4 w-4" />
                New Container
              </Link>
            </Button>
          </div>

          <ContainerList gardenId={gardenId} />
        </TabsContent>

        <TabsContent value="layout" className="pt-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Garden Layout</h2>
              <p className="text-sm text-muted-foreground">Visual representation of your garden</p>
            </div>

            <div className="h-[600px] border rounded-md overflow-hidden">
              <GardenLayout gardenId={gardenId} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="pt-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Garden Analytics</h2>
              <p className="text-sm text-muted-foreground">Track your garden's performance over time</p>
            </div>

            <div className="flex items-center justify-center h-[400px] border rounded-md">
              <p className="text-muted-foreground">Analytics coming soon</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

