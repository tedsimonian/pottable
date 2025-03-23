import type React from "react"
import { SettingsSidebar } from "@/components/settings/settings-sidebar"
import { Separator } from "@/components/ui/separator"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Separator />
      <div className="flex flex-col gap-8 md:flex-row">
        <SettingsSidebar className="w-full md:w-1/4" />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}

