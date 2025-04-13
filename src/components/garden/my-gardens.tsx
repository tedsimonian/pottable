"use client";

import { GardenCard } from "./garden-card";

import mockGardens from "~/lib/mock-data/gardens.json";

export const MyGardens = () => {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockGardens.map((garden) => (
          <GardenCard key={garden.id} garden={garden} />
        ))}
      </div>
    </>
  );
};
