"use client"

import { CheckIcon } from "lucide-react"

export function OnboardingProgress({
  currentStep,
  steps,
}: {
  currentStep: number
  steps: string[]
}) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted" />
      <ol className="relative flex w-full justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <li key={step} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background"
                }`}
              >
                {isCompleted ? <CheckIcon className="h-4 w-4" /> : <span className="text-sm">{index + 1}</span>}
              </div>
              <span
                className={`mt-2 text-xs ${
                  isCompleted || isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

