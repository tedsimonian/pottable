"use client";

import * as React from "react";
import {
  Calendar,
  Flower2,
  ListTodo,
  Flower,
  Book,
  Medal,
  LayoutDashboard,
} from "lucide-react";

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

import { Query } from "../common/query";
import { getInternalRoute } from "~/lib/internal-routes";
import { authClient } from "~/lib/auth-client";
import { NavUserSkeleton } from "./nav-user-skeleton";
import { useUserLevel } from "~/hooks";
import { NavUserLevelProgressSkeleton } from "./nav-user-level-progress-skeleton";
import { NavUserLevelProgress } from "./nav-user-level-progress";

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
      {
        title: "Achievements",
        url: getInternalRoute("view_achievements", null),
        icon: Medal,
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "Plant Catalog",
        url: getInternalRoute("view_plant_catalog", null),
        icon: Flower,
      },
      {
        title: "Garden Guide",
        url: getInternalRoute("view_garden_guide", null),
        icon: Book,
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
          loadingComponent={<NavUserLevelProgressSkeleton />}
          fallbackComponent={<NavUserLevelProgressSkeleton />}
        >
          {(userLevel) => <NavUserLevelProgress userLevel={userLevel} />}
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
