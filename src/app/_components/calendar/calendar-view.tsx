"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { EventDetails } from "./event-details"

export function CalendarView() {
  const [view, setView] = useState("month")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event)
  }

  const handleCloseEventDetails = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="space-y-4">
      <Card className="p-1">
        {view === "month" && (
          <MonthView date={selectedDate} onDateSelect={handleDateSelect} onEventSelect={handleEventSelect} />
        )}
        {view === "week" && (
          <WeekView date={selectedDate} onDateSelect={handleDateSelect} onEventSelect={handleEventSelect} />
        )}
        {view === "day" && (
          <DayView date={selectedDate} onDateSelect={handleDateSelect} onEventSelect={handleEventSelect} />
        )}
      </Card>

      {selectedEvent && <EventDetails event={selectedEvent} onClose={handleCloseEventDetails} />}
    </div>
  )
}

