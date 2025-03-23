"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Droplet, Scissors, Sun } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your database
const tasks = [
  {
    id: "task-1",
    title: "Water Tomatoes",
    date: "Today",
    icon: Droplet,
    garden: "Balcony Garden",
    plot: "Large Pot",
    color: "text-garden-blue",
    bgColor: "bg-garden-blue bg-opacity-10",
  },
  {
    id: "task-2",
    title: "Prune Basil",
    date: "Tomorrow",
    icon: Scissors,
    garden: "Indoor Herbs",
    plot: "Herb Box",
    color: "text-garden-green",
    bgColor: "bg-garden-green bg-opacity-10",
  },
  {
    id: "task-3",
    title: "Move Peppers to Sun",
    date: "Wed, Jun 12",
    icon: Sun,
    garden: "Balcony Garden",
    plot: "Medium Pot",
    color: "text-garden-yellow",
    bgColor: "bg-garden-yellow bg-opacity-10",
  },
]

export function UpcomingTasks() {
  return (
    <Card className="garden-card border-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-garden-lightGreen bg-opacity-20">
        <div className="space-y-1">
          <CardTitle className="text-garden-green">Upcoming Tasks</CardTitle>
          <CardDescription>Tasks for the next few days</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="rounded-full border-garden-green text-garden-green hover:bg-garden-lightGreen hover:text-garden-green hover:border-garden-green"
        >
          <Link href="/dashboard/calendar">
            Calendar
            <Calendar className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border p-3 hover:shadow-sm transition-shadow"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${task.bgColor}`}>
                <task.icon className={`h-4 w-4 ${task.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.date}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {task.garden} • {task.plot}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

