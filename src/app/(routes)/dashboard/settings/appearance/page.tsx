import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "@/components/settings/appearance-form"

export default function AppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">Customize the appearance of the application</p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  )
}

