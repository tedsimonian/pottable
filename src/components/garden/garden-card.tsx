import { useState } from "react";
import { FlowerIcon, Sun, Droplet, Ruler, Users } from "lucide-react";

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

type GardenCardProps = {
  garden: {
    id: string;
    name: string;
    description: string;
    gardenType: string;
    sunExposure: string;
    waterAccess: string;
    windExposure: string;
    soilType: string;
    spaceWidth: number;
    spaceLength: number;
    isShared: boolean;
    plotsCount: number;
    activeCrops: number;
    createdAt: string;
  };
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
          id: garden.id,
        },
      },
    },
    {
      id: "delete",
      text: "Delete",
      className: "text-destructive",
      button: {
        onClick: (data) => handleDeleteClick(data.id),
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
    <Card key={garden.id} className="flex h-full flex-col overflow-hidden p-0">
      <CardHeader className="p-6">
        <CardTitle className="text-primary flex items-center justify-between truncate font-medium">
          {garden.name}
          <div className="flex items-center justify-between">
            <EllipsisDropdownMenu data={garden} actions={gardenCardActions} />
          </div>
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
          {garden.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-6">
        <div className="flex h-full flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FlowerIcon className="h-3 w-3" />
              {garden.gardenType.charAt(0).toUpperCase() +
                garden.gardenType.slice(1)}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              <Sun className="h-3 w-3 text-yellow-500" />
              {garden.sunExposure === "full"
                ? "Full Sun"
                : garden.sunExposure === "partial"
                  ? "Partial Sun"
                  : "Shade"}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              <Ruler className="h-3 w-3" />
              {garden.spaceWidth} × {garden.spaceLength} ft
            </Badge>

            {garden.isShared && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Shared
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-md border p-2">
              <FlowerIcon className="text-primary h-4 w-4" />
              <div className="text-sm">
                <span className="font-medium">{garden.plotsCount}</span> Plots
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-md border p-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="font-medium">{garden.activeCrops}</span> Crops
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/50 p-6">
        <div className="flex w-full justify-between">
          <Button variant="default" size="sm" asChild>
            <InternalLink path="view_garden" params={{ id: garden.id }}>
              View Garden
            </InternalLink>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <InternalLink
              path="create_container"
              params={{ gardenId: garden.id }}
            >
              Add Plot
            </InternalLink>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
