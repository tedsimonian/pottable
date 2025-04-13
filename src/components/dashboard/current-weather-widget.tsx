"use client";

import { CloudRain, Sun, Thermometer } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { weatherData } from "~/lib/mock-data/weather";

export const CurrentWeatherWidget = () => {
  return (
    <Card className="bg-primary-foreground h-full w-full overflow-hidden border-none">
      <CardHeader>
        <CardTitle className="text-primary">Local Weather</CardTitle>
        <CardDescription>{weatherData.location}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-evenly">
          <div className="flex items-center gap-2">
            <Sun className="text-garden-yellow h-10 w-10" />
            <div className="text-3xl font-bold">
              {weatherData.temperature}°F
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{weatherData.condition}</div>
            <div className="text-muted-foreground flex items-center justify-end gap-1 text-sm">
              <Thermometer className="h-3 w-3" />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {weatherData.forecast.map((day) => (
            <div
              key={day.day}
              className="bg-primary-foreground bg-opacity-10 flex flex-col items-center rounded-md p-2"
            >
              <span className="text-sm font-medium">{day.day}</span>
              <day.icon
                className={`my-1 h-5 w-5 ${
                  day.icon === Sun
                    ? "text-yellow-500"
                    : day.icon === CloudRain
                      ? "text-blue-500"
                      : "text-gray-400"
                }`}
              />
              <span className="text-sm">{day.temp}°</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
