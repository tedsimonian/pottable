"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react"

export function WeatherWidget() {
  // In a real app, this would fetch from a weather API based on user's location
  const weatherData = {
    location: "New York, NY",
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 65,
    forecast: [
      { day: "Today", temp: 72, icon: Sun },
      { day: "Tomorrow", temp: 68, icon: Cloud },
      { day: "Wed", temp: 65, icon: CloudRain },
    ],
  }

  return (
    <Card className="garden-card border-none overflow-hidden">
      <CardHeader className="pb-2 bg-garden-sky bg-opacity-20">
        <CardTitle className="text-garden-green">Local Weather</CardTitle>
        <CardDescription>{weatherData.location}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="h-10 w-10 text-garden-yellow" />
            <div className="text-3xl font-bold">{weatherData.temperature}°F</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{weatherData.condition}</div>
            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              <Thermometer className="h-3 w-3" />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {weatherData.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center rounded-md p-2 bg-garden-sky bg-opacity-10">
              <span className="text-sm font-medium">{day.day}</span>
              <day.icon
                className={`my-1 h-5 w-5 ${
                  day.icon === Sun
                    ? "text-garden-yellow"
                    : day.icon === CloudRain
                      ? "text-garden-blue"
                      : "text-gray-400"
                }`}
              />
              <span className="text-sm">{day.temp}°</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

