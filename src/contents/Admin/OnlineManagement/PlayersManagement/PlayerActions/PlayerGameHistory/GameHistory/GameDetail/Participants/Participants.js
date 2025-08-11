import { TrophyIcon, XCircleIcon } from "@heroicons/react/20/solid";
import React, { useMemo } from "react";
import { FaUser } from "react-icons/fa6";
import ShowMorePlayers from "../ShowMorePlayers";

const Participants = ({ players = [] }) => {
  const sortedPlayers = useMemo(
    () => (players || []).sort((a, b) => b.isWinner - a.isWinner),
    [players]
  );

  const winner = sortedPlayers.find((player) => player.isWinner);

  return (
    <div>
      {winner && (
        <div className={`bg-green-100  rounded overflow-hidden mb-2`}>
          <div className="flex items-center gap-1 bg-green-600 text-white p-2">
            <TrophyIcon className="h-5 w-5" />
            <p>Winner</p>
          </div>

          <div className={`flex justify-between items-center py-1 px-2 `}>
            <div className={`flex items-center gap-2 text-green-700`}>
              <FaUser />
              <span className={`font-medium text-green-700`}>
                {winner.username}
              </span>
            </div>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <TrophyIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      )}

      <ShowMorePlayers players={sortedPlayers} />
    </div>
  );
};

export default Participants;
