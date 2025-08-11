import { useGetGameDetails } from "@/api/services/playersServices";
import BingoBall from "@/components/Bingo/BingoBall";
import BingoCard from "@/components/Bingo/BingoCard2/BingoCard";
import {
  CheckCircleIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const GameDetailPanel = ({ game }) => {
  const { data: gameDetailResponse, isLoading } = useGetGameDetails(game._id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const gameDetail = gameDetailResponse?.data?.data?.game;

  console.log({ gameDetail });

  const {
    onlineStatus,
    stakeAmount,
    commission,
    numberOfPlayers,
    players,
    winningCard,
    drawSequence,
  } = gameDetail || {};

  const statusColors = {
    cancelled: "bg-red-500 text-white",
    ongoing: "bg-green-500 text-white",
    finished: "bg-yellow-500 text-black",
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between ">
        <span
          className={` py-1 rounded-full text-sm font-bold ${statusColors[onlineStatus]}`}
        >
          {onlineStatus?.charAt(0).toUpperCase() + onlineStatus?.slice(1)}
        </span>
        <div className="flex items-center gap-4 text-gray-800">
          <span className="flex items-center gap-1 font-semibold">
            💰 {stakeAmount} ETB
          </span>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{commission}% Commission</span>
        <span className="flex items-center gap-1">
          <UserIcon className="h-4 w-4 text-purple-500" /> Players:{" "}
          {players?.length}
        </span>
      </div>

      <div>
        {[...(players || []), ...(players || [])]
          .sort((a, b) => b.isWinner - a.isWinner)
          .map((p, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-none"
            >
              <div className="flex items-center gap-2">
                {p.isWinner ? "🏆" : "❌"}
                <span className="font-medium">{p.username}</span>
              </div>
              {p.isWinner ? (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircleIcon className="h-5 w-5" /> Winner
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 font-medium">
                  <XCircleIcon className="h-5 w-5" /> Lost
                </span>
              )}
            </div>
          ))}
      </div>

      <div className="flex flex-row justify-center items-start">
        <div className="flex-1 border-primary/50 border-r-[1px]">
          <div className="bg-primary/10 p-1 font-bold text-primary text-center">
            <p>Winner Card</p>
          </div>
          <BingoCard
            fullScreen
            label={winningCard?.label}
            card={winningCard?.grid}
            drawnNumbers={drawSequence}
          />
        </div>

        <div className="flex-1 ">
          <div className="bg-primary/10 p-1 font-bold text-primary text-center">
            <p>Drawn Numbers</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1 max-h-[280px] lg:max-h-[340px] xl:max-h-[400px] mt-2 pb-2 overflow-x-auto">
            {drawSequence?.map((num, idx) => (
              <BingoBall key={idx} label={num} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPanel;
