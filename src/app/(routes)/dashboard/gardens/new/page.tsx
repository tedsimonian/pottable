import { Separator } from "@/components/ui/separator"
import { CreateGardenForm } from "@/components/gardens/create-garden-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewGardenPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/gardens">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to gardens</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Garden</h1>
          <p className="text-muted-foreground">
            Set up a new garden space with details for personalized recommendations
          </p>
        </div>
      </div>
      <Separator />
      <CreateGardenForm />
    </div>
  )
}

