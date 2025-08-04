import AppButton from "@/components/AppButton";
import AppModal from "@/components/AppModal";
import Cashiers from "@/contents/Admin/RetailManagement/Cashiers";
import React, { useState } from "react";
import { IoReceipt } from "react-icons/io5";

const CashierReport = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <AppButton onClick={toggleModal}>
        <IoReceipt />
      </AppButton>
      <AppModal
        className={
          "w-[95%] sm:w-[80%] md:w-[70%]  2xl:w-[50%] max-h-[90svh] overflow-y-auto "
        }
        isOpen={isModalOpen}
        closeModal={toggleModal}
      >
        <Cashiers forCashier />
      </AppModal>
    </div>
  );
};

export default CashierReport;
