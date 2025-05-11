import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { throwTRPCError } from "~/server/custom-error";
import { addXpSchema } from "~/schemas/user-level";
import type { DBSession } from "~/server/db";
import type { ProgressLevel, USER_LEVELS } from "~/types/user-level";

export const PROGRESS_LEVELS: USER_LEVELS = {
  LEVEL_1: { level: 1, title: "Novice Gardener", totalXp: 0, currentXp: 0 },
  LEVEL_2: { level: 2, title: "Seed Sower", totalXp: 100, currentXp: 0 },
  LEVEL_3: { level: 3, title: "Sprout Tender", totalXp: 250, currentXp: 0 },
  LEVEL_4: { level: 4, title: "Soil Student", totalXp: 450, currentXp: 0 },
  LEVEL_5: { level: 5, title: "Water Bearer", totalXp: 700, currentXp: 0 },
  LEVEL_6: { level: 6, title: "Sunlight Seeker", totalXp: 1000, currentXp: 0 },
  LEVEL_7: { level: 7, title: "Weed Warrior", totalXp: 1400, currentXp: 0 },
  LEVEL_8: { level: 8, title: "Compost Creator", totalXp: 1900, currentXp: 0 },
  LEVEL_9: { level: 9, title: "Pruning Prodigy", totalXp: 2500, currentXp: 0 },
  LEVEL_10: { level: 10, title: "Pollinator Pal", totalXp: 3200, currentXp: 0 },
  LEVEL_11: { level: 11, title: "Growth Guide", totalXp: 4000, currentXp: 0 },
  LEVEL_12: { level: 12, title: "Harvest Helper", totalXp: 4900, currentXp: 0 },
  LEVEL_13: {
    level: 13,
    title: "Container Captain",
    totalXp: 5900,
    currentXp: 0,
  },
  LEVEL_14: {
    level: 14,
    title: "Garden Guardian",
    totalXp: 7000,
    currentXp: 0,
  },
  LEVEL_15: {
    level: 15,
    title: "Plant Whisperer",
    totalXp: 8200,
    currentXp: 0,
  },
  LEVEL_16: {
    level: 16,
    title: "Seasonal Strategist",
    totalXp: 9500,
    currentXp: 0,
  },
  LEVEL_17: { level: 17, title: "Eco Expert", totalXp: 10900, currentXp: 0 },
  LEVEL_18: { level: 18, title: "Flora Maestro", totalXp: 12400, currentXp: 0 },
  LEVEL_19: {
    level: 19,
    title: "Master Horticulturist",
    totalXp: 14000,
    currentXp: 0,
  },
  LEVEL_20: {
    level: 20,
    title: "Legendary Gardener",
    totalXp: 15700,
    currentXp: 0,
  },
};

const levelUp = async (userId: string, db: DBSession) => {
  const userLevel = await db.userLevel.findUnique({
    where: { userId },
  });

  if (!userLevel) {
    throwTRPCError("NOT_FOUND", "User level not found");
  }

  const currentLevel = userLevel!.currentLevel;
  const nextLevel = currentLevel + 1;

  const nextLevelData =
    PROGRESS_LEVELS[`LEVEL_${nextLevel}` as keyof USER_LEVELS];

  if (!nextLevelData) {
    throwTRPCError("NOT_FOUND", "Next level data not found");
  }

  const updatedUserLevel = await db.userLevel.update({
    where: { userId },
    data: {
      currentLevel: nextLevel,
      currentXp: 0,
      totalXp: nextLevelData.totalXp,
      levelTitle: nextLevelData.title,
    },
    select: {
      currentLevel: true,
      currentXp: true,
      totalXp: true,
      levelTitle: true,
    },
  });

  return {
    level: updatedUserLevel.currentLevel,
    title: updatedUserLevel.levelTitle,
    totalXp: updatedUserLevel.totalXp,
    currentXp: updatedUserLevel.currentXp,
  } as ProgressLevel;
};

const addXp = async (userId: string, xpToAdd: number, db: DBSession) => {
  const userLevel = await db.userLevel.findUnique({
    where: { userId },
  });

  if (!userLevel) {
    throwTRPCError("NOT_FOUND", "User level not found");
  }

  const currentXp = userLevel!.currentXp;
  const totalXp = userLevel!.totalXp;

  const newXpProgress = currentXp + xpToAdd;

  if (newXpProgress >= totalXp) {
    return await levelUp(userId, db);
  }

  const updatedUserLevel = await db.userLevel.update({
    where: { userId },
    data: { currentXp: newXpProgress },
  });

  return {
    level: updatedUserLevel.currentLevel,
    title: updatedUserLevel.levelTitle,
    totalXp: updatedUserLevel.totalXp,
    currentXp: updatedUserLevel.currentXp,
  } as ProgressLevel;
};

export const userLevelRouter = createTRPCRouter({
  getLevel: protectedProcedure.query(async ({ ctx }) => {
    let progressLevel: ProgressLevel = {
      ...PROGRESS_LEVELS.LEVEL_1,
    };

    const userLevel = await ctx.db.userLevel.findUnique({
      where: { userId: ctx.session.user.id },
      select: {
        currentLevel: true,
        currentXp: true,
        totalXp: true,
        levelTitle: true,
      },
    });

    // If user level is not found, that means they are a new user and we need to create a new user level.
    if (!userLevel) {
      // Create a new user level
      const newUserLevel = await ctx.db.userLevel.create({
        data: {
          userId: ctx.session.user.id,
          currentLevel: PROGRESS_LEVELS.LEVEL_1.level,
          currentXp: 0,
          totalXp: PROGRESS_LEVELS.LEVEL_1.totalXp,
          levelTitle: PROGRESS_LEVELS.LEVEL_1.title,
        },
        select: {
          currentLevel: true,
          currentXp: true,
          totalXp: true,
          levelTitle: true,
        },
      });

      progressLevel = {
        ...PROGRESS_LEVELS.LEVEL_1,
        currentXp: newUserLevel.currentXp,
      };
    } else {
      progressLevel = {
        level: userLevel.currentLevel,
        title: userLevel.levelTitle,
        totalXp: userLevel.totalXp,
        currentXp: userLevel.currentXp,
      };
    }

    return progressLevel;
  }),
  levelUp: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;
    return await levelUp(userId, ctx.db);
  }),
  addXp: protectedProcedure
    .input(addXpSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { xpToAdd } = input;

      return await addXp(userId, xpToAdd, ctx.db);
    }),
});
