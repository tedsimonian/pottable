"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, setHours, setMinutes } from "date-fns"
import { Cloud, CloudRain, Droplet, FlowerIcon, Scissors, Sun, CloudSunIcon as SunCloud } from "lucide-react"
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

interface WeekViewProps {
  date: Date
  onDateSelect: (date: Date) => void
  onEventSelect: (event: any) => void
}

export function WeekView({ date, onDateSelect, onEventSelect }: WeekViewProps) {
  const [days, setDays] = useState<Date[]>([])

  useEffect(() => {
    // Get all days in the current week (Sunday to Saturday)
    const weekStart = startOfWeek(date)
    const weekEnd = endOfWeek(date)
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })
    setDays(daysInWeek)
  }, [date])

  const handleDateClick = (day: Date) => {
    onDateSelect(day)
  }

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

  // Function to get weather icon and color
  const getWeatherStyle = (condition: string) => {
    switch (condition) {
      case "rainy":
        return "text-blue-500"
      case "cloudy":
        return "text-gray-500"
      case "partly-cloudy":
        return "text-amber-500"
      case "sunny":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px bg-muted">
        {days.map((day) => {
          const isTodayDate = isToday(day)
          const isSelected = isSameDay(day, date)
          const weather = getWeather(day)
          const WeatherIcon = weather.icon

          return (
            <div
              key={day.toString()}
              className={cn(
                "p-2 text-center cursor-pointer",
                isSelected && "bg-accent",
                "hover:bg-accent/50 transition-colors",
              )}
              onClick={() => handleDateClick(day)}
            >
              <div className="text-sm font-medium">{format(day, "EEE")}</div>
              <div
                className={cn(
                  "mx-auto my-1 flex h-7 w-7 items-center justify-center rounded-full text-sm",
                  isTodayDate && "bg-primary text-primary-foreground font-medium",
                )}
              >
                {format(day, "d")}
              </div>
              <div className={cn("flex items-center justify-center", getWeatherStyle(weather.condition))}>
                <WeatherIcon className="h-4 w-4" />
                <span className="ml-1 text-xs">{weather.temperature}°</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Events for each day */}
      <div className="grid grid-cols-7 gap-px bg-muted mt-2">
        {days.map((day) => {
          const dayEvents = getEvents(day)

          return (
            <div key={day.toString()} className="min-h-[300px] bg-card p-2 overflow-y-auto">
              <div className="space-y-2">
                {dayEvents.map((event) => {
                  const EventIcon =
                    event.type === "watering" ? Droplet : event.type === "pruning" ? Scissors : FlowerIcon

                  return (
                    <div
                      key={event.id}
                      className={cn("p-2 rounded border cursor-pointer", getEventColor(event.type))}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <EventIcon className="h-3 w-3" />
                        {event.title}
                      </div>
                      <div className="mt-1 text-xs">
                        {format(event.startTime, "h:mm a")} - {format(event.endTime, "h:mm a")}
                      </div>
                      <div className="mt-1 text-xs truncate">
                        {event.garden} • {event.plot}
                      </div>
                    </div>
                  )
                })}

                {dayEvents.length === 0 && (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No events</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

