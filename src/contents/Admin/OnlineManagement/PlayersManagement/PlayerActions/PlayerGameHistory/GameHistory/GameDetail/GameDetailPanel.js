import { useGetGameDetails } from "@/api/services/playersServices";
import BingoBall from "@/components/Bingo/BingoBall";
import BingoCard from "@/components/Bingo/BingoCard2/BingoCard";
import React from "react";
import StatusChip from "@/components/StatusChip";
import Participants from "./Participants";
import { FaClock, FaListOl, FaTrophy } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import GameDetailSkeleton from "./GameDetailSkeleton";

const GameDetailPanel = ({ game, selectedPlayer }) => {
  const { data: gameDetailResponse, isLoading } = useGetGameDetails(game._id);

  const gameDetail = gameDetailResponse?.data?.data?.game;

  const {
    onlineStatus,
    stakeAmount,
    commission,
    numberOfPlayers,
    players,
    winningCard,
    drawSequence,
  } = gameDetail || {};

  if (isLoading) {
    return <GameDetailSkeleton />;
  }

  const renderGameStatus = () => {
    if (onlineStatus === "completed") {
      return (
        <div className="flex flex-row justify-center items-start mt-2">
          <div className="flex-1 border-primary/50 border-r-[1px]">
            <div className="bg-primary/10 p-2 font-bold text-primary text-center flex items-center justify-center gap-2">
              <FaTrophy /> <p>Winner Card</p>
            </div>
            <BingoCard
              fullScreen
              label={winningCard?.label}
              card={winningCard?.grid}
              drawnNumbers={drawSequence}
            />
          </div>

          <div className="flex-1 ">
            <div className="bg-primary/10 p-2 font-bold text-primary text-center flex items-center justify-center gap-2">
              <FaListOl /> <p>Drawn Numbers</p>
            </div>

            <div className="flex flex-wrap justify-center gap-1 max-h-[280px] lg:max-h-[340px] xl:max-h-[400px] mt-2 pb-2 overflow-x-auto">
              {drawSequence?.map((num, idx) => (
                <BingoBall key={idx} label={num} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (onlineStatus === "cancelled") {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-red-500 bg-red-50 rounded-lg mt-2">
          <FaTimesCircle className="h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-red-700">Game Canceled</h3>
          <p className="mt-1">
            This game was canceled and no results are available.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 bg-gray-50 rounded-lg mt-2">
        <FaClock className="h-12 w-12 text-gray-400 mb-4 animate-pulse" />
        <h3 className="text-lg font-semibold text-gray-700">
          Game In Progress
        </h3>
        <p className="mt-1">
          Results will be available here once the game is completed.
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-start justify-between ">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex text-xl items-center gap-1 font-semibold capitalize">
              {game?.transactions?.[0]?.gameMode}
            </span>
            <StatusChip status={onlineStatus} />
          </div>
        </div>

        <StatusChip status={game.status} />
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{commission}% Commission</span>
          <span className="flex items-center gap-1">💰 {stakeAmount} ETB</span>
        </div>
        <Participants players={players} />
      </div>

      {renderGameStatus()}
    </div>
  );
};

export default GameDetailPanel;
