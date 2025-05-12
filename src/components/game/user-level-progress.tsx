import { Award } from "lucide-react";

import { Progress } from "../ui/progress";

type UserLevelProgressProps = {
  title: string;
  progress: number;
};

export const UserLevelProgress = (props: UserLevelProgressProps) => {
  const { title, progress } = props;

  return (
    <div className="mt-auto">
      <div className="bg-primary/15 border-primary/20 rounded-lg border p-4 shadow-sm">
        <div className="mb-3 flex items-center space-x-3">
          <Award className="text-primary-dark h-5 w-5 flex-shrink-0" />
          <h3 className="font-display text-primary-dark font-medium">
            {"Garden Level"}
          </h3>
        </div>
        <Progress value={progress} className="mb-2 h-2.5" />
        <p className="text-primary-dark/90 text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

type UserLevelProgressContainedProps = {
  level: number;
};

export const UserLevelProgressContained = (
  props: UserLevelProgressContainedProps,
) => {
  const { level } = props;

  return (
    <div className="flex h-8 w-8 flex-col items-center justify-center">
      <Award className="text-primary-dark mb-1 h-6 w-6" />
      <span className="font-display text-primary-dark text-xs font-bold">
        {"Lv "}
        {level}
      </span>
    </div>
  );
};
