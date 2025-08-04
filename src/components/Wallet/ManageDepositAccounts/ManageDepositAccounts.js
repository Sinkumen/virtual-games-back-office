import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import React, { useState } from "react";
import DepositAccounts from "../DepositAccounts";

const ManageDepositAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <AppButton onClick={toggleModal} className={"text-sm mb-2 xl:mb-0"}>
        Manage deposit accounts
      </AppButton>
      <AppModal
        className={"w-[90%] sm:w-[70%] md:w-[50%]  xl:w-[30%]"}
        isOpen={isModalOpen}
        closeModal={toggleModal}
      >
        <DepositAccounts />
      </AppModal>
    </div>
  );
};

export default ManageDepositAccounts;
