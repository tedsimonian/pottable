"use client";

import dynamic from "next/dynamic";

import { SiteHeader } from "~/components/navigation/site-header";
import { AppSidebarSkeleton } from "~/components/navigation/app-sidebar-skeleton";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

const AppSidebar = dynamic(
  () =>
    import("~/components/navigation/app-sidebar").then((mod) => mod.AppSidebar),
  {
    ssr: false,
    loading: () => <AppSidebarSkeleton />,
  },
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
