import { api } from "~/trpc/react";

export const useCrop = () => {
  // Fetch a crop by ID (example usage)
  const fetchCrop = (id: string) => api.crop.read.useQuery(id);

  // Create a new crop
  const createCrop = api.crop.create.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  // Update a crop
  const updateCrop = api.crop.update.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  // Delete a crop
  const deleteCrop = api.crop.delete.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  return {
    fetchCrop,
    createCrop,
    updateCrop,
    deleteCrop,
  };
};
