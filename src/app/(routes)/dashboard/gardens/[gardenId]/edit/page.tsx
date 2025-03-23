import { Separator } from "@/components/ui/separator"
import { EditGardenForm } from "@/components/gardens/edit-garden-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditGardenPage({
  params,
}: {
  params: { gardenId: string }
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/gardens/${params.gardenId}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to garden</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Garden</h1>
          <p className="text-muted-foreground">Update your garden details and growing conditions</p>
        </div>
      </div>
      <Separator />
      <EditGardenForm gardenId={params.gardenId} />
    </div>
  )
}

