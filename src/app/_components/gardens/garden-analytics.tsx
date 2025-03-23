"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, Calendar, Droplet, LineChart, PieChart, Sun, Thermometer } from "lucide-react"

export function GardenAnalytics({ gardenId }: { gardenId: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Garden Analytics</h2>
        <p className="text-sm text-muted-foreground">Track your garden's performance and growth over time</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-center h-40">
              <PieChart className="h-24 w-24 text-muted-foreground/30" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Badge variant="outline" className="justify-center">
                Vegetables: 2
              </Badge>
              <Badge variant="outline" className="justify-center">
                Herbs: 1
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Growth Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-center h-40">
              <BarChart className="h-24 w-24 text-muted-foreground/30" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Badge variant="outline" className="justify-center">
                Avg: 48%
              </Badge>
              <Badge variant="outline" className="justify-center">
                Harvests: 0
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Weather Trends</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-center h-40">
              <LineChart className="h-24 w-24 text-muted-foreground/30" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Badge variant="outline" className="justify-center">
                Avg Temp: 72°F
              </Badge>
              <Badge variant="outline" className="justify-center">
                Sunny Days: 5
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="water">Water Usage</TabsTrigger>
          <TabsTrigger value="harvest">Harvests</TabsTrigger>
        </TabsList>

        <TabsContent value="weather" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weather Conditions</CardTitle>
              <CardDescription>Recent and forecasted weather for your garden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Sun className="h-8 w-8 text-yellow-500" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">72°F</div>
                    <div className="text-sm text-muted-foreground">Current</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Thermometer className="h-8 w-8 text-red-500" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">78°F</div>
                    <div className="text-sm text-muted-foreground">High</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
                  <Droplet className="h-8 w-8 text-blue-500" />
                  <div className="text-center">
                    <div className="text-2xl font-bold">30%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">7-Day Forecast</h4>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center p-2 border rounded-lg">
                      <div className="text-xs text-muted-foreground">
                        {i === 0
                          ? "Today"
                          : i === 1
                            ? "Tue"
                            : i === 2
                              ? "Wed"
                              : i === 3
                                ? "Thu"
                                : i === 4
                                  ? "Fri"
                                  : i === 5
                                    ? "Sat"
                                    : "Sun"}
                      </div>
                      <Sun className="h-6 w-6 text-yellow-500 my-1" />
                      <div className="text-xs font-medium">{70 + i}°</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Usage</CardTitle>
              <CardDescription>Track your garden's water consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60">
                <LineChart className="h-40 w-40 text-muted-foreground/30" />
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                Water usage data will appear here once you start tracking your watering schedule.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="harvest" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Harvest Tracker</CardTitle>
              <CardDescription>Record and track your garden harvests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-60">
                <Calendar className="h-40 w-40 text-muted-foreground/30" />
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                Harvest data will appear here once you start recording your harvests.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

