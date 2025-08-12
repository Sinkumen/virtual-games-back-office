import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { TrophyIcon, XCircleIcon } from "@heroicons/react/20/solid";

const ShowMorePlayers = ({ players }) => {
  const popoverRef = useRef(null);

  const [panelWidth, setPanelWidth] = useState(0);

  useEffect(() => {
    if (popoverRef.current) {
      setPanelWidth(popoverRef.current.offsetWidth);
    }
  }, [popoverRef.current]);

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
                    <p>Participants</p>
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
                        <span className="font-medium text-gray-600">
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
          );
        }}
      </Popover>
    </div>
  );
};

export default ShowMorePlayers;
