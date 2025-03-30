import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export default async function AdminPage() {
  const users = await authClient.admin.listUsers({
    query: {
      limit: 10,
    },
  });

  console.log(users);

  const handleUpdateRole = async (userId: string, role: string) => {
    await authClient.admin.setRole({
      userId: userId,
      role: role,
    });
  };

  const handleBanUser = async (userId: string) => {
    await authClient.admin.banUser({
      userId: userId,
      banReason: "Spamming", // Optional (if not provided, the default ban reason will be used - No reason)
      banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="users-list">
        {users.data?.users.map((user) => (
          <div key={user.id} className="user-item">
            <span>
              {user.name} ({user.email})
            </span>
            <Button
              onClick={() =>
                handleUpdateRole(
                  user.id,
                  user.role === "ADMIN" ? "USER" : "ADMIN",
                )
              }
            >
              Toggle Admin
            </Button>
            <Button onClick={() => handleBanUser(user.id)}>Ban User</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
