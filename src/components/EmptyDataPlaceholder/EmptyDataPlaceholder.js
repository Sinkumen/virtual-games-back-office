import Lottie from "lottie-react";
import React from "react";
import animationData from "../../../public/lottie/emptyData.json";

const EmptyDataPlaceholder = ({
  large,
  title = "Empty",
  description = "No data is found at the moment.",
}) => {
  return (
    <div className="flex flex-col w-full justify-center items-center p-4">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: large ? 300 : 200 }}
      />

      <p className={`font-urbanist-bold text-[${large ? "25px" : "20px"}]`}>
        {title}
      </p>

      <p className="font-urbanist-light">{description}</p>
    </div>
  );
};

export default EmptyDataPlaceholder;
