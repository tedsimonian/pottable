import { api } from "~/trpc/react";

export const useUserLevel = () => {
  const {
    data,
    isLoading: isLoadingLevel,
    error,
  } = api.userLevel.getLevel.useQuery();
  const { mutate: addXp, isPending: isAddingXp } =
    api.userLevel.addXp.useMutation();
  const { mutate: levelUp, isPending: isLevelingUp } =
    api.userLevel.levelUp.useMutation();

  return {
    userLevel: data,
    isLoading: isLoadingLevel,
    error,
    addXp,
    levelUp,
    isAddingXp,
    isLevelingUp,
  };
};
