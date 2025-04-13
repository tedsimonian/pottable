import { Cloud, CloudRain, Sun } from "lucide-react";

export const weatherData = {
  location: "New York, NY",
  temperature: 72,
  condition: "Partly Cloudy",
  humidity: 65,
  forecast: [
    { day: "Today", temp: 72, icon: Sun },
    { day: "Tomorrow", temp: 68, icon: Cloud },
    { day: "Wed", temp: 65, icon: CloudRain },
  ],
};
