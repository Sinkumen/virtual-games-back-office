import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import React, { useState } from "react";
import { MdGames } from "react-icons/md";
import GameDetailPanel from "./GameDetailPanel";

const GameDetail = ({ game }) => {
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
        <GameDetailPanel game={game} />
      </AppModal>
    </div>
  );
};

export default GameDetail;
