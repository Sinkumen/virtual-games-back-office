import React from "react";
import animationData from "../../../public/loading.json";
import Lottie from "lottie-react";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";

const AppButton = ({
  children,
  fullWidth,
  className,
  loading,
  onClick,
  bgColor,
  textColor,
  dense,
  disabled,
  outlined,
  icon,
  type = "button",
}) => {
  const { user } = useUserContext() || {};
  const isCashier = user?.role === "cashier";

  const bg = bgColor ? bgColor : isCashier ? "bg-game-primary" : "bg-primary";
  const text = textColor ? textColor : outlined ? "text-primary" : "text-white";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`block ${fullWidth && "w-full"}  ${
        !dense ? "p-3" : "p-2"
      } rounded-md relative overflow-clip ${disabled && "opacity-50"}  ${
        !disabled && "cursor-pointer"
      } ${bg} ${text} ${className}  ${
        outlined
          ? "border-[1px] bg-transparent border-primary dark:text-dark-text dark:border-dark-card-light"
          : ""
      } `}
    >
      {loading ? (
        <>
          <Lottie
            animationData={animationData}
            loop={true}
            className="absolute top-0 bottom-0 mx-auto my-auto left-0 right-0"
            style={{ height: 100 }}
          />
          <div className="invisible">{children}</div>
        </>
      ) : (
        <div className="flex justify-center gap-2 items-center w-full ">
          {icon}
          <div className="flex-grow">{children}</div>
        </div>
      )}
    </button>
  );
};

export default AppButton;
