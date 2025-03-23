import { Separator } from "@/components/ui/separator"
import { SubscriptionSettings } from "@/components/settings/subscription-settings"

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Subscription</h3>
        <p className="text-sm text-muted-foreground">Manage your subscription and billing</p>
      </div>
      <Separator />
      <SubscriptionSettings />
    </div>
  )
}

