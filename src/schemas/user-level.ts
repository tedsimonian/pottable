import { z } from "zod";

export const userLevelSchema = z.object({
  level: z.number(),
  title: z.string(),
  totalXp: z.number(),
  currentXp: z.number(),
});

export const addXpSchema = z.object({
  xpToAdd: z.number(),
});

export type UserLevel = z.infer<typeof userLevelSchema>;
export type AddXp = z.infer<typeof addXpSchema>;
