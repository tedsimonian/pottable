"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CreateContainerButton({ gardenId }: { gardenId: string }) {
  return (
    <Button asChild>
      <Link href={`/dashboard/gardens/${gardenId}/containers/new`}>
        <Plus className="mr-2 h-4 w-4" />
        New Container
      </Link>
    </Button>
  )
}

