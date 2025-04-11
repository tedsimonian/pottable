import type React from "react";
import { AppSidebar } from "~/components/navigation/app-sidebar";
import { SiteHeader } from "~/components/navigation/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="@container/main">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
