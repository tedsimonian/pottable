import { Plus } from "lucide-react";

import { InternalLink } from "~/components/common/internal-link";
import { SectionHeading } from "~/components/common/section-heading";
import { CurrentWeatherWidget } from "~/components/dashboard/current-weather-widget";
import { GardenListWidget } from "~/components/dashboard/garden-list-widget";
import { Button } from "~/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6">
      <SectionHeading
        title="Welcome to Pottable"
        description="Your AI-powered gardening assistant is ready to help you grow"
        actions={
          <Button asChild className="whitespace-nowrap">
            <InternalLink path="create_garden" params={null}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Garden
            </InternalLink>
          </Button>
        }
      />
      {/* Updated layout for responsive design */}
      <div className="grid w-full gap-6">
        {/* First row: Gardens (2/3) and Weather (1/3) on small screens and up */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Gardens takes 2/3 width on small screens and up */}
          <div className="h-full sm:col-span-2">
            <GardenListWidget />
          </div>

          {/* Weather takes 1/3 width on small screens and up */}
          <div className="sm:col-span-1">
            <CurrentWeatherWidget />
          </div>
        </div>

        {/* Second row: Tasks at full width */}
        <div className="w-full">{/* <TasksListWidget /> */}</div>
      </div>
    </div>
  );
}
