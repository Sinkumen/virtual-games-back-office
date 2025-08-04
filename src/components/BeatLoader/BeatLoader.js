import Lottie from "lottie-react";
import React from "react";
import animationData from "../../../public/lottie/loading_black.json";

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
