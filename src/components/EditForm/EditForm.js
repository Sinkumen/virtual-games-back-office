import React, { useState } from "react";
import AppButton from "../AppButton";
import { MdAdd, MdEdit } from "react-icons/md";
import AppModal from "../AppModal";
import AgentForm from "@/contents/Admin/Forms/AgentForm";
import ShopForm from "@/contents/Admin/Forms/ShopForm";
import CashierForm from "@/contents/Admin/Forms/CashierForm";

const EditForm = ({ entity, type }) => {
  const isEdit = Boolean(entity);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const forms = {
    agent: <AgentForm agent={entity} onSuccess={toggleModal} />,
    shop: <ShopForm shop={entity} onSuccess={toggleModal} />,
    cashier: <CashierForm cashier={entity} onSuccess={toggleModal} />,
  };

  return (
    <div className="h-full">
      <AppButton
        onClick={() => {
          toggleModal();
        }}
      >
        {isEdit ? (
          <MdEdit className="text-[20px]" />
        ) : (
          <MdAdd className="text-[20px]" />
        )}
      </AppButton>
      <AppModal
        className={"w-[90%] sm:w-[70%] md:w-[50%]  xl:w-[30%]"}
        isOpen={isOpen}
        closeModal={toggleModal}
      >
        {forms[type]}
      </AppModal>
    </div>
  );
};

export default EditForm;
