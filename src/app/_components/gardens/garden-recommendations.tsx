"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Leaf,
  SproutIcon as SeedingIcon,
  Calendar,
  RotateCcw,
  ThumbsUp,
  AlertTriangle,
  Sun,
  Droplet,
  Wind,
} from "lucide-react"
import Link from "next/link"

// Mock data for garden
const gardenData = {
  id: "garden-1",
  name: "My Balcony Garden",
  gardenType: "balcony",
  sunExposure: "partial",
  waterAccess: "easy",
  windExposure: "moderate",
  soilType: "potting",
  spaceWidth: 3,
  spaceLength: 5,
  isShared: false,
}

// Mock data for recommendations
const recommendations = {
  crops: [
    {
      id: "crop-6",
      name: "Lettuce",
      type: "Vegetable",
      description: "Leafy green vegetable that grows well in partial sun.",
      reasons: ["Suitable for balcony", "Thrives in partial sun", "Quick harvest"],
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "crop-3",
      name: "Basil",
      type: "Herb",
      description: "Aromatic herb that pairs well with tomatoes.",
      reasons: ["Container friendly", "Companion to tomatoes", "Easy to grow"],
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "crop-5",
      name: "Mint",
      type: "Herb",
      description: "Fast-growing herb that prefers partial shade.",
      reasons: ["Thrives in partial sun", "Container friendly", "Low maintenance"],
      imageUrl: "/placeholder.svg?height=60&width=60",
    },
  ],
  companions: [
    {
      crop1: {
        id: "crop-1",
        name: "Tomato",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      crop2: {
        id: "crop-3",
        name: "Basil",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      benefits: ["Improves tomato flavor", "Repels pests", "Maximizes space"],
    },
    {
      crop1: {
        id: "crop-2",
        name: "Bell Pepper",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      crop2: {
        id: "crop-6",
        name: "Lettuce",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      benefits: ["Provides ground cover", "Maximizes space", "Different harvest times"],
    },
  ],
  rotations: [
    {
      current: {
        id: "crop-1",
        name: "Tomato",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      next: {
        id: "crop-6",
        name: "Lettuce",
        imageUrl: "/placeholder.svg?height=40&width=40",
      },
      benefits: ["Prevents soil depletion", "Reduces disease risk", "Different nutrient needs"],
    },
  ],
  warnings: [
    {
      type: "spacing",
      message: "Your tomato plants may be too close together. Consider thinning to at least 18 inches apart.",
      severity: "medium",
    },
    {
      type: "compatibility",
      message: "Mint is invasive and should be planted in its own container to prevent spreading.",
      severity: "high",
    },
  ],
}

export function GardenRecommendations({ gardenId }: { gardenId: string }) {
  // In a real app, fetch garden and recommendations data based on gardenId
  const garden = gardenData

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">AI Recommendations</h2>
        <p className="text-sm text-muted-foreground">Personalized recommendations based on your garden conditions</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Garden Conditions</CardTitle>
          <CardDescription>Current growing conditions in your garden</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center rounded-md border p-3">
              <Sun className="h-6 w-6 text-yellow-500 mb-2" />
              <span className="text-xs text-muted-foreground">Sunlight</span>
              <span className="text-sm font-medium">
                {garden.sunExposure === "full"
                  ? "Full Sun"
                  : garden.sunExposure === "partial"
                    ? "Partial Sun"
                    : "Shade"}
              </span>
            </div>

            <div className="flex flex-col items-center rounded-md border p-3">
              <Droplet className="h-6 w-6 text-blue-500 mb-2" />
              <span className="text-xs text-muted-foreground">Water Access</span>
              <span className="text-sm font-medium">
                {garden.waterAccess === "easy"
                  ? "Easy Access"
                  : garden.waterAccess === "moderate"
                    ? "Moderate"
                    : "Limited"}
              </span>
            </div>

            <div className="flex flex-col items-center rounded-md border p-3">
              <Wind className="h-6 w-6 text-sky-500 mb-2" />
              <span className="text-xs text-muted-foreground">Wind Exposure</span>
              <span className="text-sm font-medium">
                {garden.windExposure === "protected"
                  ? "Protected"
                  : garden.windExposure === "moderate"
                    ? "Moderate"
                    : "Exposed"}
              </span>
            </div>

            <div className="flex flex-col items-center rounded-md border p-3">
              <Leaf className="h-6 w-6 text-green-500 mb-2" />
              <span className="text-xs text-muted-foreground">Soil Type</span>
              <span className="text-sm font-medium">
                {garden.soilType.charAt(0).toUpperCase() + garden.soilType.slice(1)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="crops" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crops">Crop Ideas</TabsTrigger>
          <TabsTrigger value="companions">Companions</TabsTrigger>
          <TabsTrigger value="rotations">Rotations</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recommended Crops</CardTitle>
              <CardDescription>Crops that will thrive in your garden conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recommendations.crops.map((crop) => (
                    <div key={crop.id} className="flex gap-4 p-3 rounded-lg border">
                      <div className="h-14 w-14 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={crop.imageUrl || "/placeholder.svg"}
                          alt={crop.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{crop.name}</h4>
                            <p className="text-sm text-muted-foreground">{crop.type}</p>
                          </div>

                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/gardens/${gardenId}/add-plot?crop=${crop.id}`}>
                              <SeedingIcon className="mr-2 h-4 w-4" />
                              Plant
                            </Link>
                          </Button>
                        </div>

                        <p className="text-sm mt-1">{crop.description}</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {crop.reasons.map((reason, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companions" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Companion Planting</CardTitle>
              <CardDescription>Plants that grow well together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.companions.map((companion, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={companion.crop1.imageUrl || "/placeholder.svg"}
                          alt={companion.crop1.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="text-lg">+</div>

                      <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={companion.crop2.imageUrl || "/placeholder.svg"}
                          alt={companion.crop2.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium">
                          {companion.crop1.name} + {companion.crop2.name}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="text-sm space-y-1">
                        {companion.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {recommendations.companions.length === 0 && (
                  <div className="text-center py-8">
                    <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">No companion planting recommendations available yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rotations" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Crop Rotation</CardTitle>
              <CardDescription>Recommended crop rotations for soil health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.rotations.map((rotation, index) => (
                  <div key={index} className="p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={rotation.current.imageUrl || "/placeholder.svg"}
                          alt={rotation.current.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <RotateCcw className="h-5 w-5 text-muted-foreground" />

                      <div className="h-10 w-10 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                        <img
                          src={rotation.next.imageUrl || "/placeholder.svg"}
                          alt={rotation.next.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-medium">
                          {rotation.current.name} → {rotation.next.name}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Benefits:</div>
                      <ul className="text-sm space-y-1">
                        {rotation.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ThumbsUp className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {recommendations.rotations.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">No crop rotation recommendations available yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warnings" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Warnings & Suggestions</CardTitle>
              <CardDescription>Issues that need attention in your garden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      warning.severity === "high"
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                        : warning.severity === "medium"
                          ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
                          : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          warning.severity === "high"
                            ? "text-red-500 dark:text-red-400"
                            : warning.severity === "medium"
                              ? "text-amber-500 dark:text-amber-400"
                              : "text-blue-500 dark:text-blue-400"
                        }`}
                      />

                      <div className="flex-1">
                        <div className="font-medium">
                          {warning.type.charAt(0).toUpperCase() + warning.type.slice(1)} Warning
                        </div>
                        <p className="text-sm mt-1">{warning.message}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {recommendations.warnings.length === 0 && (
                  <div className="text-center py-8">
                    <ThumbsUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-2 text-muted-foreground">No warnings or issues detected in your garden</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

