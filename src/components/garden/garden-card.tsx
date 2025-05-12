"use client";

import { useState } from "react";
import { FlowerIcon, MapPin, Ruler } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

import {
  EllipsisDropdownMenu,
  type ActionType,
} from "../common/ellipsis-dropdown-menu";
import { InternalLink } from "../common/internal-link";

import type { Garden } from "~/generated/prisma-client";

type GardenCardProps = {
  garden: Garden;
};

export const GardenCard = (props: GardenCardProps) => {
  const { garden } = props;

  const [gardenToDelete, setGardenToDelete] = useState<string | null>(null);

  const handleDeleteClick = (gardenId: string) => {
    setGardenToDelete(gardenId);
  };

  const handleDeleteConfirm = () => {
    if (gardenToDelete) {
      setGardenToDelete(null);
    }
  };

  const gardenCardActions: Array<ActionType<typeof garden>> = [
    {
      id: "edit",
      text: "Edit",
      divider: true,
      link: {
        path: "edit_garden" as const,
        params: {
          id: garden.id.toString(),
        },
      },
    },
    {
      id: "delete",
      text: "Delete",
      className: "text-destructive",
      button: {
        onClick: (data) => handleDeleteClick(data.id.toString()),
        confirmation: {
          enabled: true,
          title: "Delete Garden",
          description:
            "This will permanently delete this garden and all its plots and crops. This action cannot be undone.",
          actions: [
            {
              text: "Delete",
              onClick: () => handleDeleteConfirm(),
              className:
                "bg-destructive text-destructive-foreground hover:bg-destructive/50",
            },
          ],
        },
      },
    },
  ] satisfies ActionType<typeof garden>[];

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <CardHeader className="space-y-2 pt-6">
        <CardTitle className="text-primary flex items-center justify-between truncate font-medium">
          {garden.name}
          <EllipsisDropdownMenu data={garden} actions={gardenCardActions} />
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2 min-h-[2.5rem] text-sm">
          {garden.description ?? "No description provided"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2">
        <div className="flex min-h-[2rem] flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <FlowerIcon className="h-3 w-3" />
            {garden.gardenType
              ? garden.gardenType.charAt(0).toUpperCase() +
                garden.gardenType.slice(1)
              : "No Type"}
          </Badge>

          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {garden.location ?? "No Location"}
          </Badge>

          <Badge variant="outline" className="flex items-center gap-1">
            <Ruler className="h-3 w-3" />
            {garden.sizeSqFeet
              ? `${garden.sizeSqFeet.toString()} sq ft`
              : "No Size"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-md border p-3">
            <FlowerIcon className="text-primary h-4 w-4" />
            <div className="text-sm">
              <span className="font-medium">0</span> {"Containers"}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border p-3">
            <FlowerIcon className="h-4 w-4 text-green-500" />
            <div className="text-sm">
              <span className="font-medium">0</span> {"Crops"}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-6">
        <div className="flex w-full items-center justify-between gap-4">
          <Button variant="default" size="sm" asChild>
            <InternalLink
              path="view_garden"
              params={{ id: garden.id.toString() }}
            >
              {"View Garden"}
            </InternalLink>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <InternalLink
              path="create_container"
              params={{ gardenId: garden.id.toString() }}
            >
              {"Add Container"}
            </InternalLink>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
