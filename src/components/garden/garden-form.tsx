"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { gardenFormSchema, type GardenFormValues } from "~/schemas/garden";
import { useMyGardens } from "~/hooks";
import { gardenTypeList } from "~/lib/garden";
import { FormSchemaProvider } from "~/providers/form-schema-provider";

export const GardenForm = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const { createGarden, isCreating } = useMyGardens();

  const form = useForm<GardenFormValues>({
    resolver: zodResolver(gardenFormSchema),
    defaultValues: {
      name: "",
      location: "",
      sizeSqFeet: 0,
      description: "",
    },
  });

  const onSubmit = async (values: GardenFormValues) => {
    try {
      await createGarden({
        name: values.name,
        location: values.location,
        sizeSqFeet: values.sizeSqFeet,
        gardenType: values.gardenType,
        description: values.description,
      });

      setIsSubmitSuccessful(true);
      toast.success(`${values.name} has been successfully created.`);

      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setIsSubmitSuccessful(false);
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">
          {"Create a New Garden"}
        </CardTitle>
        <CardDescription className="text-center">
          {"Fill in the details below to create your garden space"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormSchemaProvider schema={gardenFormSchema}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Garden Name"}</FormLabel>
                    <FormControl>
                      <Input placeholder="My Beautiful Garden" {...field} />
                    </FormControl>
                    <FormDescription>
                      {"Give your garden a memorable name"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Location"}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Backyard, Front yard, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sizeSqFeet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Size (sq. feet)"}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gardenType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Garden Type"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select garden type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gardenTypeList.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {"Select the type that best describes your garden"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Description"}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your garden, its purpose, and any special features..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {"Add details about your garden to help with planning"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreating || isSubmitSuccessful}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {"Creating..."}
                    </>
                  ) : isSubmitSuccessful ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {"Garden Created!"}
                    </>
                  ) : (
                    "Create Garden"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </FormSchemaProvider>
      </CardContent>
      <CardFooter className="text-muted-foreground flex justify-center text-sm">
        {"Look at you, you're a gardener!"}
      </CardFooter>
    </Card>
  );
};
