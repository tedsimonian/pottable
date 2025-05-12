"use client";

import type { ProgressLevel } from "~/types/user-level";
import { getFormattedLevelTitle, getProgressFromXp } from "~/lib/user-level";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  UserLevelProgress,
  UserLevelProgressContained,
} from "../game/user-level-progress";

type NavUserLevelProgressProps = {
  userLevel: ProgressLevel;
};

export const NavUserLevelProgress = (props: NavUserLevelProgressProps) => {
  const { userLevel } = props;
  const { level, title, totalXp, currentXp } = userLevel;
  const { state } = useSidebar();

  const progress = getProgressFromXp(currentXp, totalXp);
  const formattedTitle = getFormattedLevelTitle(title, level);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {state === "collapsed" ? (
          <SidebarMenuButton
            tooltip={formattedTitle}
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-default"
          >
            <UserLevelProgressContained level={level} />
          </SidebarMenuButton>
        ) : (
          <UserLevelProgress title={formattedTitle} progress={progress} />
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
