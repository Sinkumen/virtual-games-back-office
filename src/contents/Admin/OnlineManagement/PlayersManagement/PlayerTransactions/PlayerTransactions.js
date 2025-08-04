import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import React, { useState } from "react";
import { FaReceipt } from "react-icons/fa6";
import Transactions from "./Transactions";

const PlayerTransactions = ({ player }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <AppButton onClick={toggleModal}>
        <FaReceipt className="text-lg" />
      </AppButton>
      <AppModal
        className={
          "w-[90%] sm:w-[70%] md:w-[50%]  xl:w-[30%] max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
        }
        isOpen={isModalOpen}
        closeModal={toggleModal}
      >
        <Transactions player={player} />
      </AppModal>
    </div>
  );
};

export default PlayerTransactions;
