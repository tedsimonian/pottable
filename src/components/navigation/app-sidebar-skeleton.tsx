import * as React from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSkeleton,
} from "~/components/ui/sidebar";
import { NavUserSkeleton } from "./nav-user-skeleton";

export const AppSidebarSkeleton = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* Skeleton for LogoSidebar */}
        <div className="flex h-12 items-center gap-2 p-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-4">
        {/* Skeleton for NavMain */}
        <div>
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuSkeleton showIcon />
        </div>
        <div>
          <Skeleton className="mb-2 h-4 w-16 px-2" />
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuSkeleton showIcon />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUserSkeleton />
      </SidebarFooter>
    </Sidebar>
  );
};
