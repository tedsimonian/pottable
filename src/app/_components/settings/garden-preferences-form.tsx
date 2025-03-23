"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const gardenPreferencesSchema = z.object({
  measurementSystem: z.enum(["imperial", "metric"], {
    required_error: "Please select a measurement system.",
  }),
  temperatureUnit: z.enum(["fahrenheit", "celsius"], {
    required_error: "Please select a temperature unit.",
  }),
  gardeningExperience: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your gardening experience level.",
  }),
  organicPreference: z.boolean().default(true),
  autoWeatherSync: z.boolean().default(true),
  gardenPrivacy: z.enum(["public", "private", "friends"], {
    required_error: "Please select a garden privacy setting.",
  }),
})

type GardenPreferencesValues = z.infer<typeof gardenPreferencesSchema>

// This can come from your database or API
const defaultValues: Partial<GardenPreferencesValues> = {
  measurementSystem: "imperial",
  temperatureUnit: "fahrenheit",
  gardeningExperience: "intermediate",
  organicPreference: true,
  autoWeatherSync: true,
  gardenPrivacy: "private",
}

export function GardenPreferencesForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<GardenPreferencesValues>({
    resolver: zodResolver(gardenPreferencesSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: GardenPreferencesValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Garden preferences updated",
        description: "Your garden preferences have been updated successfully.",
      })
      console.log(data)
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="measurementSystem"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Measurement System</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="imperial" />
                          </FormControl>
                          <FormLabel className="font-normal">Imperial (inches, feet)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="metric" />
                          </FormControl>
                          <FormLabel className="font-normal">Metric (centimeters, meters)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Choose your preferred measurement system for dimensions</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperatureUnit"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Temperature Unit</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fahrenheit" />
                          </FormControl>
                          <FormLabel className="font-normal">Fahrenheit (°F)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="celsius" />
                          </FormControl>
                          <FormLabel className="font-normal">Celsius (°C)</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Choose your preferred temperature unit for weather and growing conditions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gardeningExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gardening Experience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us tailor our recommendations and instructions to your skill level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="organicPreference"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Organic Gardening</FormLabel>
                      <FormDescription>Prefer organic gardening methods and recommendations</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="autoWeatherSync"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto Weather Sync</FormLabel>
                      <FormDescription>Automatically sync weather data with your location</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="gardenPrivacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garden Privacy</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select privacy setting" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="private">Private (Only you can view)</SelectItem>
                      <SelectItem value="friends">Friends (Only connections can view)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Control who can see your gardens and growing activities</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

