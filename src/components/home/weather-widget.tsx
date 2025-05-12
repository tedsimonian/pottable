import { Cloud, CloudRain, Sun, Thermometer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const WeatherWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{"Local Weather"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 text-center">
          <div className="mb-2 flex justify-center">
            <Sun className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold">{"72°F"}</h3>
          <p className="text-primary text-sm">{"Sunny"}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-gray-50 p-2">
            <div className="mb-1 flex justify-center">
              <CloudRain className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-primary-foreground text-xs font-medium">
              {"30%"}
            </p>
            <p className="text-primary-foreground text-xs">{"Rain"}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-2">
            <div className="mb-1 flex justify-center">
              <Thermometer className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-primary-foreground text-xs font-medium">
              {"75°F"}
            </p>
            <p className="text-primary-foreground text-xs">{"High"}</p>
          </div>

          <div className="rounded-lg bg-gray-50 p-2">
            <div className="mb-1 flex justify-center">
              <Cloud className="text-primary-foreground h-5 w-5" />
            </div>
            <p className="text-primary-foreground text-xs font-medium">
              {"5 mph"}
            </p>
            <p className="text-primary-foreground text-xs">{"Wind"}</p>
          </div>
        </div>

        <div className="text-primary mt-3 text-center text-xs">
          {"Perfect day for gardening!"}
        </div>
      </CardContent>
    </Card>
  );
};
