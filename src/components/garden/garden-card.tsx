import { useState } from "react";
import {
  FlowerIcon,
  MoreHorizontal,
  Pencil,
  Trash2,
  Sun,
  Droplet,
  Ruler,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gardenToDelete, setGardenToDelete] = useState<string | null>(null);

  const handleDeleteClick = (gardenId: string) => {
    setGardenToDelete(gardenId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (gardenToDelete) {
      setDeleteDialogOpen(false);
      setGardenToDelete(null);
    }
  };

  return (
    <>
      <Card
        key={garden.id}
        className="flex h-full flex-col overflow-hidden p-0"
      >
        <CardContent className="flex-1 p-6">
          <div className="flex h-full flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="truncate font-medium">{garden.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard/gardens/${garden.id}/edit`}
                      className="flex items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Garden
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDeleteClick(garden.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Garden
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-muted-foreground line-clamp-2 text-sm">
              {garden.description}
            </p>

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
                  <span className="font-medium">{garden.activeCrops}</span>{" "}
                  Crops
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-muted/50 p-6">
          <div className="flex w-full justify-between">
            <Button variant="default" size="sm" asChild>
              <Link href={`/dashboard/gardens/${garden.id}`}>View Garden</Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/gardens/${garden.id}/plots/new`}>
                Add Plot
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this garden and all its plots and
              crops. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
