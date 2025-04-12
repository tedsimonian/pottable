import { AppSidebar } from "~/components/navigation/app-sidebar";
import { SiteHeader } from "~/components/navigation/site-header";

import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

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
