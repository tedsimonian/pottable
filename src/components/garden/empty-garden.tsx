import { Flower2 } from "lucide-react";

import { Button } from "~/components/ui/button";
import { InternalLink } from "~/components/common/internal-link";

import { cn } from "~/lib/utils";

type EmptyGardenProps = {
  className?: string;
};

export const EmptyGarden = (props: EmptyGardenProps) => {
  const { className } = props;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      <div className="bg-muted mb-4 rounded-full p-6">
        <Flower2 className="text-primary size-16" />
      </div>
      <h3 className="text-foreground mb-1 text-lg font-medium">
        No gardens yet
      </h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        Create your first garden to start planning and tracking your plants
      </p>
      <Button asChild>
        <InternalLink path="create_garden" params={null}>
          Create Garden
        </InternalLink>
      </Button>
    </div>
  );
};
