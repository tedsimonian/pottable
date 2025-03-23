import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/settings/profile-form"

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the platform</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

