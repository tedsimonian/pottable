"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, SproutIcon as SeedingIcon, ThumbsUp } from "lucide-react"
import Link from "next/link"

// Mock data for recommendations
const recommendations = [
  {
    id: "rec-1",
    gardenId: "garden-1",
    gardenName: "My Balcony Garden",
    type: "crop",
    title: "Plant Lettuce",
    description: "Lettuce is perfect for your balcony garden's partial sun conditions.",
    reasons: ["Quick harvest", "Thrives in partial sun", "Container friendly"],
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "rec-2",
    gardenId: "garden-1",
    gardenName: "My Balcony Garden",
    type: "companion",
    title: "Plant Basil with Tomatoes",
    description: "Basil improves tomato flavor and helps repel pests.",
    reasons: ["Improves flavor", "Pest control", "Space efficient"],
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "rec-3",
    gardenId: "garden-2",
    gardenName: "Indoor Herbs",
    type: "care",
    title: "Increase Watering for Mint",
    description: "Your mint plants need more frequent watering in their current location.",
    reasons: ["Prevent wilting", "Optimal growth", "Flavor enhancement"],
    imageUrl: "/placeholder.svg?height=60&width=60",
  },
]

export function GardenRecommendations() {
  return (
    <div className="space-y-4">
      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <Leaf className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-muted-foreground">Create a garden to get personalized recommendations</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/gardens/new">Create Garden</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-md bg-muted/50 flex-shrink-0 overflow-hidden">
                    <img
                      src={rec.imageUrl || "/placeholder.svg"}
                      alt={rec.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{rec.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{rec.gardenName}</div>
                  </div>
                </div>

                <p className="text-sm mb-3">{rec.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.reasons.map((reason, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {reason}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/dashboard/gardens/${rec.gardenId}`}>
                    <SeedingIcon className="mr-2 h-4 w-4" />
                    Apply Recommendation
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard/recommendations">View All Recommendations</Link>
        </Button>
      </div>
    </div>
  )
}

