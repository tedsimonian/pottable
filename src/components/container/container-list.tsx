import React from "react";
import { useContainer } from "~/hooks/use-container";

const ContainerList = () => {
  const { fetchContainer } = useContainer();
  const { data, isLoading, error } = fetchContainer("container-id");

  if (isLoading) return <div>{"Loading..."}</div>;
  if (error) return <div>{"Error loading containers"}</div>;

  return (
    <div>
      {data && data.success && (
        <div key={data.data.id}>
          <h3>{data.data.type}</h3>
          <p>
            {"Volume: "} {data.data.volume}
          </p>
          {/* Additional container details */}
        </div>
      )}
    </div>
  );
};

export default ContainerList;
