import React from "react";
import { FaGift, FaTrophy } from "react-icons/fa6";

const GameDetails = ({ currentGame }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">
        <div className="flex-1 w-full flex justify-between items-center  bg-gray-200 py-2  px-4 rounded-md">
          <p>Prize</p>
          <span className="flex items-center gap-2 text-game-primary">
            <p className="font-black text-2xl ">{currentGame?.prize}</p>{" "}
            <p className="text-xl font-semibold">Birr</p>
          </span>
        </div>
        <div className="flex-1 w-full flex justify-between items-center bg-gray-200 py-2  px-4 rounded-md">
          <p>Stake</p>
          <span className="flex items-center gap-2 text-game-primary">
            <p className="font-black text-2xl ">{currentGame?.stakeAmount}</p>{" "}
            <p className="text-xl font-semibold">Birr</p>
          </span>
        </div>
        <div className="flex-1  w-full flex justify-between items-center bg-gray-200   py-2  px-4 rounded-md">
          <p>Call</p>
          <p className="font-bold text-2xl text-game-primary">
            {Math.max(currentGame?.drawSequence?.length - 1, 0) || 0}
          </p>
        </div>

        <div className="flex-1  w-full flex justify-between items-center bg-gray-200 py-2 px-4 rounded-md">
          <p>Players</p>
          <p className="font-bold text-2xl text-game-primary">
            {currentGame?.selectedCards?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
