"use client";

import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { InternalLink } from "../common/internal-link";

export const CreateGardenButton = () => {
  return (
    <Button asChild>
      <InternalLink path="create_garden" params={null}>
        <Plus className="mr-2 h-4 w-4" />
        {"New Garden"}
      </InternalLink>
    </Button>
  );
};
