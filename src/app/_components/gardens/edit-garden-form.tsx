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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Sun, Wind, Compass, MapPin } from "lucide-react"

// Mock data for a garden
const getGardenData = (gardenId: string) => ({
  id: gardenId,
  name: "My Balcony Garden",
  description: "A small garden on my east-facing balcony with morning sun and afternoon shade.",
  location: "balcony",
  directionality: "east",
  sunExposure: "partial",
  windExposure: "moderate",
  environmentalNotes: "Protected from strong winds by the building wall.",
  width: 3,
  length: 5,
  depth: 1,
})

const gardenFormSchema = z.object({
  name: z.string().min(2, {
    message: "Garden name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  location: z.enum(
    ["backyard", "front-yard", "balcony", "patio", "rooftop", "indoor", "windowsill", "community", "other"],
    {
      required_error: "Please select a location.",
    },
  ),
  directionality: z.enum(["north", "east", "south", "west", "northeast", "northwest", "southeast", "southwest"], {
    required_error: "Please select the direction where the sun rises from.",
  }),
  sunExposure: z.enum(["full", "partial", "shade"], {
    required_error: "Please select sun exposure.",
  }),
  windExposure: z.enum(["protected", "moderate", "exposed"], {
    required_error: "Please select wind exposure.",
  }),
  environmentalNotes: z.string().optional(),
  width: z.number().min(1, {
    message: "Width must be at least 1 foot.",
  }),
  length: z.number().min(1, {
    message: "Length must be at least 1 foot.",
  }),
  depth: z.number().min(0.1, {
    message: "Depth must be at least 0.1 foot.",
  }),
})

type GardenFormValues = z.infer<typeof gardenFormSchema>

export function EditGardenForm({ gardenId }: { gardenId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const router = useRouter()

  // In a real app, fetch garden data based on gardenId
  const gardenData = getGardenData(gardenId)

  const form = useForm<GardenFormValues>({
    resolver: zodResolver(gardenFormSchema),
    defaultValues: {
      name: gardenData.name,
      description: gardenData.description || "",
      location: gardenData.location as any,
      directionality: gardenData.directionality as any,
      sunExposure: gardenData.sunExposure as any,
      windExposure: gardenData.windExposure as any,
      environmentalNotes: gardenData.environmentalNotes || "",
      width: gardenData.width,
      length: gardenData.length,
      depth: gardenData.depth,
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
      router.push(`/dashboard/gardens/${gardenId}`)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Garden</CardTitle>
        <CardDescription>Update your garden details to get better recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="environment">Environment</TabsTrigger>
                <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Garden Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Backyard Garden" {...field} />
                      </FormControl>
                      <FormDescription>Give your garden a name to easily identify it.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A small garden in my backyard..." className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>Briefly describe your garden space.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        Location
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="backyard">Backyard</SelectItem>
                          <SelectItem value="front-yard">Front Yard</SelectItem>
                          <SelectItem value="balcony">Balcony</SelectItem>
                          <SelectItem value="patio">Patio</SelectItem>
                          <SelectItem value="rooftop">Rooftop</SelectItem>
                          <SelectItem value="indoor">Indoor</SelectItem>
                          <SelectItem value="windowsill">Windowsill</SelectItem>
                          <SelectItem value="community">Community Garden</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Where is your garden located?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="directionality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Compass className="h-4 w-4 text-muted-foreground" />
                        Sun Rise Direction
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="north" />
                            </FormControl>
                            <FormLabel className="font-normal">North</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="east" />
                            </FormControl>
                            <FormLabel className="font-normal">East</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="south" />
                            </FormControl>
                            <FormLabel className="font-normal">South</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="west" />
                            </FormControl>
                            <FormLabel className="font-normal">West</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="northeast" />
                            </FormControl>
                            <FormLabel className="font-normal">Northeast</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="northwest" />
                            </FormControl>
                            <FormLabel className="font-normal">Northwest</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="southeast" />
                            </FormControl>
                            <FormLabel className="font-normal">Southeast</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="southwest" />
                            </FormControl>
                            <FormLabel className="font-normal">Southwest</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>From which direction does the sun rise in your garden area?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("environment")}>
                    Continue to Environment
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="environment" className="space-y-6 pt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="sunExposure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-yellow-500" />
                          Sun Exposure
                        </FormLabel>
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
                        <FormDescription>How much direct sunlight does your garden receive?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="windExposure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Wind className="h-4 w-4 text-sky-500" />
                          Wind Exposure
                        </FormLabel>
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
                        <FormDescription>How windy is your garden location?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="environmentalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Environmental Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details about your garden environment..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add any other environmental factors that might affect your garden (e.g., nearby trees,
                        buildings, slopes, etc.).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                    Back to Basic Info
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("dimensions")}>
                    Continue to Dimensions
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Garden Space Preview - Left Side */}
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium mb-2">Garden Space Preview</div>
                    <div
                      className="bg-muted/50 rounded-md flex items-center justify-center relative"
                      style={{ height: "250px" }}
                    >
                      <div
                        className="bg-primary/20 border border-primary rounded-md absolute"
                        style={{
                          width: `${Math.min(100, (form.watch("width") / 20) * 100)}%`,
                          height: `${Math.min(100, (form.watch("length") / 20) * 100)}%`,
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium whitespace-nowrap">
                          {form.watch("width")} × {form.watch("length")} ft
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Total area: {(form.watch("width") * form.watch("length")).toFixed(1)} sq ft
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Soil depth: {form.watch("depth").toFixed(1)} ft ({(form.watch("depth") * 12).toFixed(0)} inches)
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Total volume: {(form.watch("width") * form.watch("length") * form.watch("depth")).toFixed(1)}{" "}
                      cubic ft
                    </div>
                  </div>

                  {/* Sliders - Right Side */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">1 ft</span>
                                <span className="text-sm font-medium">{field.value} ft</span>
                                <span className="text-sm text-muted-foreground">20 ft</span>
                              </div>
                              <Slider
                                min={1}
                                max={20}
                                step={0.5}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>The width of your garden space.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length (feet)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">1 ft</span>
                                <span className="text-sm font-medium">{field.value} ft</span>
                                <span className="text-sm text-muted-foreground">20 ft</span>
                              </div>
                              <Slider
                                min={1}
                                max={20}
                                step={0.5}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>The length of your garden space.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                          <FormDescription>The soil depth of your garden space.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("environment")}>
                    Back to Environment
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
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

