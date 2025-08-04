import Lottie from "lottie-react";
import React from "react";
import animationData from "../../../public/lottie/loading_black.json";

const MainLoader = () => {
  return (
    <div className="w-screen h-[100svh] flex items-center justify-center bg-light-app dark:bg-dark-app">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 100 }}
      />
    </div>
  );
};

export default MainLoader;
