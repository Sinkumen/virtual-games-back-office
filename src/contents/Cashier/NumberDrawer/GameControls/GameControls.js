import AppButton from "@/components/AppButton";
import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/20/solid";
import React from "react";

const GameControls = ({
  isPaused,
  isStarted,
  start,
  pause,
  resume,
  end,
  shuffling,
}) => {
  return (
    <div className="flex gap-2 flex-col lg:flex-row w-full ">
      <AppButton fullWidth disabled={isStarted || shuffling} onClick={start}>
        <div className="flex flex-1 items-center gap-2  text-[0.7em] xl:text-[0.8em] 2xl:text-[1em] min-w-[50px]">
          <PlayIcon width={20} />
          <p>Start</p>
        </div>
      </AppButton>
      <AppButton
        fullWidth
        disabled={!isStarted || shuffling}
        onClick={isPaused ? resume : pause}
      >
        <div className="flex flex-1 items-center gap-2  text-[0.7em] xl:text-[0.8em] 2xl:text-[1em] min-w-[50px]">
          <PauseIcon width={20} />
          <p>{isPaused ? "Resume" : "Pause"}</p>
        </div>
      </AppButton>
      <AppButton fullWidth onClick={end} bgColor="bg-red-600">
        <div className="flex flex-1 items-center gap-2  text-nowrap  text-[0.7em] xl:text-[0.8em] 2xl:text-[1em] min-w-[50px]">
          <StopIcon width={20} />
          <p>End Game</p>
        </div>
      </AppButton>
    </div>
  );
};

export default GameControls;
