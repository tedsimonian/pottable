import { ChevronsUpDown } from "lucide-react";

import { Skeleton } from "~/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar";

export const NavUserSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="grid flex-1 gap-1 text-left">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
