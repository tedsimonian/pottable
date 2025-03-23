"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sun, Droplet, Thermometer, Calendar, ThumbsUp, ThumbsDown, AlertTriangle, Sprout } from "lucide-react"

// Mock function to get crop data
const getCropData = (cropId: string) => {
  return {
    id: cropId,
    name: "Tomato",
    type: "Vegetable",
    family: "Solanaceae",
    picture: "/placeholder.svg?height=120&width=120",
    description:
      "Tomatoes are a popular garden vegetable with juicy red fruits. They come in many varieties, from small cherry tomatoes to large beefsteak varieties. They require full sun and consistent watering for best results.",
    growingCycle: "70-85 days",
    difficulty: "moderate",
    lifeCycle: "annual",
    determinate: false,
    transplantable: true,
    scarification: false,
    growingConditions: {
      sunlight: "full",
      water: "moderate",
      minTemp: 50,
      maxTemp: 95,
      soilTypes: ["garden", "potting"],
      season: ["spring", "summer"],
    },
    companionCrops: ["basil", "marigold", "onion"],
    enemyCrops: ["potato", "corn", "fennel"],
    trapCrops: [],
    pruning: "Regular pruning of suckers improves air circulation and fruit production.",
  }
}

interface CropDetailProps {
  cropId: string
}

export function CropDetail({ cropId }: CropDetailProps) {
  const crop = getCropData(cropId)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
            <img src={crop.picture || "/placeholder.svg"} alt={crop.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <CardTitle>{crop.name}</CardTitle>
            <CardDescription>
              {crop.type} • {crop.family}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{crop.description}</p>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Growing Cycle</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {crop.growingCycle}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Life Cycle</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Sprout className="h-4 w-4 text-muted-foreground" />
              {crop.lifeCycle.charAt(0).toUpperCase() + crop.lifeCycle.slice(1)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Difficulty</div>
            <div className="text-sm font-medium">
              <Badge variant="secondary">{crop.difficulty}</Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Transplantable</div>
            <div className="text-sm font-medium">
              {crop.transplantable ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Yes
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  Direct Sow Only
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Growing Conditions</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center rounded-md border p-2">
              <Sun className="h-4 w-4 text-yellow-500 mb-1" />
              <span className="text-xs text-muted-foreground">Sunlight</span>
              <span className="text-xs font-medium">
                {crop.growingConditions.sunlight === "full" ? "Full Sun" : "Partial Sun"}
              </span>
            </div>

            <div className="flex flex-col items-center rounded-md border p-2">
              <Droplet className="h-4 w-4 text-blue-500 mb-1" />
              <span className="text-xs text-muted-foreground">Water</span>
              <span className="text-xs font-medium">
                {crop.growingConditions.water.charAt(0).toUpperCase() + crop.growingConditions.water.slice(1)}
              </span>
            </div>

            <div className="flex flex-col items-center rounded-md border p-2">
              <Thermometer className="h-4 w-4 text-red-500 mb-1" />
              <span className="text-xs text-muted-foreground">Temperature</span>
              <span className="text-xs font-medium">
                {crop.growingConditions.minTemp}°-{crop.growingConditions.maxTemp}°F
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-xs text-muted-foreground mr-1">Season:</div>
            {crop.growingConditions.season.map((season) => (
              <Badge key={season} variant="outline" className="text-xs">
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-xs text-muted-foreground mr-1">Soil Types:</div>
            {crop.growingConditions.soilTypes.map((soil) => (
              <Badge key={soil} variant="outline" className="text-xs">
                {soil.charAt(0).toUpperCase() + soil.slice(1)}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="text-sm font-medium">Companion Planting</div>
          <div className="space-y-2">
            {crop.companionCrops.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp className="h-3 w-3 text-green-500" />
                  <span>Good Companions</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {crop.companionCrops.map((companion) => (
                    <Badge key={companion} variant="outline" className="text-xs">
                      {companion.charAt(0).toUpperCase() + companion.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {crop.enemyCrops.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsDown className="h-3 w-3 text-red-500" />
                  <span>Avoid Planting With</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {crop.enemyCrops.map((enemy) => (
                    <Badge key={enemy} variant="outline" className="text-xs">
                      {enemy.charAt(0).toUpperCase() + enemy.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {crop.trapCrops.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  <span>Trap Crops</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {crop.trapCrops.map((trap) => (
                    <Badge key={trap} variant="outline" className="text-xs">
                      {trap.charAt(0).toUpperCase() + trap.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {crop.pruning && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm font-medium">Pruning</div>
              <p className="text-sm">{crop.pruning}</p>
            </div>
          </>
        )}

        <div className="space-y-2">
          <div className="text-sm font-medium">Growth Habit</div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {crop.determinate ? "Determinate" : "Indeterminate"}
            </Badge>
            {crop.scarification && (
              <Badge variant="outline" className="text-xs">
                Requires Scarification
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

