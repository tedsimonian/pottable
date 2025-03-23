import { CalendarView } from "@/components/calendar/calendar-view"
import { CalendarHeader } from "@/components/calendar/calendar-header"
import { Separator } from "@/components/ui/separator"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Garden Calendar</h1>
        <p className="text-muted-foreground">View upcoming tasks and weather forecasts for your garden</p>
      </div>
      <Separator />
      <CalendarHeader />
      <CalendarView />
    </div>
  )
}

