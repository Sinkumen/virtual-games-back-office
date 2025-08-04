import AppModal from "@/components/AppModal";
import { TbPlayCard8Filled } from "react-icons/tb";
import React, { useState } from "react";
import CardVariants from "./CardVariants";
import AppButton from "@/components/AppButton";

const ShopCards = ({ shop }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <AppButton className={"h-full"} onClick={toggleModal}>
        <TbPlayCard8Filled className="text-xl" />
      </AppButton>
      <AppModal
        className={"md:min-w-[500px]"}
        isOpen={isModalOpen}
        closeModal={toggleModal}
      >
        <CardVariants shop={shop} />
      </AppModal>
    </div>
  );
};

export default ShopCards;
