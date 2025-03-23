"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CircleIcon, SquareIcon, FlowerIcon, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock function to get garden dimensions
const getGardenDimensions = (gardenId: string) => {
  return {
    width: 10,
    length: 15,
  }
}

// Mock function to get containers
const getContainers = (gardenId: string) => [
  {
    id: "container-1",
    name: "Tomato Pot",
    type: "pot",
    shape: "circular",
    width: 2,
    length: 2,
    x: 1,
    y: 1,
    crops: [
      {
        id: "crop-1",
        name: "Tomato",
      },
      {
        id: "crop-2",
        name: "Basil",
      },
    ],
  },
  {
    id: "container-2",
    name: "Raised Bed",
    type: "raised-bed",
    shape: "rectangular",
    width: 4,
    length: 8,
    x: 5,
    y: 3,
    crops: [
      {
        id: "crop-3",
        name: "Carrot",
      },
      {
        id: "crop-4",
        name: "Lettuce",
      },
    ],
  },
  {
    id: "container-3",
    name: "Herb Pot",
    type: "pot",
    shape: "circular",
    width: 1,
    length: 1,
    x: 3,
    y: 8,
    crops: [
      {
        id: "crop-2",
        name: "Basil",
      },
    ],
  },
]

interface GardenLayoutProps {
  gardenId: string
  editable?: boolean
}

export function GardenLayout({ gardenId, editable = false }: GardenLayoutProps) {
  const [gardenDimensions, setGardenDimensions] = useState({ width: 10, length: 10 })
  const [containers, setContainers] = useState<any[]>([])
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Load garden dimensions and containers
  useEffect(() => {
    const dimensions = getGardenDimensions(gardenId)
    const containerData = getContainers(gardenId)

    setGardenDimensions(dimensions)
    setContainers(containerData)
  }, [gardenId])

  // Handle container selection
  const handleContainerClick = (containerId: string, e: React.MouseEvent) => {
    if (!editable) return

    e.stopPropagation()
    setSelectedContainer(containerId)
  }

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent, containerId: string) => {
    if (!editable) return

    setIsDragging(true)
    setSelectedContainer(containerId)

    const container = containers.find((c) => c.id === containerId)
    if (!container) return

    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !editable || !selectedContainer) return

    const containerRect = document.querySelector(".garden-layout")?.getBoundingClientRect()
    if (!containerRect) return

    const container = containers.find((c) => c.id === selectedContainer)
    if (!container) return

    // Calculate new position relative to container
    const newX = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * gardenDimensions.width
    const newY = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * gardenDimensions.length

    // Constrain to garden boundaries
    const effectiveWidth = container.shape === "circular" ? container.width : container.width
    const effectiveLength = container.shape === "circular" ? container.width : container.length

    const constrainedX = Math.max(0, Math.min(gardenDimensions.width - effectiveWidth, newX))
    const constrainedY = Math.max(0, Math.min(gardenDimensions.length - effectiveLength, newY))

    // Update container position
    setContainers(containers.map((c) => (c.id === selectedContainer ? { ...c, x: constrainedX, y: constrainedY } : c)))
  }

  const handleMouseUp = () => {
    if (!isDragging || !editable) return
    setIsDragging(false)
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
  }, [isDragging, containers, selectedContainer])

  return (
    <Card className="h-full overflow-hidden">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <CircleIcon className="h-3 w-3" />
              Circular Container
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <SquareIcon className="h-3 w-3" />
              Rectangular Container
            </Badge>
          </div>
          {editable && (
            <Button variant="outline" size="sm">
              Save Layout
            </Button>
          )}
        </div>

        <div className="relative flex-1 bg-muted/30 rounded-md border overflow-hidden garden-layout">
          {/* Grid lines */}
          <div
            className="absolute inset-0 grid grid-cols-10"
            style={{ gridTemplateColumns: `repeat(${gardenDimensions.width}, 1fr)` }}
          >
            {Array.from({ length: gardenDimensions.width }).map((_, i) => (
              <div key={`col-${i}`} className="border-r border-dashed border-muted-foreground/20 h-full" />
            ))}
          </div>
          <div
            className="absolute inset-0 grid grid-rows-10"
            style={{ gridTemplateRows: `repeat(${gardenDimensions.length}, 1fr)` }}
          >
            {Array.from({ length: gardenDimensions.length }).map((_, i) => (
              <div key={`row-${i}`} className="border-b border-dashed border-muted-foreground/20 w-full" />
            ))}
          </div>

          {/* Containers */}
          {containers.map((container) => (
            <TooltipProvider key={container.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "absolute border transition-colors",
                      container.shape === "circular" ? "rounded-full" : "rounded-md",
                      selectedContainer === container.id
                        ? "border-primary bg-primary/20"
                        : "border-muted-foreground/50 bg-muted-foreground/10",
                      editable && "cursor-grab active:cursor-grabbing",
                    )}
                    style={{
                      width: `${(container.width / gardenDimensions.width) * 100}%`,
                      height: `${(container.length / gardenDimensions.length) * 100}%`,
                      left: `${(container.x / gardenDimensions.width) * 100}%`,
                      top: `${(container.y / gardenDimensions.length) * 100}%`,
                      zIndex: selectedContainer === container.id ? 10 : 1,
                    }}
                    onClick={(e) => handleContainerClick(container.id, e)}
                    onMouseDown={(e) => handleMouseDown(e, container.id)}
                  >
                    <div className="p-2 flex items-center justify-center h-full">
                      <div className="text-xs text-center font-medium truncate">
                        {container.name}
                        {container.crops.length > 0 && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <FlowerIcon className="h-3 w-3" />
                            <span>{container.crops.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">{container.name}</p>
                    <p className="text-xs">
                      {container.type} • {container.shape}
                    </p>
                    {container.crops.length > 0 && (
                      <div className="text-xs">Crops: {container.crops.map((c) => c.name).join(", ")}</div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div>
            Garden dimensions: {gardenDimensions.width} × {gardenDimensions.length} ft
          </div>
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>{editable ? "Drag containers to reposition them" : "Hover over containers for details"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

