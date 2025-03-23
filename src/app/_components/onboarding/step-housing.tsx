"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Home } from "lucide-react"

export function OnboardingStepHousing({
  onNext,
  onBack,
}: {
  onNext: () => void
  onBack: () => void
}) {
  const [housingType, setHousingType] = useState<string | null>(null)

  const housingOptions = [
    {
      value: "apartment",
      label: "Apartment",
      description: "A unit in a multi-unit building with limited outdoor space",
    },
    {
      value: "house",
      label: "House",
      description: "A standalone home with a yard or garden space",
    },
    {
      value: "condo",
      label: "Condo",
      description: "A unit in a multi-unit building, possibly with a balcony",
    },
    {
      value: "land",
      label: "Land",
      description: "A property with significant outdoor growing space",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Home className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">What type of housing do you have?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us understand your growing environment and space constraints.
        </p>
      </div>

      <RadioGroup value={housingType || ""} onValueChange={setHousingType}>
        <div className="space-y-3">
          {housingOptions.map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={`flex cursor-pointer items-start space-x-3 rounded-md border p-3 ${
                housingType === option.value ? "border-primary" : ""
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
        <Button className="flex-1" disabled={!housingType} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

