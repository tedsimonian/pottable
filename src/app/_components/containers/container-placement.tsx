"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ContainerPlacementProps {
  width: number
  length: number
  containerWidth: number
  containerLength: number
  initialX?: number
  initialY?: number
  onPositionChange: (x: number, y: number) => void
  disabled?: boolean
}

export function ContainerPlacement({
  width,
  length,
  containerWidth,
  containerLength,
  initialX = 0,
  initialY = 0,
  onPositionChange,
  disabled = false,
}: ContainerPlacementProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  // Calculate the maximum positions to keep container within bounds
  const maxX = width - containerWidth
  const maxY = length - containerLength

  // Handle window resize to maintain proper scaling
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        // Calculate scale based on the garden width (assuming 1 unit = 1 foot or other measurement)
        const newScale = containerWidth / width
        setScale(newScale)
      }
    }

    // Initial calculation
    calculateScale()

    // Clean up previous observer if it exists
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
    }

    // Setup resize observer with error handling
    try {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // Wrap in requestAnimationFrame to avoid ResizeObserver loop errors
        window.requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return
          }
          calculateScale()
        })
      })

      if (containerRef.current) {
        resizeObserverRef.current.observe(containerRef.current)
      }
    } catch (error) {
      console.error("ResizeObserver error:", error)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [width])

  // Handle mouse/touch events for dragging
  useEffect(() => {
    if (disabled || !dragRef.current) return

    const dragElement = dragRef.current
    let startX = 0
    let startY = 0
    let startPosX = 0
    let startPosY = 0

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)

      // Get initial positions
      if ("touches" in e) {
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
      } else {
        startX = e.clientX
        startY = e.clientY
      }
      startPosX = position.x
      startPosY = position.y

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleMouseMove, { passive: false })
      document.addEventListener("touchend", handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return

      let clientX, clientY
      if ("touches" in e) {
        e.preventDefault() // Prevent scrolling on touch devices
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      // Calculate new position
      let newX = startPosX + (clientX - startX) / scale
      let newY = startPosY + (clientY - startY) / scale

      // Constrain to bounds
      newX = Math.max(0, Math.min(newX, maxX))
      newY = Math.max(0, Math.min(newY, maxY))

      setPosition({ x: newX, y: newY })
      onPositionChange(newX, newY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleMouseMove)
      document.removeEventListener("touchend", handleMouseUp)
    }

    dragElement.addEventListener("mousedown", handleMouseDown)
    dragElement.addEventListener("touchstart", handleMouseDown, { passive: false })

    return () => {
      dragElement.removeEventListener("mousedown", handleMouseDown)
      dragElement.removeEventListener("touchstart", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleMouseMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [disabled, position, scale, maxX, maxY, onPositionChange])

  return (
    <div
      className="relative w-full aspect-[4/3] border rounded-lg bg-garden-lightGreen bg-opacity-10"
      ref={containerRef}
    >
      {/* Garden grid lines */}
      <div
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)`, gridTemplateRows: `repeat(${length}, 1fr)` }}
      >
        {Array.from({ length: width * length }).map((_, index) => (
          <div key={index} className="border border-dashed border-garden-green border-opacity-20" />
        ))}
      </div>

      {/* Draggable container */}
      <div
        ref={dragRef}
        className={cn(
          "absolute rounded border-2 bg-garden-green bg-opacity-30 cursor-move transition-colors",
          isDragging ? "border-garden-green" : "border-garden-green border-opacity-50",
          disabled && "cursor-not-allowed opacity-50",
        )}
        style={{
          width: `${containerWidth * scale}px`,
          height: `${containerLength * scale}px`,
          transform: `translate(${position.x * scale}px, ${position.y * scale}px)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-garden-green">
          {containerWidth}' × {containerLength}'
        </div>
      </div>
    </div>
  )
}

