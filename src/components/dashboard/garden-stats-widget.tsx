import { Sprout, Leaf, ThermometerSun, AlertTriangle } from "lucide-react";

import { StatCard } from "~/components/common/stat-card";
import type { Stat } from "~/types/analytics";

export const GardenStatsWidget = () => {
  const plantCount = 10;
  const taskCount = 20;
  const readyToHarvestCount = 30;
  const needsAttentionCount = 40;

  const stats: Stat[] = [
    {
      label: "Plants",
      value: plantCount,
      icon: <Sprout className="h-5 w-5 text-green-500" />,
      color: "border-green-500",
      delay: 0.1,
    },
    {
      label: "Tasks",
      value: taskCount,
      icon: <Leaf className="h-5 w-5 text-lime-500" />,
      color: "border-lime-500",
      delay: 0.2,
    },
    {
      label: "Ready to Harvest",
      value: readyToHarvestCount,
      icon: <ThermometerSun className="h-5 w-5 text-blue-500" />,
      color: "border-blue-500",
      delay: 0.3,
    },
    {
      label: "Needs Attention",
      value: needsAttentionCount,
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      color: "border-amber-500",
      delay: 0.4,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={`${stat.label}-${stat.value}`} {...stat} />
      ))}
    </div>
  );
};
