"use client";

import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

export const CreateGardenButton = () => {
  return (
    <Button asChild>
      <Link href="/dashboard/gardens/new">
        <Plus className="mr-2 h-4 w-4" />
        New Garden
      </Link>
    </Button>
  );
};
