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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { CropSelector } from "@/components/crops/crop-selector"
import { ContainerPlacement } from "@/components/containers/container-placement"

const containerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Container name must be at least 2 characters.",
  }),
  type: z.enum(["pot", "raised-bed", "in-ground", "hydroponic", "other"], {
    required_error: "Please select a container type.",
  }),
  soilType: z.enum(["potting", "garden", "clay", "sandy", "loamy", "custom"], {
    required_error: "Please select soil type.",
  }),
  hasDrainage: z.boolean().default(true),
  width: z.number().min(0.1),
  length: z.number().min(0.1),
  depth: z.number().min(0.1),
  shape: z.enum(["circular", "rectangular", "square", "other"], {
    required_error: "Please select a shape.",
  }),
  location: z.object({
    x: z.number(),
    y: z.number(),
  }),
  crops: z.array(z.string()).default([]),
  notes: z.string().optional(),
})

type ContainerFormValues = z.infer<typeof containerFormSchema>

const defaultValues: Partial<ContainerFormValues> = {
  name: "",
  type: "pot",
  soilType: "potting",
  hasDrainage: true,
  width: 1,
  length: 1,
  depth: 0.5,
  shape: "circular",
  location: { x: 0, y: 0 },
  crops: [],
  notes: "",
}

export function CreateContainerForm({ gardenId, onSuccess }: { gardenId: string; onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const form = useForm<ContainerFormValues>({
    resolver: zodResolver(containerFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ContainerFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Container created",
        description: `${data.name} has been created successfully.`,
      })
      console.log(data)
      if (onSuccess) onSuccess()
    }, 1000)
  }

  const handleCropSelect = (cropId: string) => {
    const currentCrops = form.watch("crops") || []
    if (!currentCrops.includes(cropId)) {
      form.setValue("crops", [...currentCrops, cropId])
    }
  }

  const handleCropRemove = (cropId: string) => {
    const currentCrops = form.watch("crops") || []
    form.setValue(
      "crops",
      currentCrops.filter((id) => id !== cropId),
    )
  }

  const handleLocationChange = (x: number, y: number) => {
    form.setValue("location", { x, y })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Container</CardTitle>
        <CardDescription>Add a new container to your garden for growing crops.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Container Details</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions & Placement</TabsTrigger>
                <TabsTrigger value="crops">Crops</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Container Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tomato Pot" {...field} />
                      </FormControl>
                      <FormDescription>Give your container a name to easily identify it.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
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
                          <SelectItem value="in-ground">In-Ground</SelectItem>
                          <SelectItem value="hydroponic">Hydroponic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The type of container or space for growing.</FormDescription>
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
                      <FormDescription>The type of soil used in this container.</FormDescription>
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
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details about this container..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Add any other information about this container.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("dimensions")}>
                    Continue to Dimensions & Placement
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="shape"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Container Shape</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="circular" />
                            </FormControl>
                            <FormLabel className="font-normal">Circular</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="rectangular" />
                            </FormControl>
                            <FormLabel className="font-normal">Rectangular</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="square" />
                            </FormControl>
                            <FormLabel className="font-normal">Square</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>Select the shape that best describes your container.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Container Size Preview - Left Side */}
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium mb-2">Container Size Preview</div>
                    <div
                      className="bg-muted/50 rounded-md flex items-center justify-center relative"
                      style={{ height: "250px" }}
                    >
                      {form.watch("shape") === "circular" ? (
                        <div
                          className="bg-primary/20 border border-primary rounded-full absolute"
                          style={{
                            width: `${Math.min(75, (form.watch("width") / 5) * 75)}%`,
                            height: `${Math.min(75, (form.watch("width") / 5) * 75)}%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                            {form.watch("width")} ft diameter
                          </div>
                        </div>
                      ) : (
                        <div
                          className="bg-primary/20 border border-primary rounded-md absolute"
                          style={{
                            width: `${Math.min(75, (form.watch("width") / 5) * 75)}%`,
                            height: `${Math.min(75, (form.watch("length") / 5) * 75)}%`,
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                            {form.watch("width")} × {form.watch("length")} ft
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {form.watch("shape") === "circular" ? (
                        <>Area: {(Math.PI * Math.pow(form.watch("width") / 2, 2)).toFixed(1)} sq ft</>
                      ) : (
                        <>Area: {(form.watch("width") * form.watch("length")).toFixed(1)} sq ft</>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Depth: {form.watch("depth").toFixed(1)} ft ({(form.watch("depth") * 12).toFixed(0)} inches)
                    </div>
                  </div>

                  {/* Sliders - Right Side */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{form.watch("shape") === "circular" ? "Diameter" : "Width"} (feet)</FormLabel>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("shape") !== "circular" && form.watch("shape") !== "square" && (
                      <FormField
                        control={form.control}
                        name="length"
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="depth"
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Container Placement</FormLabel>
                      <FormDescription>Drag and drop the container to position it in your garden.</FormDescription>
                      <FormControl>
                        <ContainerPlacement
                          gardenId={gardenId}
                          containerShape={form.watch("shape")}
                          containerWidth={form.watch("width")}
                          containerLength={form.watch("length")}
                          initialPosition={field.value}
                          onPositionChange={handleLocationChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                    Back to Container Details
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("crops")}>
                    Continue to Crops
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="crops" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="crops"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Crops</FormLabel>
                      <FormDescription>
                        Choose crops to plant in this container. You can select multiple crops for companion planting.
                      </FormDescription>
                      <FormControl>
                        <CropSelector
                          selectedCropIds={field.value}
                          onCropSelect={handleCropSelect}
                          onCropRemove={handleCropRemove}
                          containerType={form.watch("type")}
                          containerShape={form.watch("shape")}
                          containerSize={{
                            width: form.watch("width"),
                            length: form.watch("length"),
                            depth: form.watch("depth"),
                          }}
                          soilType={form.watch("soilType")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("dimensions")}>
                    Back to Dimensions & Placement
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Container"}
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

