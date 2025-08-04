import React from "react";
import animationData from "../../../public/lottie/loading_black.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

const BeatLoader = ({ height = 15, width = 75 }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ height, width }}
    />
  );
};
export default BeatLoader;
