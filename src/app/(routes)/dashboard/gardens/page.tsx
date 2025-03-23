import { GardensList } from "@/components/gardens/gardens-list"
import { CreateGardenButton } from "@/components/gardens/create-garden-button"
import { Separator } from "@/components/ui/separator"

export default function GardensPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Gardens</h1>
          <p className="text-muted-foreground">Manage your gardens and growing spaces</p>
        </div>
        <CreateGardenButton />
      </div>
      <Separator />
      <GardensList />
    </div>
  )
}

