"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CropDetail } from "@/components/crops/crop-detail"
import { ArrowLeft, Edit, FlowerIcon, Droplet, Ruler, CircleIcon, SquareIcon } from "lucide-react"

// Mock function to get container data
const getContainerData = (containerId: string) => {
  return {
    id: containerId,
    name: "Tomato Pot",
    type: "pot",
    shape: "circular",
    soilType: "potting",
    hasDrainage: true,
    width: 2,
    length: 2,
    depth: 1,
    location: { x: 1, y: 1 },
    notes: "Gets morning sun, afternoon shade",
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
  }
}

export function ContainerDetail({ gardenId, containerId }: { gardenId: string; containerId: string }) {
  const [activeTab, setActiveTab] = useState("details")
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null)

  // In a real app, fetch container data based on containerId
  const container = getContainerData(containerId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="mt-1">
            <Link href={`/dashboard/gardens/${gardenId}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to garden</span>
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold">{container.name}</h1>
            <p className="text-muted-foreground">{container.notes}</p>

            <div className="flex flex-wrap gap-2 mt-3">
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
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/gardens/${gardenId}/containers/${containerId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Container
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FlowerIcon className="h-4 w-4" />
            <span>{container.crops.length} crops</span>
          </div>
        </div>
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Container Details</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Container Information</h2>
                <p className="text-sm text-muted-foreground">Details about this growing container</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Type</div>
                  <div className="text-sm font-medium">
                    {container.type.charAt(0).toUpperCase() + container.type.slice(1)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Shape</div>
                  <div className="text-sm font-medium">
                    {container.shape.charAt(0).toUpperCase() + container.shape.slice(1)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Soil Type</div>
                  <div className="text-sm font-medium">
                    {container.soilType.charAt(0).toUpperCase() + container.soilType.slice(1)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Drainage</div>
                  <div className="text-sm font-medium">{container.hasDrainage ? "Yes" : "No"}</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Dimensions</div>
                <div className="text-sm font-medium">
                  {container.shape === "circular"
                    ? `${container.width} ft diameter × ${container.depth} ft deep`
                    : `${container.width} × ${container.length} × ${container.depth} ft`}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Volume</div>
                <div className="text-sm font-medium">
                  {container.shape === "circular"
                    ? `${(Math.PI * Math.pow(container.width / 2, 2) * container.depth).toFixed(1)} cubic ft`
                    : `${(container.width * container.length * container.depth).toFixed(1)} cubic ft`}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Location in Garden</div>
                <div className="text-sm font-medium">
                  Position: {container.location.x.toFixed(1)}, {container.location.y.toFixed(1)}
                </div>
              </div>

              {container.notes && (
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Notes</div>
                  <div className="text-sm">{container.notes}</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Container Preview</h2>
                <p className="text-sm text-muted-foreground">Visual representation of your container</p>
              </div>

              <div className="h-[300px] border rounded-md flex items-center justify-center bg-muted/30">
                <div
                  className={`border-2 border-primary bg-primary/10 ${
                    container.shape === "circular" ? "rounded-full" : "rounded-md"
                  }`}
                  style={{
                    width: `${Math.min(80, (container.width / 5) * 80)}%`,
                    height: `${Math.min(80, (container.length / 5) * 80)}%`,
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="font-medium">{container.name}</div>
                      {container.crops.length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">{container.crops.length} crops planted</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="crops" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Planted Crops</h2>
                <p className="text-sm text-muted-foreground">
                  {container.crops.length > 0
                    ? `${container.crops.length} crops planted in this container`
                    : "No crops planted yet"}
                </p>
              </div>

              {container.crops.length > 0 ? (
                <div className="space-y-2">
                  {container.crops.map((crop) => (
                    <div
                      key={crop.id}
                      className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedCropId === crop.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCropId(crop.id)}
                    >
                      <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
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
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-md bg-muted/30">
                  <div className="text-center">
                    <FlowerIcon className="h-10 w-10 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-2">No crops planted yet</p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                      <Link href={`/dashboard/gardens/${gardenId}/containers/${containerId}/edit`}>Add Crops</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {selectedCropId ? (
                <CropDetail cropId={selectedCropId} />
              ) : (
                <div className="flex items-center justify-center h-full border rounded-md bg-muted/30">
                  <div className="text-center">
                    <FlowerIcon className="h-10 w-10 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-2">Select a crop to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

