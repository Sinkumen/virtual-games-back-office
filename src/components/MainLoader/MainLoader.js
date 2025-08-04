import React from "react";
import animationData from "../../../public/lottie/loading_black.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
});

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
