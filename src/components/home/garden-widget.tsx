import { Flower, Sprout, Droplet, Sun } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const GardenWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Garden Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Sprout className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Plants</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
              <Flower className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Varieties</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Droplet className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Water Needs</p>
              <p className="text-2xl font-bold">Medium</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <Sun className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Sun Exposure</p>
              <p className="text-2xl font-bold">Full Sun</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
