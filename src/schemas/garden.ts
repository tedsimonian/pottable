import { z } from "zod";

export const gardenSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(100),
  location: z.string().min(1).max(200).optional(),
  sizeSqFeet: z.number().positive().optional(),
  gardenType: z.string().max(50).optional(),
  description: z.string().optional(),
});

export const gardenIncludeSchema = z
  .object({
    includeConditions: z.boolean().optional(),
    includeContainers: z.boolean().optional(),
    includeSeasonalPlans: z.boolean().optional(),
  })
  .optional();

export const gardenFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Garden name must be at least 2 characters" })
    .max(100, { message: "Garden name cannot exceed 100 characters" }),
  location: z
    .string()
    .max(200, { message: "Location cannot exceed 200 characters" })
    .optional(),
  sizeSqFeet: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number.parseFloat(val)), {
      message: "Size must be a valid number",
    })
    .transform((val) => (val ? Number.parseFloat(val) : undefined)),
  gardenType: z
    .string()
    .max(50, { message: "Garden type cannot exceed 50 characters" })
    .optional(),
  description: z.string().optional(),
});

export type GardenCreateInput = z.infer<typeof gardenSchema>;
export type GardenUpdateInput = z.infer<typeof gardenSchema>;
export type GardenInclude = z.infer<typeof gardenIncludeSchema>;
export type GardenFormValues = z.infer<typeof gardenFormSchema>;
