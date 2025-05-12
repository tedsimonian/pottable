"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { LOADING_PLANT_LOTTIE_URL } from "~/lib/constants";

export const LoadingAnimation = () => {
  return (
    <DotLottieReact
      src={LOADING_PLANT_LOTTIE_URL}
      autoplay
      loop
      style={{ width: "100px", height: "100px" }}
    />
  );
};
