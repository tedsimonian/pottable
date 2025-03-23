"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FlowerIcon, Search, X } from "lucide-react"

interface CropSelectorProps {
  selectedCropIds: string[]
  onCropSelect: (cropId: string) => void
  onCropRemove: (cropId: string) => void
  containerType: string
  containerShape: string
  containerSize: {
    width: number
    length: number
    depth: number
  }
  soilType: string
}

// Mock function to get crops
const getCrops = () => [
  {
    id: "crop-1",
    name: "Tomato",
    type: "Vegetable",
    family: "Solanaceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Medium",
    sunlight: "Full",
    water: "Medium",
    season: "Summer",
  },
  {
    id: "crop-2",
    name: "Basil",
    type: "Herb",
    family: "Lamiaceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Easy",
    sunlight: "Full to Partial",
    water: "Medium",
    season: "Summer",
  },
  {
    id: "crop-3",
    name: "Carrot",
    type: "Root Vegetable",
    family: "Apiaceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Easy",
    sunlight: "Full to Partial",
    water: "Medium",
    season: "Spring, Fall",
  },
  {
    id: "crop-4",
    name: "Lettuce",
    type: "Leafy Green",
    family: "Asteraceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Easy",
    sunlight: "Partial",
    water: "High",
    season: "Spring, Fall",
  },
  {
    id: "crop-5",
    name: "Pepper",
    type: "Vegetable",
    family: "Solanaceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Medium",
    sunlight: "Full",
    water: "Medium",
    season: "Summer",
  },
  {
    id: "crop-6",
    name: "Cucumber",
    type: "Vegetable",
    family: "Cucurbitaceae",
    picture: "/placeholder.svg?height=60&width=60",
    difficulty: "Medium",
    sunlight: "Full",
    water: "High",
    season: "Summer",
  },
]

export function CropSelector({
  selectedCropIds,
  onCropSelect,
  onCropRemove,
  containerType,
  containerShape,
  containerSize,
  soilType,
}: CropSelectorProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const crops = getCrops()

  // Filter crops based on search query
  const filteredCrops = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.family.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get recommended crops based on container properties
  const getRecommendedCrops = () => {
    // This would be more sophisticated in a real app
    if (containerType === "pot" && containerSize.depth < 1) {
      return crops.filter((crop) => crop.type === "Herb" || crop.name === "Lettuce")
    } else if (containerShape === "rectangular" && containerSize.width >= 3) {
      return crops.filter((crop) => crop.type === "Vegetable" || crop.type === "Root Vegetable")
    } else {
      return crops.filter((crop) => crop.difficulty === "Easy")
    }
  }

  const recommendedCrops = getRecommendedCrops()

  return (
    <div className="space-y-4">
      {/* Selected Crops */}
      <div className="space-y-2">
        <div className="text-sm font-medium">Selected Crops</div>
        <div className="min-h-16 p-3 border rounded-md bg-muted/30">
          {selectedCropIds.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedCropIds.map((cropId) => {
                const crop = crops.find((c) => c.id === cropId)
                if (!crop) return null

                return (
                  <Badge key={crop.id} variant="secondary" className="flex items-center gap-1 p-1 pl-2">
                    {crop.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => onCropRemove(crop.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {crop.name}</span>
                    </Button>
                  </Badge>
                )
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-16">
              <p className="text-sm text-muted-foreground">No crops selected</p>
            </div>
          )}
        </div>
      </div>

      {/* Crop Selection */}
      <div className="border rounded-md">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search crops..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-3 pt-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Crops</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="p-3 pt-4">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {filteredCrops.length > 0 ? (
                filteredCrops.map((crop) => (
                  <Card
                    key={crop.id}
                    className={`cursor-pointer transition-colors ${
                      selectedCropIds.includes(crop.id) ? "border-primary" : ""
                    }`}
                    onClick={() => onCropSelect(crop.id)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
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
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center h-32">
                  <div className="text-center">
                    <FlowerIcon className="h-8 w-8 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-2">No crops found</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="p-3 pt-4">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {recommendedCrops.length > 0 ? (
                recommendedCrops.map((crop) => (
                  <Card
                    key={crop.id}
                    className={`cursor-pointer transition-colors ${
                      selectedCropIds.includes(crop.id) ? "border-primary" : ""
                    }`}
                    onClick={() => onCropSelect(crop.id)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
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
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center h-32">
                  <div className="text-center">
                    <FlowerIcon className="h-8 w-8 mx-auto text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-2">No recommended crops for this container</p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

