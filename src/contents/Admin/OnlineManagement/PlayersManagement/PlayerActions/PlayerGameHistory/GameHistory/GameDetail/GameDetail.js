import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import React, { useState } from "react";
import { MdGames } from "react-icons/md";
import GameDetailPanel from "./GameDetailPanel";

const GameDetail = ({ game, selectedPlayer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <AppButton dense onClick={toggleModal}>
        <MdGames />
      </AppButton>
      <AppModal
        className={"md:min-w-[500px] max-w-[600px]"}
        isOpen={isOpen}
        closeModal={toggleModal}
      >
        <GameDetailPanel
          game={game}
          selectedPlayer={selectedPlayer}
          closeModal={toggleModal}
        />
      </AppModal>
    </div>
  );
};

export default GameDetail;
