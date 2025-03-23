"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

// Mock data for a plot
const getPlotData = (plotId: string) => {
  return {
    id: plotId,
    name: "Tomato Pot",
    containerType: "pot",
    containerSize: {
      width: 1.5,
      length: 1.5,
      depth: 1.2,
    },
    soilType: "potting",
    hasDrainage: true,
    location: "East side of balcony",
    notes: "Gets morning sun, afternoon shade",
    crop: {
      id: "crop-1",
      name: "Tomato",
      type: "Vegetable",
      plantedDate: "2023-05-20",
      daysToMaturity: 75,
      progress: 45,
    },
  }
}

const plotFormSchema = z.object({
  name: z.string().min(2, {
    message: "Plot name must be at least 2 characters.",
  }),
  containerType: z.enum(["pot", "raised-bed", "ground", "container", "vertical", "hydroponic", "other"], {
    required_error: "Please select a container type.",
  }),
  containerWidth: z.number().min(0.1),
  containerLength: z.number().min(0.1),
  containerDepth: z.number().min(0.1),
  soilType: z.enum(["potting", "garden", "clay", "sandy", "loamy", "custom"], {
    required_error: "Please select soil type.",
  }),
  hasDrainage: z.boolean().default(true),
  location: z.string().optional(),
  notes: z.string().optional(),
})

type PlotFormValues = z.infer<typeof plotFormSchema>

export function EditPlotForm({ gardenId, plotId }: { gardenId: string; plotId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // In a real app, fetch plot data based on plotId
  const plotData = getPlotData(plotId)

  const form = useForm<PlotFormValues>({
    resolver: zodResolver(plotFormSchema),
    defaultValues: {
      name: plotData.name,
      containerType: plotData.containerType as any,
      containerWidth: plotData.containerSize.width,
      containerLength: plotData.containerSize.length,
      containerDepth: plotData.containerSize.depth,
      soilType: plotData.soilType as any,
      hasDrainage: plotData.hasDrainage,
      location: plotData.location,
      notes: plotData.notes || "",
    },
    mode: "onChange",
  })

  function onSubmit(data: PlotFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Plot updated",
        description: `${data.name} has been updated successfully.`,
      })
      console.log(data)
      router.push(`/dashboard/gardens/${gardenId}/plots/${plotId}`)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Plot</CardTitle>
        <CardDescription>Update your plot details and growing conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Plot Details</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plot Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tomato Pot" {...field} />
                      </FormControl>
                      <FormDescription>Give your plot a name to easily identify it.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="containerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Container Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select container type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pot">Pot</SelectItem>
                          <SelectItem value="raised-bed">Raised Bed</SelectItem>
                          <SelectItem value="ground">In-Ground</SelectItem>
                          <SelectItem value="container">Container</SelectItem>
                          <SelectItem value="vertical">Vertical Planter</SelectItem>
                          <SelectItem value="hydroponic">Hydroponic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The type of container or space for this plot.</FormDescription>
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
                      <FormDescription>The type of soil used in this plot.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasDrainage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Drainage</FormLabel>
                        <FormDescription>Does this container have drainage holes?</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location in Garden</FormLabel>
                      <FormControl>
                        <Input placeholder="North corner, near the fence..." {...field} />
                      </FormControl>
                      <FormDescription>Describe where this plot is located within your garden.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details about this plot..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add any other information about this plot.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Plot Size Preview - Left Side */}
                  <div className="rounded-lg border p-4 h-full flex flex-col">
                    <div className="text-sm font-medium mb-2">Plot Size Preview</div>
                    <div className="flex-1 flex flex-col">
                      <div className="bg-muted/50 rounded-md flex items-center justify-center relative flex-1 mb-3">
                        <div
                          className="bg-primary/20 border border-primary rounded-md absolute"
                          style={{
                            width: `${Math.min(100, (form.watch("containerWidth") / 5) * 100)}%`,
                            height: `${Math.min(100, (form.watch("containerLength") / 5) * 100)}%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                            {form.watch("containerWidth")} × {form.watch("containerLength")} ft
                          </div>
                        </div>
                      </div>

                      {/* Depth visualization */}
                      <div className="h-16 bg-muted/30 rounded-md relative mb-3">
                        <div
                          className="absolute inset-x-0 bottom-0 bg-primary/20 border-t border-x border-primary rounded-b-md"
                          style={{
                            height: `${Math.min(100, (form.watch("containerDepth") / 3) * 100)}%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                            {form.watch("containerDepth")} ft deep
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Total area: {(form.watch("containerWidth") * form.watch("containerLength")).toFixed(1)} sq ft
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Soil depth: {form.watch("containerDepth").toFixed(1)} ft (
                        {(form.watch("containerDepth") * 12).toFixed(0)} inches)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Total volume:{" "}
                        {(
                          form.watch("containerWidth") *
                          form.watch("containerLength") *
                          form.watch("containerDepth")
                        ).toFixed(1)}{" "}
                        cubic ft
                      </div>
                    </div>
                  </div>

                  {/* Sliders - Right Side */}
                  <div className="space-y-6 flex flex-col justify-between">
                    <FormField
                      control={form.control}
                      name="containerWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">0.1 ft</span>
                                <span className="text-sm font-medium">{field.value} ft</span>
                                <span className="text-sm text-muted-foreground">5 ft</span>
                              </div>
                              <Slider
                                min={0.1}
                                max={5}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>The width of your plot.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="containerLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">0.1 ft</span>
                                <span className="text-sm font-medium">{field.value} ft</span>
                                <span className="text-sm text-muted-foreground">5 ft</span>
                              </div>
                              <Slider
                                min={0.1}
                                max={5}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>The length of your plot.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="containerDepth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Depth (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">0.1 ft</span>
                                <span className="text-sm font-medium">{field.value} ft</span>
                                <span className="text-sm text-muted-foreground">3 ft</span>
                              </div>
                              <Slider
                                min={0.1}
                                max={3}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>The soil depth of your plot.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/dashboard/gardens/${gardenId}/plots/${plotId}`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

