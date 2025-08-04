import AppButton from "@/components/AppButton";
import { getBingoLetter } from "@/utils/game";
import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/20/solid";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const getColor = (number) => {
  if (number >= 1 && number <= 15) {
    return ["#00ACFF", "#0566FF"]; // Blue gradient
  } else if (number >= 16 && number <= 30) {
    return ["#FDDC00", "#FE9300"]; // Yellow-Orange gradient
  } else if (number >= 31 && number <= 45) {
    return ["#0ABD05", "#058604"]; // Green gradient
  } else if (number >= 46 && number <= 60) {
    return ["#FB2223", "#D1060A"]; // Red gradient
  } else if (number >= 61 && number <= 75) {
    return ["#804693", "#683390"]; // Purple gradient
  } else {
    return ["#1E2938", "#1E2938"];
  }
};

const NumberDrawBall = ({
  selectedNumber,
  isPaused,
  isStarted,
  currentGame,
}) => {
  const [gradientStart, gradientEnd] = getColor(selectedNumber);
  return (
    <div className="rounded-xl px-10 bg-secondary justify-center gap-2">
      <div className="flex items-center justify-center h-full">
        <div className="flex-1 relative w-[10vw] md:w-[12vw] lg:w-[13vw] 2xl:w-[15vw] h-[10vw] md:h-[12vw] lg:h-[13vw] 2xl:h-[15vw] aspect-square mx-auto my-5 bg-gray-100 rounded-full">
          <CustomCircularProgress
            key={selectedNumber}
            selectedNumber={selectedNumber}
            isPaused={isPaused}
            isStarted={isStarted}
            duration={currentGame?.delaySeconds}
          />

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8vw]  md:w-[10vw] lg:w-[11vw] 2xl:w-[13vw] h-[8vw] md:h-[10vw] lg:h-[11vw] 2xl:h-[13vw] rounded-full border-[2px]`}
            style={{ borderColor: gradientStart }}
          />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {selectedNumber ? (
              <div>
                <p
                  className={`text-[1.5em] xl:text-[3em] font-black text-center text-transparent bg-gradient-to-b from-[${
                    getColor(selectedNumber)[0]
                  }] to-[${
                    getColor(selectedNumber)[1]
                  }] bg-clip-text uppercase m-0 p-0 leading-[1]`}
                >
                  {getBingoLetter(selectedNumber)}
                </p>
                <p
                  className={`text-[2em] xl:text-[4em] 2xl:text-[5em] font-black text-center text-transparent bg-gradient-to-b from-[${
                    getColor(selectedNumber)[0]
                  }] to-[${
                    getColor(selectedNumber)[1]
                  }] bg-clip-text leading-[1]`}
                >
                  {selectedNumber}
                </p>
              </div>
            ) : (
              <Image
                src={"/black_logo.svg"}
                width={50}
                height={50}
                alt="Logo"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomCircularProgress = ({ isPaused, selectedNumber, duration = 3 }) => {
  const [progress, setProgress] = useState(0);
  const interval = useRef(null);

  const [startColor, endColor] = getColor(selectedNumber);

  useEffect(() => {
    if (progress >= 100 || isPaused) {
      clearInterval(interval.current);
      return;
    }

    const increment = 100 / (duration * 10); // Dynamic increment per 100ms interval

    interval.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100)); // Ensure it stops at 100
    }, 100);

    return () => clearInterval(interval.current);
  }, [isPaused, duration]); // Depend on `duration` for dynamic timing

  return (
    <div className="relative w-[10vw] md:w-[12vw] lg:w-[13vw] 2xl:w-[15vw] h-[10vw] md:h-[12vw] lg:h-[13vw] 2xl:h-[15vw] aspect-square">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id={`gradient-${selectedNumber}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>

      {/* Circular Progress with Gradient Stroke */}
      <CircularProgress
        variant="determinate"
        value={progress}
        size="100%"
        thickness={2}
        sx={{
          "& .MuiCircularProgress-circle": {
            stroke: `url(#gradient-${selectedNumber})`,
            strokeLinecap: "round",
            transition: "stroke-dashoffset 200ms linear",
          },
          "& .MuiCircularProgress-svg": {
            transform: "rotate(-90deg)",
          },
          width: "15vw",
        }}
      />
    </div>
  );
};

export default NumberDrawBall;
