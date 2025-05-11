import { Award } from "lucide-react";

import { Progress } from "../ui/progress";
import type { ProgressLevel } from "~/types/user-level";
import { getFormattedLevelTitle, getProgressFromXp } from "~/lib/user-level";

type UserLevelProgressProps = {
  userLevel: ProgressLevel;
};

const UserLevelProgress = (props: UserLevelProgressProps) => {
  const { userLevel } = props;
  const { level, title, totalXp, currentXp } = userLevel;
  const progress = getProgressFromXp(currentXp, totalXp);
  const formattedTitle = getFormattedLevelTitle(title, level);

  return (
    <div className="mt-auto">
      <div className="bg-primary/15 border-primary/20 rounded-lg border p-4 shadow-sm">
        <div className="mb-3 flex items-center space-x-3">
          <Award className="text-primary-dark h-5 w-5 flex-shrink-0" />
          <h3 className="font-display text-primary-dark font-medium">
            Garden Level
          </h3>
        </div>
        <Progress value={progress} className="mb-2 h-2.5" />
        <p className="text-primary-dark/90 text-sm font-medium">
          {formattedTitle}
        </p>
      </div>
    </div>
  );
};

export default UserLevelProgress;
