import { Separator } from "@/components/ui/separator"
import { HelpAndSupport } from "@/components/help/help-and-support"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Get help with using Pottable and contact our support team</p>
      </div>
      <Separator />
      <HelpAndSupport />
    </div>
  )
}

