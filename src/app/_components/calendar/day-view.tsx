"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, setHours, setMinutes } from "date-fns"
import { Droplet, FlowerIcon, Scissors, Cloud, CloudRain, Sun, CloudSunIcon as SunCloud } from "lucide-react"
import { cn } from "@/lib/utils"

// Reuse the same mock data functions from month-view.tsx
const getEvents = (date: Date) => {
  // Generate some mock events based on the date
  const events = []

  // Add watering events every 3 days
  if (date.getDate() % 3 === 0) {
    events.push({
      id: `water-${date.toISOString()}`,
      title: "Water Plants",
      type: "watering",
      garden: "Balcony Garden",
      plot: "Large Pot",
      crop: "Tomato",
      time: "Morning",
      startTime: setMinutes(setHours(new Date(date), 8), 0),
      endTime: setMinutes(setHours(new Date(date), 9), 0),
      description: "Water your tomato plants thoroughly, ensuring the soil is moist but not waterlogged.",
    })
  }

  // Add pruning events on the 5th, 15th, and 25th
  if ([5, 15, 25].includes(date.getDate())) {
    events.push({
      id: `prune-${date.toISOString()}`,
      title: "Prune Plants",
      type: "pruning",
      garden: "Indoor Herbs",
      plot: "Herb Box",
      crop: "Basil",
      time: "Afternoon",
      startTime: setMinutes(setHours(new Date(date), 14), 0),
      endTime: setMinutes(setHours(new Date(date), 15), 0),
      description: "Trim your basil plants to encourage bushier growth and prevent flowering.",
    })
  }

  // Add fertilizing events on the 10th and 20th
  if ([10, 20].includes(date.getDate())) {
    events.push({
      id: `fertilize-${date.toISOString()}`,
      title: "Fertilize Plants",
      type: "fertilizing",
      garden: "Balcony Garden",
      plot: "Medium Pot",
      crop: "Bell Pepper",
      time: "Evening",
      startTime: setMinutes(setHours(new Date(date), 17), 0),
      endTime: setMinutes(setHours(new Date(date), 18), 0),
      description: "Apply organic fertilizer to your bell pepper plants to support fruit development.",
    })
  }

  return events
}

// Mock data for weather
const getWeather = (date: Date) => {
  // Generate mock weather based on the date
  const day = date.getDate()

  if (day % 10 === 0) {
    return { condition: "rainy", icon: CloudRain, temperature: 65 }
  } else if (day % 7 === 0) {
    return { condition: "cloudy", icon: Cloud, temperature: 70 }
  } else if (day % 5 === 0) {
    return { condition: "partly-cloudy", icon: SunCloud, temperature: 75 }
  } else {
    return { condition: "sunny", icon: Sun, temperature: 80 }
  }
}

interface DayViewProps {
  date: Date
  onDateSelect: (date: Date) => void
  onEventSelect: (event: any) => void
}

export function DayView({ date, onDateSelect, onEventSelect }: DayViewProps) {
  const [hours, setHoursArray] = useState<Date[]>([])

  useEffect(() => {
    // Create an array of hours for the day (6am to 9pm)
    const hoursArray = Array.from({ length: 16 }, (_, i) => {
      const hour = i + 6 // Start at 6am
      return setHours(new Date(date), hour)
    })
    setHoursArray(hoursArray)
  }, [date])

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation()
    onEventSelect(event)
  }

  // Function to get event type color
  const getEventColor = (type: string) => {
    switch (type) {
      case "watering":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
      case "pruning":
        return "bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
      case "fertilizing":
        return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
      case "harvesting":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  // Get all events for the day
  const dayEvents = getEvents(date)

  // Get weather for the day
  const weather = getWeather(date)
  const WeatherIcon = weather.icon

  return (
    <div className="w-full">
      {/* Day header with weather */}
      <div className="p-4 bg-card border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</h3>
        <div className="flex items-center gap-2">
          <WeatherIcon
            className={cn(
              "h-5 w-5",
              weather.condition === "sunny"
                ? "text-yellow-500"
                : weather.condition === "partly-cloudy"
                  ? "text-amber-500"
                  : weather.condition === "cloudy"
                    ? "text-gray-500"
                    : "text-blue-500",
            )}
          />
          <span>
            {weather.temperature}°F • {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
          </span>
        </div>
      </div>

      {/* Hours and events */}
      <div className="relative min-h-[600px]">
        {/* Time indicators */}
        <div className="absolute top-0 left-0 w-16 h-full border-r">
          {hours.map((hour) => (
            <div key={hour.toString()} className="h-20 border-b flex items-center justify-center">
              <span className="text-xs text-muted-foreground">{format(hour, "h a")}</span>
            </div>
          ))}
        </div>

        {/* Events container */}
        <div className="ml-16 relative">
          {/* Hour grid lines */}
          {hours.map((hour) => (
            <div key={hour.toString()} className="h-20 border-b" />
          ))}

          {/* Events */}
          {dayEvents.map((event) => {
            const startHour = event.startTime.getHours()
            const startMinute = event.startTime.getMinutes()
            const endHour = event.endTime.getHours()
            const endMinute = event.endTime.getMinutes()

            // Calculate position and height
            const startPosition = (startHour - 6) * 80 + (startMinute / 60) * 80 // 80px per hour
            const duration = endHour - startHour + (endMinute - startMinute) / 60 // in hours
            const height = duration * 80 // 80px per hour

            const EventIcon = event.type === "watering" ? Droplet : event.type === "pruning" ? Scissors : FlowerIcon

            return (
              <div
                key={event.id}
                className={cn("absolute left-4 right-4 p-2 rounded border cursor-pointer", getEventColor(event.type))}
                style={{
                  top: `${startPosition}px`,
                  height: `${height}px`,
                }}
                onClick={(e) => handleEventClick(event, e)}
              >
                <div className="flex items-center gap-1 text-sm font-medium">
                  <EventIcon className="h-4 w-4" />
                  {event.title}
                </div>
                <div className="mt-1 text-xs">
                  {format(event.startTime, "h:mm a")} - {format(event.endTime, "h:mm a")}
                </div>
                <div className="mt-1 text-xs">
                  {event.garden} • {event.plot}
                </div>
              </div>
            )
          })}

          {dayEvents.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

