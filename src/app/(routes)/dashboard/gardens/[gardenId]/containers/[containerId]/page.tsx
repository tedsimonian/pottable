import { ContainerHeader } from "@/components/containers/container-header"
import { CropSelection } from "@/components/containers/crop-selection"
import { ContainerDetails } from "@/components/containers/container-details"
import { Separator } from "@/components/ui/separator"

export default function ContainerDetailPage({
  params,
}: {
  params: { gardenId: string; containerId: string }
}) {
  return (
    <div className="space-y-6">
      <ContainerHeader gardenId={params.gardenId} containerId={params.containerId} />
      <div className="grid gap-6 md:grid-cols-2">
        <ContainerDetails containerId={params.containerId} />
        <CropSelection containerId={params.containerId} />
      </div>
      <Separator />
    </div>
  )
}

