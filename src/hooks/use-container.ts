import { api } from "~/trpc/react";

export const useContainer = () => {
  // Fetch a container by ID (example usage)
  const fetchContainer = (id: string) => api.container.read.useQuery(id);

  // Create a new container
  const createContainer = api.container.create.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  // Update a container
  const updateContainer = api.container.update.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  // Delete a container
  const deleteContainer = api.container.delete.useMutation({
    onSuccess: () => {
      // Invalidate queries or refetch data as needed
    },
  });

  return {
    fetchContainer,
    createContainer,
    updateContainer,
    deleteContainer,
  };
};
