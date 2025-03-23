"use client"

import { useState } from "react"
import { OnboardingStepLocation } from "@/components/onboarding/step-location"
import { OnboardingStepHousing } from "@/components/onboarding/step-housing"
import { OnboardingStepGrowingSpot } from "@/components/onboarding/step-growing-spot"
import { OnboardingStepComplete } from "@/components/onboarding/step-complete"
import { Card, CardContent } from "@/components/ui/card"
import { OnboardingProgress } from "@/components/onboarding/progress"

const steps = ["Location", "Housing Type", "Growing Spot", "Complete"]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6">
          <OnboardingProgress currentStep={currentStep} steps={steps} />
          <div className="mt-8">
            {currentStep === 0 && <OnboardingStepLocation onNext={handleNext} />}
            {currentStep === 1 && <OnboardingStepHousing onNext={handleNext} onBack={handleBack} />}
            {currentStep === 2 && <OnboardingStepGrowingSpot onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <OnboardingStepComplete />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

