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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CropSelector } from "@/components/gardens/crop-selector"
import { InteractiveGardenLayout } from "@/components/gardens/interactive-garden-layout"

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
  cropId: z.string().optional(),
  position: z.object({
    x: z.number().default(0),
    y: z.number().default(0),
  }),
})

type PlotFormValues = z.infer<typeof plotFormSchema>

const defaultValues: Partial<PlotFormValues> = {
  name: "",
  containerType: "pot",
  containerWidth: 1,
  containerLength: 1,
  containerDepth: 0.5,
  soilType: "potting",
  hasDrainage: true,
  location: "",
  notes: "",
  cropId: undefined,
}

export function CreatePlotForm({ gardenId, onSuccess }: { gardenId: string; onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"details" | "crop" | "dimensions">("details")

  const form = useForm<PlotFormValues>({
    resolver: zodResolver(plotFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: PlotFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Plot created",
        description: `${data.name} has been created successfully.`,
      })
      console.log(data)
      if (onSuccess) onSuccess()
    }, 1000)
  }

  const handleCropSelect = (cropId: string) => {
    form.setValue("cropId", cropId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Plot</CardTitle>
        <CardDescription>Add a new plot to your garden for growing a single crop.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs
              defaultValue={step}
              onValueChange={(value) => setStep(value as "details" | "crop" | "dimensions")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Plot Details</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                <TabsTrigger value="crop">Select Crop</TabsTrigger>
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

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep("dimensions")}>
                    Continue to Dimensions
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Garden Space Preview - Left Side */}
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium mb-2">Plot Size Preview</div>
                    <div
                      className="bg-muted/50 rounded-md flex items-center justify-center relative"
                      style={{ height: "250px" }}
                    >
                      <div
                        className="bg-primary/20 border border-primary rounded-md absolute"
                        style={{
                          width: `${Math.min(75, (form.watch("containerWidth") / 10) * 75)}%`,
                          height: `${Math.min(75, (form.watch("containerLength") / 10) * 75)}%`,
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                          {form.watch("containerWidth")} × {form.watch("containerLength")} ft
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Volume:{" "}
                      {(
                        form.watch("containerWidth") *
                        form.watch("containerLength") *
                        form.watch("containerDepth")
                      ).toFixed(1)}{" "}
                      cubic ft
                    </div>
                  </div>

                  {/* Sliders - Right Side */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="containerWidth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{field.value} ft</span>
                              </div>
                              <Slider
                                min={0.1}
                                max={10}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
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
                                <span className="text-sm font-medium">{field.value} ft</span>
                              </div>
                              <Slider
                                min={0.1}
                                max={10}
                                step={0.1}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
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
                                <span className="text-sm font-medium">{field.value} ft</span>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Plot Position in Garden</FormLabel>
                      <FormDescription>
                        You can adjust the position of your plot in the garden layout after creation.
                      </FormDescription>
                      <FormControl>
                        <div className="mt-2">
                          <InteractiveGardenLayout gardenId={gardenId} editable={false} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={() => setStep("details")}>
                    Back to Plot Details
                  </Button>
                  <Button type="button" onClick={() => setStep("crop")}>
                    Continue to Crop Selection
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="crop" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="cropId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select a Crop</FormLabel>
                      <FormControl>
                        <CropSelector
                          selectedCropId={field.value}
                          onSelect={handleCropSelect}
                          containerType={form.watch("containerType")}
                          containerSize={{
                            width: form.watch("containerWidth"),
                            length: form.watch("containerLength"),
                            depth: form.watch("containerDepth"),
                          }}
                          soilType={form.watch("soilType")}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a crop to plant in this plot, or leave empty to decide later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep("dimensions")}>
                    Back to Dimensions
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Plot"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

