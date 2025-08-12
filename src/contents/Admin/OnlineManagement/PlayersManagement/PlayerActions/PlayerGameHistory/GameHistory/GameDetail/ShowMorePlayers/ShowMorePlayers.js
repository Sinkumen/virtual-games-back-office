import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { TrophyIcon, XCircleIcon } from "@heroicons/react/20/solid";
import StatusChip from "@/components/StatusChip";

const ShowMorePlayers = ({ players }) => {
  const popoverRef = useRef(null);

  const [panelWidth, setPanelWidth] = useState(0);

  useEffect(() => {
    if ((open, popoverRef.current)) {
      setPanelWidth(popoverRef.current.offsetWidth);
    }
  }, [open, popoverRef.current]);

  return (
    <div className="w-full">
      <Popover ref={popoverRef} className="relative w-full">
        {({ open, close }) => {
          return (
            <>
              <PopoverButton className="focus:outline-none w-full">
                <div className="flex items-center justify-between rounded gap-1 bg-gray-600 text-white p-2">
                  <div className="flex items-center gap-1">
                    <FaUser className="h-5 w-5" />
                    <p>{players?.length} Participants</p>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </PopoverButton>

              <PopoverPanel
                anchor="bottom"
                style={{ width: `${panelWidth}px` }}
                className="flex flex-col bg-white shadow-2xl p-4 rounded-md z-10"
              >
                <div className="max-h-96 overflow-y-auto">
                  {players.map((player, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-1 px-2 bg-gray-200 my-1 rounded"
                    >
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaUser />
                        <div>
                          <p className="font-bold text-gray-600">
                            {player.firstName}
                          </p>
                          <p className="font-medium text-gray-600">
                            {player.username}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm">Cards</p>
                        <div className="flex items-center gap-1">
                          {!!player?.confirmedCards && (
                            <StatusChip
                              variant={"successDeep"}
                              status={`${player.confirmedCards}`}
                            />
                          )}
                          {!!player?.cancelledCards && (
                            <StatusChip
                              variant={"errorDeep"}
                              status={`${player.cancelledCards}`}
                            />
                          )}
                        </div>
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
          );
        }}
      </Popover>
    </div>
  );
};

export default ShowMorePlayers;
