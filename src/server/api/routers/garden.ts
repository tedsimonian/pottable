import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// Define the schema for garden input validation
const gardenSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  location: z.string().min(1),
  size: z.number().positive(),
});

export const gardenRouter = createTRPCRouter({
  // Create a new garden
  create: protectedProcedure
    .input(gardenSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      // Logic to create a garden
      return { success: true, data: input };
    }),

  // Read a garden by ID
  read: protectedProcedure.input(z.string()).query(async ({ input }) => {
    // Logic to read a garden
    return {
      success: true,
      data: {
        id: input,
        name: "Sample Garden",
        location: "Backyard",
        size: 100,
      },
    };
  }),

  // Update a garden
  update: protectedProcedure.input(gardenSchema).mutation(async ({ input }) => {
    // Logic to update a garden
    return { success: true, data: input };
  }),

  // Delete a garden
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    // Logic to delete a garden
    return { success: true, id: input };
  }),
});
