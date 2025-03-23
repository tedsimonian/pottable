import { Separator } from "@/components/ui/separator"
import { GardenPreferencesForm } from "@/components/settings/garden-preferences-form"

export default function GardenPreferencesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Garden Preferences</h3>
        <p className="text-sm text-muted-foreground">Customize your gardening experience and preferences</p>
      </div>
      <Separator />
      <GardenPreferencesForm />
    </div>
  )
}

