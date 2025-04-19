"use client";

import { GardenCard } from "./garden-card";
import { Query } from "../common/query";

import { useMyGardens } from "~/hooks";
import { EmptyGarden } from "./empty-garden";

export const MyGardens = () => {
  const { gardens, isLoading, error } = useMyGardens();

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Query
          data={gardens}
          loading={isLoading}
          error={error}
          fallbackComponent={<EmptyGarden />}
        >
          {(gardens) => {
            return gardens.map((garden) => (
              <GardenCard key={garden.id} garden={garden} />
            ));
          }}
        </Query>
      </div>
    </>
  );
};
