"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
  getDay,
  subDays,
} from "date-fns"
import { Cloud, CloudRain, Droplet, FlowerIcon, Scissors, Sun, CloudSunIcon as SunCloud } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for events
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

interface MonthViewProps {
  date: Date
  onDateSelect: (date: Date) => void
  onEventSelect: (event: any) => void
}

export function MonthView({ date, onDateSelect, onEventSelect }: MonthViewProps) {
  const [days, setDays] = useState<Date[]>([])

  useEffect(() => {
    // Get all days in the current month
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDay = getDay(monthStart)

    // Add days from the previous month to fill the first row
    const previousMonthDays = Array.from({ length: startDay }, (_, i) => subDays(monthStart, startDay - i)).reverse()

    // Calculate how many days we need from the next month
    const totalDaysToShow = 42 // 6 rows of 7 days
    const nextMonthDays = Array.from(
      { length: totalDaysToShow - daysInMonth.length - previousMonthDays.length },
      (_, i) => addDays(monthEnd, i + 1),
    )

    // Combine all days
    setDays([...previousMonthDays, ...daysInMonth, ...nextMonthDays])
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
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-muted">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, date)
          const isSelected = isSameDay(day, date)
          const isTodayDate = isToday(day)
          const dayEvents = getEvents(day)
          const weather = getWeather(day)
          const WeatherIcon = weather.icon

          return (
            <div
              key={i}
              className={cn(
                "min-h-[100px] sm:min-h-[120px] bg-card p-2 relative",
                !isCurrentMonth && "text-muted-foreground bg-muted/50",
                isSelected && "bg-accent/50",
                "cursor-pointer hover:bg-accent/30 transition-colors",
              )}
              onClick={() => handleDateClick(day)}
            >
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                    isTodayDate && "bg-primary text-primary-foreground font-medium",
                  )}
                >
                  {format(day, "d")}
                </div>
                <div className={cn("flex items-center", getWeatherStyle(weather.condition))}>
                  <WeatherIcon className="h-4 w-4" />
                  <span className="ml-1 text-xs">{weather.temperature}°</span>
                </div>
              </div>

              <div className="mt-2 space-y-1 max-h-[60px] sm:max-h-[80px] overflow-y-auto">
                {dayEvents.map((event) => {
                  const EventIcon =
                    event.type === "watering" ? Droplet : event.type === "pruning" ? Scissors : FlowerIcon

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "text-xs px-2 py-1 rounded border flex items-center gap-1 cursor-pointer",
                        getEventColor(event.type),
                      )}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      <EventIcon className="h-3 w-3 shrink-0" />
                      <span className="truncate">{event.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

