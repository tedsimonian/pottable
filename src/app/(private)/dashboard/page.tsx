"use client";

import { Plus } from "lucide-react";

import { InternalLink } from "~/components/common/internal-link";
import { SectionHeading } from "~/components/common/section-heading";
import { GardenStatsWidget } from "~/components/dashboard/garden-stats-widget";
import { MyGardenWidget } from "~/components/dashboard/my-garden-widget";
import { Button } from "~/components/ui/button";

import { authClient } from "~/lib/auth-client";
import { getGreeting } from "~/lib/utils";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const { user } = session ?? {};

  const isGardenSetup = false;

  const title = getGreeting(user?.name);
  const description = `Your garden is ${isGardenSetup ? "thriving" : "waiting to be started"}! 🌱`;

  return (
    <div className="w-full space-y-6">
      <SectionHeading
        title={title}
        description={description}
        actions={
          <Button asChild className="whitespace-nowrap">
            <InternalLink path="create_garden" params={null}>
              <Plus className="mr-2 h-4 w-4" />
              {"Create New Garden"}
            </InternalLink>
          </Button>
        }
      />
      <section>
        <GardenStatsWidget />
      </section>
      <section>
        <MyGardenWidget />
      </section>
    </div>
  );
}
