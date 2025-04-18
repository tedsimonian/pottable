"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { GardenCard } from "~/components/garden/garden-card";
import { InternalLink } from "../common/internal-link";

import mockGardens from "~/lib/mock-data/gardens.json";
import { cn } from "~/lib/utils";

type GardenListWidgetProps = {
  maxGardens?: number;
  className?: string;
};

export const GardenListWidget = (props: GardenListWidgetProps) => {
  const { maxGardens = 2, className } = props;

  const filteredGardens = mockGardens.slice(0, maxGardens);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Gardens</h2>
        <Button variant="outline" size="sm" asChild>
          <InternalLink path="view_all_gardens" params={null}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </InternalLink>
        </Button>
      </div>

      <div className={`grid gap-4 sm:grid-cols-${maxGardens}`}>
        {filteredGardens.map((garden) => (
          <GardenCard key={garden.id} garden={garden} />
        ))}
      </div>
    </div>
  );
};
