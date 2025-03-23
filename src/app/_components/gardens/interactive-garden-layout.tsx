"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Update the getGardenData function to ensure it properly identifies a new garden
const getGardenData = (gardenId: string) => {
  console.log("Getting garden data for ID:", gardenId) // Debug log

  // If it's a new garden (gardenId might be "new" or similar)
  if (gardenId === "new") {
    return {
      id: "new",
      name: "New Garden",
      containerSize: {
        width: 5,
        length: 5,
        depth: 1,
      },
    }
  }

  // Return existing garden data for existing gardens
  return {
    id: gardenId,
    name: "My Balcony Garden",
    containerSize: {
      width: 3,
      length: 5,
      depth: 1.2,
    },
  }
}

// Update the getPlotsData function to ensure it returns an empty array for new gardens
const getPlotsData = (gardenId: string) => {
  console.log("Getting plots data for ID:", gardenId) // Debug log

  // If it's a new garden, return empty array
  if (gardenId === "new") {
    return []
  }

  // Return existing plots for existing gardens
  return [
    {
      id: "plot-1",
      name: "Tomato Pot",
      containerSize: {
        width: 1.5,
        length: 1.5,
      },
      x: 0.2,
      y: 0.5,
    },
    {
      id: "plot-2",
      name: "Bell Pepper Container",
      containerSize: {
        width: 1.2,
        length: 1.2,
      },
      x: 1.8,
      y: 0.8,
    },
    {
      id: "plot-3",
      name: "Herb Pot",
      containerSize: {
        width: 0.8,
        length: 0.8,
      },
      x: 0.5,
      y: 2.5,
    },
  ]
}

function DraggablePlot({
  plot,
  gardenWidth,
  gardenLength,
  onDragStart,
  onDragEnd,
  onDragMove,
  editable,
}: {
  plot: any
  gardenWidth: number
  gardenLength: number
  onDragStart?: (id: string) => void
  onDragEnd?: (id: string, x: number, y: number) => void
  onDragMove?: (id: string, x: number, y: number) => void
  editable: boolean
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: plot.x, y: plot.y })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Calculate plot size as percentage of garden size
  const plotWidthPercent = (plot.containerSize.width / gardenWidth) * 75
  const plotLengthPercent = (plot.containerSize.length / gardenLength) * 75

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editable) return

    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    if (onDragStart) {
      onDragStart(plot.id)
    }

    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !editable) return

    const containerRect = document.querySelector(".garden-container")?.getBoundingClientRect()
    if (!containerRect) return

    // Calculate new position relative to container
    const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * gardenWidth
    const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * gardenLength

    // Constrain to garden boundaries
    const constrainedX = Math.max(0, Math.min(gardenWidth - plot.containerSize.width, newX))
    const constrainedY = Math.max(0, Math.min(gardenLength - plot.containerSize.length, newY))

    setPosition({ x: constrainedX, y: constrainedY })

    if (onDragMove) {
      onDragMove(plot.id, constrainedX, constrainedY)
    }
  }

  const handleMouseUp = () => {
    if (!isDragging || !editable) return

    setIsDragging(false)

    if (onDragEnd) {
      onDragEnd(plot.id, position.x, position.y)
    }
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      className={cn(
        "absolute rounded-md border border-primary/50 shadow",
        editable ? "cursor-grab active:cursor-grabbing" : "cursor-default",
      )}
      style={{
        width: plotWidthPercent + "%",
        height: plotLengthPercent + "%",
        left: (position.x / gardenWidth) * 100 + "%",
        top: (position.y / gardenLength) * 100 + "%",
        backgroundColor: isDragging ? "rgba(var(--primary)/0.2)" : "rgba(var(--primary)/0.1)",
        zIndex: isDragging ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-2 flex items-center justify-center h-full">
        <p className="text-xs text-center font-medium">{plot.name}</p>
      </div>
    </div>
  )
}

// Update the component to better handle the empty garden case
export function InteractiveGardenLayout({ gardenId, editable = true }: { gardenId: string; editable?: boolean }) {
  console.log("InteractiveGardenLayout rendering with gardenId:", gardenId) // Debug log

  const [garden, setGarden] = useState<any | null>(null)
  const [plots, setPlots] = useState<any[]>([])
  const [isDirty, setIsDirty] = useState(false)

  // Load garden and plots data
  useEffect(() => {
    console.log("useEffect running with gardenId:", gardenId) // Debug log
    const gardenData = getGardenData(gardenId)
    const plotsData = getPlotsData(gardenId)

    console.log("Garden data:", gardenData) // Debug log
    console.log("Plots data:", plotsData) // Debug log

    setGarden(gardenData)
    setPlots(plotsData)
  }, [gardenId])

  const handleDragStart = (id: string) => {
    // You could add logic here if needed when drag starts
  }

  const handleDragMove = (id: string, x: number, y: number) => {
    // Update the position of the specific plot being dragged
    setPlots((prevPlots) => prevPlots.map((plot) => (plot.id === id ? { ...plot, x, y } : plot)))
  }

  const handleDragEnd = (id: string, x: number, y: number) => {
    // Update the final position and mark as dirty (needs saving)
    setPlots((prevPlots) => prevPlots.map((plot) => (plot.id === id ? { ...plot, x, y } : plot)))
    setIsDirty(true)
  }

  const handleSaveLayout = () => {
    // In a real app, this would save to the backend
    console.log("Saving layout:", plots)
    setIsDirty(false)
    // Show success message
    alert("Layout saved successfully!")
  }

  if (!garden) {
    return (
      <Card className="overflow-hidden h-full">
        <CardContent className="p-4 h-full">
          <p className="text-sm text-muted-foreground">Loading garden layout...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-4 h-full">
        <div className="relative h-[calc(100%-40px)] w-full mx-auto bg-muted/30 rounded-md border overflow-hidden garden-container">
          {plots.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-muted-foreground mb-2">This is a new garden</p>
                <p className="text-sm text-muted-foreground">Create and save your garden to add plots</p>
              </div>
            </div>
          ) : (
            plots.map((plot) => (
              <DraggablePlot
                key={plot.id}
                plot={plot}
                gardenWidth={garden.containerSize.width}
                gardenLength={garden.containerSize.length}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                editable={editable}
              />
            ))
          )}
        </div>

        {editable && isDirty && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSaveLayout}>Save Layout</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

