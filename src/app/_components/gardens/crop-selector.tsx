"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Leaf, ThumbsUp, Sun, Droplet, Thermometer } from "lucide-react"

// Mock data for crops
const crops = [
  {
    id: "crop-1",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    type: "Vegetable",
    family: "Solanaceae",
    description: "A popular garden vegetable with juicy red fruits.",
    sunlight: "full",
    water: "moderate",
    minTemp: 50,
    maxTemp: 95,
    daysToMaturity: "70-85",
    spacing: 24,
    minDepth: 12,
    companionPlants: ["Basil", "Marigold", "Onion"],
    avoidPlants: ["Potato", "Corn", "Fennel"],
    difficulty: "easy",
    seasonality: ["spring", "summer"],
    tags: ["container-friendly", "beginner-friendly"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "crop-2",
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    type: "Vegetable",
    family: "Solanaceae",
    description: "Sweet peppers that come in various colors.",
    sunlight: "full",
    water: "moderate",
    minTemp: 65,
    maxTemp: 95,
    daysToMaturity: "60-90",
    spacing: 18,
    minDepth: 12,
    companionPlants: ["Basil", "Onion", "Spinach"],
    avoidPlants: ["Kohlrabi", "Fennel"],
    difficulty: "moderate",
    seasonality: ["spring", "summer"],
    tags: ["container-friendly"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "crop-3",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    type: "Herb",
    family: "Lamiaceae",
    description: "Aromatic herb used in many cuisines.",
    sunlight: "full",
    water: "moderate",
    minTemp: 50,
    maxTemp: 90,
    daysToMaturity: "50-75",
    spacing: 10,
    minDepth: 6,
    companionPlants: ["Tomato", "Pepper", "Oregano"],
    avoidPlants: ["Rue"],
    difficulty: "easy",
    seasonality: ["spring", "summer"],
    tags: ["container-friendly", "beginner-friendly", "indoor-friendly"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "crop-4",
    name: "Strawberry",
    scientificName: "Fragaria × ananassa",
    type: "Fruit",
    family: "Rosaceae",
    description: "Sweet red berries that grow on small plants.",
    sunlight: "full",
    water: "moderate",
    minTemp: 35,
    maxTemp: 85,
    daysToMaturity: "90-110",
    spacing: 12,
    minDepth: 8,
    companionPlants: ["Spinach", "Lettuce", "Onion"],
    avoidPlants: ["Cabbage", "Broccoli"],
    difficulty: "moderate",
    seasonality: ["spring", "summer"],
    tags: ["container-friendly", "perennial"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "crop-5",
    name: "Mint",
    scientificName: "Mentha",
    type: "Herb",
    family: "Lamiaceae",
    description: "Fast-growing aromatic herb with many uses.",
    sunlight: "partial",
    water: "moderate-high",
    minTemp: 30,
    maxTemp: 80,
    daysToMaturity: "50-60",
    spacing: 12,
    minDepth: 6,
    companionPlants: ["Tomato", "Cabbage"],
    avoidPlants: ["Other herbs"],
    difficulty: "easy",
    seasonality: ["spring", "summer", "fall"],
    tags: ["container-friendly", "beginner-friendly", "invasive", "perennial", "indoor-friendly"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "crop-6",
    name: "Lettuce",
    scientificName: "Lactuca sativa",
    type: "Vegetable",
    family: "Asteraceae",
    description: "Leafy green vegetable popular in salads.",
    sunlight: "partial",
    water: "moderate",
    minTemp: 40,
    maxTemp: 75,
    daysToMaturity: "45-55",
    spacing: 8,
    minDepth: 4,
    companionPlants: ["Carrot", "Radish", "Cucumber"],
    avoidPlants: ["Broccoli", "Sunflower"],
    difficulty: "easy",
    seasonality: ["spring", "fall"],
    tags: ["container-friendly", "beginner-friendly", "quick-harvest"],
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

interface CropSelectorProps {
  selectedCropId?: string
  onSelect: (cropId: string) => void
  containerType: string
  containerSize: {
    width: number
    length: number
    depth: number
  }
  soilType: string
}

export function CropSelector({ selectedCropId, onSelect, containerType, containerSize, soilType }: CropSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recommended")

  // Filter crops based on search query and tab
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch

    // For recommended tab, filter based on container compatibility
    if (activeTab === "recommended") {
      // Check if crop is suitable for the container
      const isContainerCompatible =
        (containerType === "pot" && crop.tags.includes("container-friendly")) ||
        (containerType === "raised-bed" && crop.minDepth <= containerSize.depth * 12) ||
        containerType === "ground" ||
        (containerType === "container" && crop.tags.includes("container-friendly")) ||
        (containerType === "vertical" && crop.spacing <= 12) ||
        (containerType === "hydroponic" && ["Lettuce", "Basil", "Mint"].includes(crop.name))

      return matchesSearch && isContainerCompatible
    }

    return matchesSearch
  })

  // Get recommended crops based on container type and size
  const getRecommendedCrops = () => {
    return filteredCrops.filter((crop) => {
      // Check if crop fits in container
      const fitsContainer = crop.spacing <= Math.min(containerSize.width, containerSize.length) * 12

      // Check if container is deep enough
      const hasEnoughDepth = crop.minDepth <= containerSize.depth * 12

      return fitsContainer && hasEnoughDepth
    })
  }

  const recommendedCrops = getRecommendedCrops()

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={() => setSearchQuery("")}>
          Clear
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recommended">Recommended ({recommendedCrops.length})</TabsTrigger>
          <TabsTrigger value="all">All Crops ({filteredCrops.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="pt-2">
          {recommendedCrops.length === 0 ? (
            <div className="text-center py-8">
              <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">
                {searchQuery ? "No matching crops found" : "No recommended crops for this container"}
              </p>
              <Button variant="link" onClick={() => setActiveTab("all")} className="mt-2">
                View all crops
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2 pt-2">
                {recommendedCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    isSelected={selectedCropId === crop.id}
                    onSelect={() => onSelect(crop.id)}
                    isRecommended={true}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="all" className="pt-2">
          {filteredCrops.length === 0 ? (
            <div className="text-center py-8">
              <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No crops found</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2 pt-2">
                {filteredCrops.map((crop) => (
                  <CropCard
                    key={crop.id}
                    crop={crop}
                    isSelected={selectedCropId === crop.id}
                    onSelect={() => onSelect(crop.id)}
                    isRecommended={recommendedCrops.some((c) => c.id === crop.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>

      {selectedCropId && (
        <CropDetails
          crop={crops.find((c) => c.id === selectedCropId)!}
          containerType={containerType}
          containerSize={containerSize}
        />
      )}
    </div>
  )
}

interface CropCardProps {
  crop: (typeof crops)[0]
  isSelected: boolean
  onSelect: () => void
  isRecommended: boolean
}

function CropCard({ crop, isSelected, onSelect, isRecommended }: CropCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-colors ${
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
            <img src={crop.imageUrl || "/placeholder.svg"} alt={crop.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="font-medium truncate">{crop.name}</div>
              {isRecommended && (
                <Badge variant="outline" className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <ThumbsUp className="h-3 w-3" />
                  Recommended
                </Badge>
              )}
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{crop.type}</span>
              <span>•</span>
              <span>{crop.daysToMaturity} days</span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {crop.difficulty}
              </Badge>

              {crop.sunlight === "full" ? (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <Sun className="h-3 w-3 text-yellow-500" />
                  Full Sun
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <Sun className="h-3 w-3 text-yellow-500" />
                  Partial Sun
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CropDetailsProps {
  crop: (typeof crops)[0]
  containerType: string
  containerSize: {
    width: number
    length: number
    depth: number
  }
}

function CropDetails({ crop, containerType, containerSize }: CropDetailsProps) {
  // Calculate how many of this crop can fit in the container
  const calculatePlantCount = () => {
    const areaInSqInches = containerSize.width * containerSize.length * 144 // convert sq ft to sq inches
    const spacingInSqInches = crop.spacing * crop.spacing

    return Math.floor(areaInSqInches / spacingInSqInches)
  }

  const plantCount = calculatePlantCount()

  // Check if container is suitable
  const isContainerSuitable = crop.minDepth <= containerSize.depth * 12

  return (
    <div className="rounded-lg border p-4 mt-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
          <img src={crop.imageUrl || "/placeholder.svg"} alt={crop.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <h3 className="font-medium">{crop.name}</h3>
          <p className="text-xs text-muted-foreground">{crop.scientificName}</p>
        </div>
      </div>

      <p className="text-sm mb-3">{crop.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Days to Maturity</div>
          <div className="text-sm font-medium">{crop.daysToMaturity} days</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Spacing Needed</div>
          <div className="text-sm font-medium">{crop.spacing} inches</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Minimum Depth</div>
          <div className="text-sm font-medium">{crop.minDepth} inches</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Plants in Container</div>
          <div className="text-sm font-medium">
            {plantCount} plant{plantCount !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="flex flex-col items-center rounded-md border p-2">
          <Sun className="h-4 w-4 text-yellow-500 mb-1" />
          <span className="text-xs text-muted-foreground">Sunlight</span>
          <span className="text-xs font-medium">{crop.sunlight === "full" ? "Full Sun" : "Partial Sun"}</span>
        </div>

        <div className="flex flex-col items-center rounded-md border p-2">
          <Droplet className="h-4 w-4 text-blue-500 mb-1" />
          <span className="text-xs text-muted-foreground">Water</span>
          <span className="text-xs font-medium">
            {crop.water === "low"
              ? "Low"
              : crop.water === "moderate"
                ? "Moderate"
                : crop.water === "moderate-high"
                  ? "Moderate-High"
                  : "High"}
          </span>
        </div>

        <div className="flex flex-col items-center rounded-md border p-2">
          <Thermometer className="h-4 w-4 text-red-500 mb-1" />
          <span className="text-xs text-muted-foreground">Temperature</span>
          <span className="text-xs font-medium">
            {crop.minTemp}°-{crop.maxTemp}°F
          </span>
        </div>
      </div>

      {!isContainerSuitable && (
        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-2 text-sm text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300 mb-3">
          <strong>Warning:</strong> This container may not be deep enough for {crop.name}. It needs at least{" "}
          {crop.minDepth} inches of depth.
        </div>
      )}

      <div className="space-y-1">
        <div className="text-xs font-medium">Companion Plants</div>
        <div className="flex flex-wrap gap-1">
          {crop.companionPlants.map((plant) => (
            <Badge key={plant} variant="outline" className="text-xs">
              {plant}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

