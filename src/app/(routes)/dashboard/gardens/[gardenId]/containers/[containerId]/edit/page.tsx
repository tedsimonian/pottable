import { Separator } from "@/components/ui/separator"
import { EditContainerForm } from "@/components/containers/edit-container-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditContainerPage({
  params,
}: {
  params: { gardenId: string; containerId: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/gardens/${params.gardenId}/containers/${params.containerId}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to container</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Container</h1>
          <p className="text-muted-foreground">Update your container details and growing conditions</p>
        </div>
      </div>
      <Separator />
      <EditContainerForm gardenId={params.gardenId} containerId={params.containerId} />
    </div>
  )
}

