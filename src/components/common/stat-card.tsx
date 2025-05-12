import { motion } from "motion/react";

import { Card, CardContent } from "~/components/ui/card";
import { AnimatedCount } from "~/components/ui/animated-count";
import { cn } from "~/lib/utils";
import type { Stat } from "~/types/analytics";

type StatCardProps = Stat;

export const StatCard = (props: StatCardProps) => {
  const { label, value, icon, color, delay } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        className={`border-t-4 shadow-md ${color} relative overflow-hidden`}
      >
        {/* Decorative background pattern - unique to each stat card */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L100,0 L100,100 Z"
              fill="currentColor"
              className={color.replace("border-", "text-")}
            />
          </svg>
        </div>

        <CardContent className="relative z-10 p-4">
          <div className="mb-2 flex items-center">
            <div
              className={cn(
                "bg-opacity-20 mr-2 flex h-8 w-8 items-center justify-center rounded-full",
                color,
              )}
            >
              {icon}
            </div>
            <h3 className="text-neutral-earth text-sm font-medium">{label}</h3>
          </div>
          <div className="flex items-end justify-between">
            <div className="font-display text-3xl font-bold">
              <AnimatedCount
                value={value}
                animateProps={{
                  duration: 2,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
