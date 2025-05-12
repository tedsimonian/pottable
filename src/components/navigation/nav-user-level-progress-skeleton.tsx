import { SidebarMenuItem } from "../ui/sidebar";
import { SidebarMenu } from "../ui/sidebar";
import { UserLevelProgressSkeleton } from "../game/user-level-progress-skeleton";

export const NavUserLevelProgressSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserLevelProgressSkeleton />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
