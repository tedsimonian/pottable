/**
 * Get the progress of the user level from the current xp and total xp.
 *
 * @param currentXp - The current xp of the user.
 * @param totalXp - The total xp of the user.
 * @returns The progress of the user level.
 */
export const getProgressFromXp = (currentXp: number, totalXp: number) => {
  return (currentXp / totalXp) * 100;
};

export const getFormattedLevelTitle = (title: string, level: number) => {
  return `Level ${level} - ${title}`;
};
