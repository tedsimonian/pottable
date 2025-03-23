"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, SunIcon, Droplet, Thermometer, SproutIcon as Seedling, Plus, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for available crops
const getAvailableCrops = () => [
  {
    id: "crop-1",
    name: "Tomato",
    type: "Vegetable",
    image: "/placeholder.svg?height=80&width=80",
    growingConditions: {
      sunlight: "Full Sun",
      water: "Medium",
      temperature: "Warm",
    },
    daysToMaturity: 75,
    spacing: "18-24 inches",
    companionPlants: ["Basil", "Marigold", "Onion"],
    description:
      "Tomatoes are a warm-season crop and one of the most popular vegetables to grow. They require full sun and consistent watering.",
  },
  {
    id: "crop-2",
    name: "Bell Pepper",
    type: "Vegetable",
    image: "/placeholder.svg?height=80&width=80",
    growingConditions: {
      sunlight: "Full Sun",
      water: "Medium",
      temperature: "Warm",
    },
    daysToMaturity: 80,
    spacing: "18-24 inches",
    companionPlants: ["Basil", "Onion", "Spinach"],
    description:
      "Bell peppers are a warm-season crop that require full sun and well-draining soil. They come in various colors and are rich in vitamins.",
  },
  {
    id: "crop-3",
    name: "Basil",
    type: "Herb",
    image: "/placeholder.svg?height=80&width=80",
    growingConditions: {
      sunlight: "Full Sun to Partial Shade",
      water: "Medium",
      temperature: "Warm",
    },
    daysToMaturity: 60,
    spacing: "6-12 inches",
    companionPlants: ["Tomato", "Pepper", "Oregano"],
    description:
      "Basil is a popular culinary herb with a distinctive flavor. It grows well in containers and is a great companion plant for tomatoes.",
  },
  {
    id: "crop-4",
    name: "Lettuce",
    type: "Leafy Green",
    image: "/placeholder.svg?height=80&width=80",
    growingConditions: {
      sunlight: "Partial Shade",
      water: "Medium",
      temperature: "Cool",
    },
    daysToMaturity: 45,
    spacing: "6-8 inches",
    companionPlants: ["Carrot", "Radish", "Cucumber"],
    description:
      "Lettuce is a cool-season crop that grows quickly. It prefers partial shade in warmer climates and can be harvested multiple times.",
  },
  {
    id: "crop-5",
    name: "Carrot",
    type: "Root Vegetable",
    image: "/placeholder.svg?height=80&width=80",
    growingConditions: {
      sunlight: "Full Sun to Partial Shade",
      water: "Medium",
      temperature: "Cool to Moderate",
    },
    daysToMaturity: 70,
    spacing: "2-3 inches",
    companionPlants: ["Onion", "Lettuce", "Rosemary"],
    description:
      "Carrots are a root vegetable that prefer loose, sandy soil. They are rich in beta-carotene and can be grown in containers with sufficient depth.",
  },
]

// Mock function to get current crops in the container
const getCurrentCrops = (containerId: string) => {
  if (containerId === "plot-1") {
    return [
      {
        id: "crop-1",
        name: "Tomato",
        type: "Vegetable",
        plantedDate: "2023-05-20",
        image: "/placeholder.svg?height=60&width=60",
      },
    ]
  } else if (containerId === "plot-2") {
    return [
      {
        id: "crop-2",
        name: "Bell Pepper",
        type: "Vegetable",
        plantedDate: "2023-06-01",
        image: "/placeholder.svg?height=60&width=60",
      },
    ]
  } else {
    return []
  }
}

export function CropSelection({ containerId }: { containerId: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [currentCrops, setCurrentCrops] = useState(getCurrentCrops(containerId))
  const availableCrops = getAvailableCrops()

  const filteredCrops = availableCrops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCrop = (cropId: string) => {
    const cropToAdd = availableCrops.find((crop) => crop.id === cropId)
    if (cropToAdd && !currentCrops.some((crop) => crop.id === cropId)) {
      setCurrentCrops([
        ...currentCrops,
        {
          id: cropToAdd.id,
          name: cropToAdd.name,
          type: cropToAdd.type,
          plantedDate: new Date().toISOString().split("T")[0],
          image: cropToAdd.image,
        },
      ])
    }
    setSelectedCrop(null)
  }

  const handleRemoveCrop = (cropId: string) => {
    setCurrentCrops(currentCrops.filter((crop) => crop.id !== cropId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crops</CardTitle>
        <CardDescription>Manage the crops planted in this container</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentCrops.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Currently Planted</h3>
            <div className="space-y-3">
              {currentCrops.map((crop) => (
                <div key={crop.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                      <img
                        src={crop.image || "/placeholder.svg"}
                        alt={crop.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{crop.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Seedling className="h-3 w-3" />
                        <span>Planted: {crop.plantedDate}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveCrop(crop.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove crop</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed p-6 text-center">
            <Seedling className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium">No Crops Planted</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Select a crop from the list below to add it to this container.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Add Crops</h3>
            <div className="relative w-[180px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-4 space-y-4">
              {filteredCrops.length > 0 ? (
                filteredCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className={`rounded-md border p-4 cursor-pointer transition-colors ${
                      selectedCrop === crop.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCrop(crop.id === selectedCrop ? null : crop.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={crop.image || "/placeholder.svg"}
                          alt={crop.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{crop.name}</div>
                          <Badge variant="outline">{crop.type}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <div className="flex items-center gap-1 text-xs">
                            <SunIcon className="h-3 w-3 text-yellow-500" />
                            <span>{crop.growingConditions.sunlight}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Droplet className="h-3 w-3 text-blue-500" />
                            <span>{crop.growingConditions.water}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Thermometer className="h-3 w-3 text-red-500" />
                            <span>{crop.growingConditions.temperature}</span>
                          </div>
                        </div>
                        {selectedCrop === crop.id && <div className="mt-2 text-sm">{crop.description}</div>}
                      </div>
                    </div>
                    {selectedCrop === crop.id && (
                      <div className="mt-3 pt-3 border-t flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Days to maturity: <span className="font-medium">{crop.daysToMaturity}</span>
                        </div>
                        <Button size="sm" onClick={() => handleAddCrop(crop.id)}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add to Container
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No crops found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

