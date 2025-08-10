import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React from "react";
import { MdMoreVert } from "react-icons/md";
import PlayerActivation from "./PlayerActivation";
import RefillPlayerBalance from "./RefillPlayerBalance";
import PlayerTransactions from "./PlayerTransactions";
import AffiliateManager from "./AffiliateManager";
import PlayerGameHistory from "./PlayerGameHistory";

const PlayerActions = ({ player }) => {
  return (
    <div key={player.id} className="relative inline-block text-left">
      <div className="flex gap-1 items-center">
        <AffiliateManager player={player} />

        <RefillPlayerBalance player={player} />

        <Menu>
          <MenuButton className={"bg-gray-200 hover:bg-gray-300 rounded p-2"}>
            <MdMoreVert className="text-2xl " />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-opacity-5 p-2"
          >
            <div className="p-1">
              <MenuItem>
                <PlayerTransactions player={player} />
              </MenuItem>
            </div>
            <div className="p-1">
              <MenuItem>
                <PlayerGameHistory player={player} />
              </MenuItem>
            </div>

            <div className="p-1">
              <MenuItem>
                <PlayerActivation player={player} />
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default PlayerActions;
