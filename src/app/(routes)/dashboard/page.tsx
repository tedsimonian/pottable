import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TaskChecklist } from "@/components/dashboard/task-checklist"
import { GardenOverview } from "@/components/dashboard/garden-overview"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { GardenRecommendations } from "@/components/dashboard/garden-recommendations"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold break-words">Welcome to Pottable</h1>
        <Button asChild className="whitespace-nowrap">
          <Link href="/dashboard/gardens/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Garden
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground">Your AI-powered gardening assistant is ready to help you grow.</p>

      {/* Updated layout for responsive design */}
      <div className="grid w-full gap-6">
        {/* First row: Gardens (2/3) and Weather (1/3) on small screens and up */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Gardens takes 2/3 width on small screens and up */}
          <div className="sm:col-span-2 h-full">
            <GardenOverview />
          </div>

          {/* Weather takes 1/3 width on small screens and up */}
          <div className="sm:col-span-1">
            <WeatherWidget />
          </div>
        </div>

        {/* Second row: Tasks at full width */}
        <div className="w-full">
          <TaskChecklist />
        </div>

        {/* Third row: Recommendations */}
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions for your gardens</CardDescription>
            </CardHeader>
            <CardContent>
              <GardenRecommendations />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

