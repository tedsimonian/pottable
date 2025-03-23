"use client"

import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Droplet, FlowerIcon, Leaf, Scissors, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface EventDetailsProps {
  event: any
  onClose: () => void
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  // Function to get event type color
  const getEventColor = (type: string) => {
    switch (type) {
      case "watering":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
      case "pruning":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
      case "fertilizing":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
      case "harvesting":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  // Get the appropriate icon for the event type
  const EventIcon =
    event.type === "watering"
      ? Droplet
      : event.type === "pruning"
        ? Scissors
        : event.type === "fertilizing"
          ? Leaf
          : FlowerIcon

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <Badge variant="outline" className={cn("inline-flex items-center gap-1", getEventColor(event.type))}>
            <EventIcon className="h-3 w-3" />
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {event.startTime
                ? format(event.startTime, "EEEE, MMMM d, yyyy")
                : format(new Date(), "EEEE, MMMM d, yyyy")}
            </span>
          </div>
          {event.startTime && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {format(event.startTime, "h:mm a")} - {format(event.endTime, "h:mm a")}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Location</h4>
          <div className="rounded-md border p-3 text-sm">
            <div className="font-medium">{event.garden}</div>
            <div className="text-muted-foreground">{event.plot}</div>
            {event.crop && <div className="mt-1 text-muted-foreground">Crop: {event.crop}</div>}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground">{event.description}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-4">
        <Button className="w-full">Mark as Completed</Button>
      </CardFooter>
    </Card>
  )
}

