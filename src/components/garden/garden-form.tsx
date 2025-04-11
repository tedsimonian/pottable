// 'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const gardenSchema = z.object({
  name: z.string().min(1, { message: "Garden name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  size: z.number().positive({ message: "Size must be a positive number" }),
});

type GardenFormData = z.infer<typeof gardenSchema>;

const GardenForm: React.FC = () => {
  const form = useForm<GardenFormData>({
    resolver: zodResolver(gardenSchema),
    defaultValues: {
      name: "",
      location: "",
      size: 0,
    },
  });

  const onSubmit = async (data: GardenFormData) => {
    try {
      // Submit form data
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default GardenForm;
