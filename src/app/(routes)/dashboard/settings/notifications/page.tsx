import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "@/components/settings/notifications-form"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts</p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}

