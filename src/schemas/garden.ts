import { z } from "zod";
import { GARDEN_TYPES } from "~/lib/garden";

export const gardenTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

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

export const gardenFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Garden name must be at least 2 characters" })
      .max(100, { message: "Garden name cannot exceed 100 characters" }),
    location: z
      .string()
      .trim()
      .max(200, { message: "Location cannot exceed 200 characters" })
      .optional(),
    sizeSqFeet: z.number().nonnegative().optional(),
    gardenType: z.enum(GARDEN_TYPES, {
      message: "Invalid garden type selected",
    }),
    description: z.string().trim().optional(),
  })
  .strict();

export type GardenCreateInput = z.infer<typeof gardenSchema>;
export type GardenUpdateInput = z.infer<typeof gardenSchema>;
export type GardenInclude = z.infer<typeof gardenIncludeSchema>;
export type GardenFormValues = z.infer<typeof gardenFormSchema>;
