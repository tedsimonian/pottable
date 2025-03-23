import { GardenDetail } from "@/components/gardens/garden-detail"

export default function GardenDetailPage({
  params,
}: {
  params: { gardenId: string }
}) {
  return <GardenDetail gardenId={params.gardenId} />
}

