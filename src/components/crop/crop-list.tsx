import React from "react";
import { useCrop } from "~/hooks/use-crop";

const CropList = () => {
  const { fetchCrop } = useCrop();
  const { data, isLoading, error } = fetchCrop("crop-id");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading crops</div>;

  return (
    <div>
      {data && data.success && (
        <div key={data.data.id}>
          <h3>{data.data.name}</h3>
          <p>Variety: {data.data.variety}</p>
          {/* Additional crop details */}
        </div>
      )}
    </div>
  );
};

export default CropList;
