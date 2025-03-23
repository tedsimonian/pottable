"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data for a garden
const gardenData = {
  id: "garden-1",
  name: "My Balcony Garden",
  description: "A small garden on my east-facing balcony with morning sun and afternoon shade.",
  gardenType: "balcony",
  sunExposure: "partial",
  waterAccess: "easy",
  windExposure: "moderate",
  soilType: "potting",
  spaceWidth: 3,
  spaceLength: 5,
  isShared: false,
  createdAt: "2023-05-15",
  plotsCount: 3,
  activeCrops: 2,
}

const gardenFormSchema = z.object({
  name: z.string().min(2, {
    message: "Garden name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  gardenType: z.enum(
    [
      "balcony",
      "indoor",
      "windowsill",
      "patio",
      "backyard",
      "rooftop",
      "community",
      "raised-bed",
      "container",
      "vertical",
      "other",
    ],
    {
      required_error: "Please select a garden type.",
    },
  ),
  sunExposure: z.enum(["full", "partial", "shade"], {
    required_error: "Please select sun exposure.",
  }),
  waterAccess: z.enum(["easy", "moderate", "limited"], {
    required_error: "Please select water access.",
  }),
  windExposure: z.enum(["protected", "moderate", "exposed"], {
    required_error: "Please select wind exposure.",
  }),
  soilType: z.enum(["potting", "garden", "clay", "sandy", "loamy", "custom"], {
    required_error: "Please select soil type.",
  }),
  spaceWidth: z.number().min(1),
  spaceLength: z.number().min(1),
  isShared: z.boolean().default(false),
  notes: z.string().optional(),
})

type GardenFormValues = z.infer<typeof gardenFormSchema>

export function GardenSettings({ gardenId }: { gardenId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // In a real app, fetch garden data based on gardenId
  const garden = gardenData

  const form = useForm<GardenFormValues>({
    resolver: zodResolver(gardenFormSchema),
    defaultValues: {
      name: garden.name,
      description: garden.description,
      gardenType: garden.gardenType as any,
      sunExposure: garden.sunExposure as any,
      waterAccess: garden.waterAccess as any,
      windExposure: garden.windExposure as any,
      soilType: garden.soilType as any,
      spaceWidth: garden.spaceWidth,
      spaceLength: garden.spaceLength,
      isShared: garden.isShared,
    },
    mode: "onChange",
  })

  function onSubmit(data: GardenFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Garden updated",
        description: `${data.name} has been updated successfully.`,
      })
      console.log(data)
    }, 1000)
  }

  function handleDeleteGarden() {
    // In a real app, this would call an API to delete the garden
    console.log(`Deleting garden: ${gardenId}`)
    setDeleteDialogOpen(false)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Garden deleted",
        description: `${garden.name} has been deleted successfully.`,
      })
      // In a real app, redirect to gardens list
      // router.push('/dashboard/gardens')
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Garden Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your garden settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Garden Details</CardTitle>
          <CardDescription>Update your garden information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Garden Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gardenType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Garden Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select garden type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="balcony">Balcony</SelectItem>
                          <SelectItem value="indoor">Indoor</SelectItem>
                          <SelectItem value="windowsill">Windowsill</SelectItem>
                          <SelectItem value="patio">Patio</SelectItem>
                          <SelectItem value="backyard">Backyard</SelectItem>
                          <SelectItem value="rooftop">Rooftop</SelectItem>
                          <SelectItem value="community">Community Garden</SelectItem>
                          <SelectItem value="raised-bed">Raised Bed</SelectItem>
                          <SelectItem value="container">Container Garden</SelectItem>
                          <SelectItem value="vertical">Vertical Garden</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your garden..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sunExposure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sun Exposure</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sun exposure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full">Full Sun (6+ hours)</SelectItem>
                          <SelectItem value="partial">Partial Sun (3-6 hours)</SelectItem>
                          <SelectItem value="shade">Shade (Less than 3 hours)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="waterAccess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Water Access</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select water access" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy (Direct water source)</SelectItem>
                          <SelectItem value="moderate">Moderate (Nearby water source)</SelectItem>
                          <SelectItem value="limited">Limited (Difficult access)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="windExposure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wind Exposure</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select wind exposure" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="protected">Protected (Little wind)</SelectItem>
                          <SelectItem value="moderate">Moderate (Some wind)</SelectItem>
                          <SelectItem value="exposed">Exposed (Frequent wind)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soil Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="potting">Potting Mix</SelectItem>
                          <SelectItem value="garden">Garden Soil</SelectItem>
                          <SelectItem value="clay">Clay Soil</SelectItem>
                          <SelectItem value="sandy">Sandy Soil</SelectItem>
                          <SelectItem value="loamy">Loamy Soil</SelectItem>
                          <SelectItem value="custom">Custom Mix</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="spaceWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (feet)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={0.5}
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spaceLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (feet)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={0.5}
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isShared"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Shared Garden</FormLabel>
                      <FormDescription>Allow other users to view and collaborate on this garden</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
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

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Permanently delete this garden and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete a garden, there is no going back. This action cannot be undone. All plots, crops, and data
            associated with this garden will be permanently deleted.
          </p>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Garden</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your garden "{garden.name}" and all
                  associated plots and crop data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteGarden}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Garden
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}

