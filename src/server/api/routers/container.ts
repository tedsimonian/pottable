import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// Define the schema for container input validation
const containerSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1),
  dimensions: z.object({
    width: z.number().positive(),
    length: z.number().positive(),
    height: z.number().positive(),
  }),
  volume: z.number().positive(),
  drainage: z.boolean(),
});

export const containerRouter = createTRPCRouter({
  // Create a new container
  create: protectedProcedure
    .input(containerSchema.omit({ id: true }))
    .mutation(async ({ input }) => {
      // Logic to create a container
      return { success: true, data: input };
    }),

  // Read a container by ID
  read: protectedProcedure.input(z.string()).query(async ({ input }) => {
    // Logic to read a container
    return {
      success: true,
      data: {
        id: input,
        type: "Sample Container",
        dimensions: { width: 10, length: 10, height: 10 },
        volume: 1000,
        drainage: true,
      },
    };
  }),

  // Update a container
  update: protectedProcedure
    .input(containerSchema)
    .mutation(async ({ input }) => {
      // Logic to update a container
      return { success: true, data: input };
    }),

  // Delete a container
  delete: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    // Logic to delete a container
    return { success: true, id: input };
  }),
});
