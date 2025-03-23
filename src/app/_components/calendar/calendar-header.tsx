"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"

export function CalendarHeader() {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState("month")

  const handlePrevious = () => {
    setDate(subMonths(date, 1))
  }

  const handleNext = () => {
    setDate(addMonths(date, 1))
  }

  const handleToday = () => {
    setDate(new Date())
  }

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
          <Button variant="outline" onClick={handleToday} className="ml-2">
            Today
          </Button>
        </div>
        <h2 className="text-xl font-semibold">{format(date, "MMMM yyyy")}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Tabs defaultValue="month" value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by garden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gardens</SelectItem>
            <SelectItem value="garden-1">Balcony Garden</SelectItem>
            <SelectItem value="garden-2">Indoor Herbs</SelectItem>
            <SelectItem value="garden-3">Backyard Garden</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

