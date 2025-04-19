import { api } from "~/trpc/react";
// import type { RouterOutputs } from "~/trpc/react";
import type {
  GardenCreateInput,
  GardenUpdateInput,
  GardenInclude,
} from "~/schemas/garden";

// export type Garden = NonNullable<RouterOutputs["garden"]["myGardens"]>["data"][number];

export const useMyGardens = (include?: GardenInclude) => {
  const utils = api.useUtils();

  // Query to fetch all gardens
  const {
    data: gardensData,
    isLoading,
    error: trpcError,
  } = api.garden.myGardens.useQuery(include, {
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Transform tRPC error to standard Error
  const error = trpcError ? new Error(trpcError.message) : null;

  // Mutation to create a garden
  const createGarden = api.garden.create.useMutation({
    onSuccess: async () => {
      await utils.garden.myGardens.invalidate().catch(console.error);
    },
  });

  // Mutation to update a garden
  const updateGarden = api.garden.update.useMutation({
    onSuccess: async () => {
      await utils.garden.myGardens.invalidate().catch(console.error);
    },
  });

  // Mutation to delete a garden
  const deleteGarden = api.garden.delete.useMutation({
    onSuccess: async () => {
      await utils.garden.myGardens.invalidate().catch(console.error);
    },
  });

  // Helper function to create a new garden
  const handleCreateGarden = async (garden: GardenCreateInput) => {
    try {
      const result = await createGarden.mutateAsync(garden);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Helper function to update a garden
  const handleUpdateGarden = async (garden: GardenUpdateInput) => {
    try {
      const result = await updateGarden.mutateAsync(garden);
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Helper function to delete a garden
  const handleDeleteGarden = async (gardenId: number) => {
    try {
      const result = await deleteGarden.mutateAsync(gardenId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    gardens: gardensData?.data ?? [],
    isLoading,
    error,
    createGarden: handleCreateGarden,
    updateGarden: handleUpdateGarden,
    deleteGarden: handleDeleteGarden,
    isCreating: createGarden.status === "pending",
    isUpdating: updateGarden.status === "pending",
    isDeleting: deleteGarden.status === "pending",
  };
};
