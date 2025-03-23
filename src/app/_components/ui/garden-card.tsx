import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface GardenCardProps {
  header: ReactNode
  content: ReactNode
  footer: ReactNode
  className?: string
}

export function GardenCard({ header, content, footer, className }: GardenCardProps) {
  return (
    <Card className={`flex flex-col h-full overflow-hidden ${className || ""}`}>
      <div className="border-b px-4 py-4 sm:px-6">{header}</div>
      <div className="flex-1 p-4 overflow-auto sm:p-6">{content}</div>
      <div className="mt-auto border-t bg-muted/50 px-4 py-3 sm:px-6 sm:py-4">{footer}</div>
    </Card>
  )
}

