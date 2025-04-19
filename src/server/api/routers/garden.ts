import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { gardenIncludeSchema, gardenSchema } from "~/schemas/garden";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { throwTRPCError } from "~/server/custom-error";

export const gardenRouter = createTRPCRouter({
  // Get all gardens for the current user
  myGardens: protectedProcedure
    .input(gardenIncludeSchema)
    .query(async ({ ctx, input }) => {
      try {
        const gardens = await ctx.db.garden.findMany({
          where: {
            userId: ctx.session.user.id,
          },
          include: {
            conditions: input?.includeConditions ?? false,
            containers: input?.includeContainers ?? false,
            seasonalPlans: input?.includeSeasonalPlans ?? false,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return { success: true, data: gardens };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          throwTRPCError("DATABASE_ERROR");
        }
        throwTRPCError("INTERNAL_SERVER_ERROR");
      }
    }),

  // Get a single garden by ID
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        includeConditions: z.boolean().optional(),
        includeContainers: z.boolean().optional(),
        includeSeasonalPlans: z.boolean().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const garden = await ctx.db.garden.findFirst({
          where: {
            id: input.id,
            userId: ctx.session.user.id,
          },
          include: {
            conditions: input.includeConditions ?? false,
            containers: input.includeContainers ?? false,
            seasonalPlans: input.includeSeasonalPlans ?? false,
          },
        });

        if (!garden) {
          throwTRPCError("GARDEN_NOT_FOUND");
        }

        return { success: true, data: garden };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        if (error instanceof PrismaClientKnownRequestError) {
          throwTRPCError("DATABASE_ERROR");
        }
        throwTRPCError("INTERNAL_SERVER_ERROR");
      }
    }),

  // Create a new garden
  create: protectedProcedure
    .input(gardenSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      try {
        const garden = await ctx.db.garden.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });

        return { success: true, data: garden };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          throwTRPCError("GARDEN_CREATION_FAILED");
        }
        throwTRPCError("INTERNAL_SERVER_ERROR");
      }
    }),

  // Update an existing garden
  update: protectedProcedure
    .input(gardenSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const garden = await ctx.db.garden.update({
          where: { id: input.id, userId: ctx.session.user.id },
          data: input,
        });

        return { success: true, data: garden };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        if (error instanceof PrismaClientKnownRequestError) {
          throwTRPCError("GARDEN_UPDATE_FAILED");
        }
        throwTRPCError("INTERNAL_SERVER_ERROR");
      }
    }),

  // Delete a garden
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedGarden = await ctx.db.garden.delete({
          where: { id: input, userId: ctx.session.user.id },
        });

        return { success: true, id: deletedGarden };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        if (error instanceof PrismaClientKnownRequestError) {
          throwTRPCError("GARDEN_DELETION_FAILED");
        }
        throwTRPCError("INTERNAL_SERVER_ERROR");
      }
    }),
});
