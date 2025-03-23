import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-white">
        <DashboardHeader className="sticky top-0 z-10" />
        <div className="flex flex-1 w-full relative">
          <DashboardSidebar />
          <main className="flex-1 w-full overflow-y-auto">
            <div className="mx-auto max-w-7xl p-3 md:p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

