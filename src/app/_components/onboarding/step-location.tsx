"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

export function OnboardingStepLocation({ onNext }: { onNext: () => void }) {
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [isValid, setIsValid] = useState(false)

  const handleChange = () => {
    setIsValid(country !== "" && city !== "")
  }

  const handleCountryChange = (value: string) => {
    setCountry(value)
    handleChange()
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    handleChange()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Where are you located?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We'll use this information to provide personalized growing recommendations based on your local climate and
          growing conditions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={country} onValueChange={handleCountryChange}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="jp">Japan</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Enter your city" value={city} onChange={handleCityChange} />
        </div>
      </div>

      <Button className="w-full" disabled={!isValid} onClick={onNext}>
        Continue
      </Button>
    </div>
  )
}

