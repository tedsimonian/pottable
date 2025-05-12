"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Camera, PlusCircle } from "lucide-react";

import { Button } from "~/components/ui/button";
import { InternalLink } from "~/components/common/internal-link";

import { cn } from "~/lib/utils";
import { EMPTY_GARDEN_LOTTIE_URL } from "~/lib/constants";

type EmptyGardenProps = {
  className?: string;
};

export const EmptyGarden = (props: EmptyGardenProps) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <DotLottieReact
        src={EMPTY_GARDEN_LOTTIE_URL}
        autoplay
        loop
        style={{ width: "100px", height: "100px" }}
      />
      <h3 className="text-foreground mb-1 text-lg font-medium">
        {"No gardens yet"}
      </h3>
      <p className="text-muted-foreground mb-4 max-w-md">
        {
          "Start by creating your first garden. You can take a photo of your garden or set up a new garden from scratch."
        }
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          disabled
          // onClick={() => setIsCameraModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          {"Take Garden Photo"}
        </Button>
        <Button variant="outline" asChild>
          <InternalLink path="create_garden" params={null}>
            <PlusCircle className="h-4 w-4" />
            {"Create First Garden"}
          </InternalLink>
        </Button>
      </div>
    </div>
  );
};
