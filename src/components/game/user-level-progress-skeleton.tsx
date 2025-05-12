import { Award } from "lucide-react";

import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";

export const UserLevelProgressSkeleton = () => {
  return (
    <div className="mt-auto">
      <div className="bg-primary/15 border-primary/20 rounded-lg border p-4 shadow-sm">
        <div className="mb-3 flex items-center space-x-3">
          <Award className="text-primary-dark/50 h-5 w-5 flex-shrink-0" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Progress value={0} className="mb-2 h-2.5" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
