"use client";

import { api } from "~/trpc/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

const AdminPage = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const { data: users, isLoading } = api.admin.listUsers.useQuery({
    limit,
    offset: page * limit,
  });

  const utils = api.useUtils();

  const updateRoleMutation = api.admin.updateUserRole.useMutation({
    onSuccess: () => {
      toast.success("User role updated successfully");
      // Invalidate the users query to refresh the list
      void utils.admin.listUsers.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const banUserMutation = api.admin.banUser.useMutation({
    onSuccess: () => {
      toast.success("User banned successfully");
      void utils.admin.listUsers.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="users-list">
        {users?.data?.users?.map((user) => (
          <div key={user.id} className="user-item">
            <span>
              {user.name} ({user.email})
            </span>
            <Button
              onClick={() =>
                updateRoleMutation.mutate({
                  userId: user.id,
                  role: user.role === "ADMIN" ? "USER" : "ADMIN",
                })
              }
            >
              Toggle Admin
            </Button>
            <Button
              onClick={() =>
                banUserMutation.mutate({
                  userId: user.id,
                  banReason: "Violation of terms",
                })
              }
            >
              Ban User
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
