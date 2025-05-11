"use client";

import * as React from "react";
import { Calendar, Flower2, LayoutDashboard, ListTodo } from "lucide-react";

import { NavMain, type NavGroup } from "~/components/navigation/nav-main";
import { NavUser } from "~/components/navigation/nav-user";
import { LogoSidebar } from "~/components/navigation/logo-sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import UserLevelProgressSkeleton from "../game/user-level-progress-skeleton";
import { getInternalRoute } from "~/lib/internal-routes";
import { authClient } from "~/lib/auth-client";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { Query } from "../common/query";
import UserLevelProgress from "../game/user-level-progress";
import { useUserLevel } from "~/hooks";

const navGroups = [
  {
    title: null,
    items: [
      {
        title: "Dashboard",
        url: getInternalRoute("dashboard", null),
        icon: LayoutDashboard,
      },
      {
        title: "My Gardens",
        url: getInternalRoute("view_all_gardens", null),
        icon: Flower2,
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Calendar",
        url: getInternalRoute("view_calendar", null),
        icon: Calendar,
      },
      {
        title: "Tasks",
        url: getInternalRoute("view_tasks", null),
        icon: ListTodo,
      },
    ],
  },
] satisfies NavGroup[];

export const AppSidebar = (props: React.ComponentProps<typeof Sidebar>) => {
  const { data: session } = authClient.useSession();
  const { user } = session ?? {};
  const { userLevel, isLoading, error } = useUserLevel();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <Query
          data={userLevel}
          loading={isLoading}
          error={error}
          loadingComponent={<UserLevelProgressSkeleton />}
          fallbackComponent={<UserLevelProgressSkeleton />}
        >
          {(userLevel) => <UserLevelProgress userLevel={userLevel} />}
        </Query>
        <Query
          data={user}
          loading={false}
          error={null}
          loadingComponent={<NavUserSkeleton />}
          fallbackComponent={<NavUserSkeleton />}
        >
          {(user) => <NavUser user={user} />}
        </Query>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
