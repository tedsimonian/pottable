import type React from "react";
import { DashboardSidebar } from "~/components/dashboard/siderbar";
import { DashboardHeader } from "~/components/dashboard/header";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-white">
        <DashboardHeader />
        <div className="relative flex w-full flex-1">
          <DashboardSidebar />
          <main className="w-full flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl p-3 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
