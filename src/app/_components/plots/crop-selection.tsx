"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Search, SproutIcon as Seedling, Sun, ThumbsUp } from "lucide-react"

// Mock data - in a real app, this would come from your database
const crops = [
  {
    id: "crop-1",
    name: "Tomato",
    type: "Vegetable",
    description: "A popular garden vegetable with juicy red fruits.",
    growingCycle: "70-85 days",
    family: "Solanaceae",
    sunlight: "Full Sun",
    water: "Medium",
    difficulty: "Easy",
    recommended: true,
  },
  {
    id: "crop-2",
    name: "Bell Pepper",
    type: "Vegetable",
    description: "Sweet peppers that come in various colors.",
    growingCycle: "60-90 days",
    family: "Solanaceae",
    sunlight: "Full Sun",
    water: "Medium",
    difficulty: "Moderate",
    recommended: true,
  },
  {
    id: "crop-3",
    name: "Basil",
    type: "Herb",
    description: "Aromatic herb used in many cuisines.",
    growingCycle: "50-75 days",
    family: "Lamiaceae",
    sunlight: "Full Sun",
    water: "Medium",
    difficulty: "Easy",
    recommended: true,
  },
  {
    id: "crop-4",
    name: "Strawberry",
    type: "Fruit",
    description: "Sweet red berries that grow on small plants.",
    growingCycle: "90-110 days",
    family: "Rosaceae",
    sunlight: "Full Sun",
    water: "Medium",
    difficulty: "Moderate",
    recommended: false,
  },
  {
    id: "crop-5",
    name: "Mint",
    type: "Herb",
    description: "Fast-growing aromatic herb with many uses.",
    growingCycle: "50-60 days",
    family: "Lamiaceae",
    sunlight: "Partial Sun",
    water: "Medium-High",
    difficulty: "Easy",
    recommended: true,
  },
]

export function CropSelection({ plotId }: { plotId: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("recommended")

  // In a real app, this would check if the plot already has a crop
  const plotHasCrop = plotId === "plot-1" || plotId === "plot-2"

  const filteredCrops = crops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || (activeTab === "recommended" && crop.recommended)
    return matchesSearch && matchesTab
  })

  const handleStartGrowing = () => {
    // In a real app, this would call an API to add the crop to the plot
    console.log(`Starting to grow crop ${selectedCrop} in plot ${plotId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plotHasCrop ? "Current Crop" : "Select a Crop"}</CardTitle>
        <CardDescription>
          {plotHasCrop ? "Information about your current crop" : "Choose a crop to grow in this plot"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!plotHasCrop && (
          <>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="recommended" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="all">All Crops</TabsTrigger>
              </TabsList>
              <TabsContent value="recommended" className="space-y-4 pt-4">
                {filteredCrops.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground">No recommended crops found</div>
                ) : (
                  <div className="space-y-2">
                    {filteredCrops.map((crop) => (
                      <CropCard
                        key={crop.id}
                        crop={crop}
                        isSelected={selectedCrop === crop.id}
                        onSelect={() => setSelectedCrop(crop.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="all" className="space-y-4 pt-4">
                {filteredCrops.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground">No crops found</div>
                ) : (
                  <div className="space-y-2">
                    {filteredCrops.map((crop) => (
                      <CropCard
                        key={crop.id}
                        crop={crop}
                        isSelected={selectedCrop === crop.id}
                        onSelect={() => setSelectedCrop(crop.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <Button className="w-full" disabled={!selectedCrop} onClick={handleStartGrowing}>
              Start Growing
            </Button>
          </>
        )}

        {plotHasCrop && (
          <div className="space-y-4">
            <CropDetails crop={crops[plotId === "plot-1" ? 0 : 1]} />
            <Button variant="outline" className="w-full">
              Replace Crop
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CropCard({
  crop,
  isSelected,
  onSelect,
}: {
  crop: (typeof crops)[0]
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-3 transition-colors ${
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Seedling className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{crop.name}</div>
            <div className="text-xs text-muted-foreground">{crop.type}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {crop.recommended && (
            <Badge variant="outline" className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              Recommended
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

function CropDetails({ crop }: { crop: (typeof crops)[0] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Seedling className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{crop.name}</h3>
          <p className="text-sm text-muted-foreground">
            {crop.type} • {crop.family}
          </p>
        </div>
      </div>

      <p className="text-sm">{crop.description}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Growing Cycle</span>
          <p className="text-sm font-medium">{crop.growingCycle}</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Difficulty</span>
          <p className="text-sm font-medium">{crop.difficulty}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Growing Conditions</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-md border p-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <div>
              <span className="text-xs text-muted-foreground">Sunlight</span>
              <p className="text-xs font-medium">{crop.sunlight}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border p-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <div>
              <span className="text-xs text-muted-foreground">Water</span>
              <p className="text-xs font-medium">{crop.water}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

