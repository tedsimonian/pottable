"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function OnboardingStepComplete() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Setup Complete!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You're all set to start growing with Pottable. We've customized your experience based on your location and
          growing environment.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="font-medium">What's Next?</h3>
        <ul className="mt-2 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              1
            </span>
            <span>Create your first garden to organize your plants</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              2
            </span>
            <span>Add plots to your garden based on your containers or growing spaces</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </span>
            <span>Select crops to grow and get AI-powered growing plans</span>
          </li>
        </ul>
      </div>

      <Button className="w-full" asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  )
}

