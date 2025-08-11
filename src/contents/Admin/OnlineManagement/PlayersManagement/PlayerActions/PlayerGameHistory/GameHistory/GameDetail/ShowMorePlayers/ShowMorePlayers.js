import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { TrophyIcon, XCircleIcon } from "@heroicons/react/20/solid";

const ShowMorePlayers = ({ players }) => {
  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton className="focus:outline-none w-full">
              <div className="flex items-center justify-between rounded gap-1 bg-gray-600 text-white p-2">
                <div className="flex items-center gap-1">
                  <FaUser className="h-5 w-5" />
                  <p>Participants</p>
                </div>

                {!open ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronDown className="transform rotate-180" />
                )}
              </div>
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="flex flex-col bg-white shadow-2xl p-4 rounded-md z-10 w-[350px]"
            >
              <div className="max-h-96 overflow-y-auto ">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-1 px-2 bg-gray-200 my-1 `}
                  >
                    <div className={`flex items-center gap-2 text-gray-600`}>
                      <FaUser />
                      <span className={`font-medium text-gray-600`}>
                        {player.username}
                      </span>
                    </div>
                    {player.isWinner ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <TrophyIcon className="h-5 w-5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-600 font-medium">
                        <XCircleIcon className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ShowMorePlayers;
