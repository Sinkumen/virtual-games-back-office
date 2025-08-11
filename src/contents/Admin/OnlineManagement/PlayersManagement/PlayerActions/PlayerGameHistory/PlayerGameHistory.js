import { useGetPlayerGameHistory } from "@/api/services/playersServices";
import AppModal from "@/components/AppModal";
import React, { useState } from "react";
import { FaGamepad } from "react-icons/fa6";
import GameHistory from "./GameHistory";
import AppButton from "@/components/AppButton";

const PlayerGameHistory = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <AppButton onClick={toggleModal}>
        <FaGamepad className="text-lg" />
      </AppButton>

      <AppModal
        className={
          "w-[90%] sm:w-[70%] md:w-[50%]  xl:w-[30%] max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
        }
        isOpen={isModalOpen}
        closeModal={toggleModal}
      >
        <GameHistory player={player} />
      </AppModal>
    </div>
  );
};

export default PlayerGameHistory;
