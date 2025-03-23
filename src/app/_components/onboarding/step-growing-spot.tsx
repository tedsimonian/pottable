"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FlowerIcon } from "lucide-react"

export function OnboardingStepGrowingSpot({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const [growingSpot, setGrowingSpot] = useState<string | null>(null)

  const spotOptions = [
    {
      value: "balcony",
      label: "Balcony",
      description: "An outdoor space with partial sun exposure",
    },
    {
      value: "window",
      label: "Indoor Near Window",
      description: "Indoor space with good natural light",
    },
    {
      value: "indoor",
      label: "Indoor Not Near Window",
      description: "Indoor space with limited natural light",
    },
    {
      value: "yard",
      label: "Yard or Garden",
      description: "Outdoor space with good sun exposure",
    },
    {
      value: "rooftop",
      label: "Rooftop",
      description: "Elevated outdoor space with full sun exposure",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <FlowerIcon className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Where will you be growing?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us recommend plants that will thrive in your specific growing environment.
        </p>
      </div>

      <RadioGroup value={growingSpot || ""} onValueChange={setGrowingSpot}>
        <div className="space-y-3">
          {spotOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={`flex cursor-pointer items-start space-x-3 rounded-md border p-3 ${
                growingSpot === option.value ? "border-primary" : ""
              }`}
            >
              <RadioGroupItem id={option.value} value={option.value} className="mt-1" />
              <div className="space-y-1">
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </div>
            </Label>
          ))}
        </div>
      </RadioGroup>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-1" disabled={!growingSpot} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

