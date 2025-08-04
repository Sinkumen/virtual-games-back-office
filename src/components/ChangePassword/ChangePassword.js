import React, { useState } from "react";
import AppButton from "../AppButton";
import { MdEdit, MdPassword } from "react-icons/md";
import AppModal from "../AppModal";
import ChangePasswordForm from "@/contents/Admin/Forms/ChangePasswordForm";

const ChangePassword = ({ user, closeMenu = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    if (isOpen) {
      closeMenu();
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex-1" onClick={(e) => {}}>
      {user ? (
        <AppButton
          className={"flex-1 w-full flex justify-center"}
          onClick={toggleModal}
          bgColor={"bg-gray-800"}
        >
          <MdPassword className="text-[20px]" />
        </AppButton>
      ) : (
        <button
          onClick={toggleModal}
          className="group flex w-full items-center gap-2 rounded  p-3 hover:bg-slate-200"
        >
          <MdEdit className="size-4 " />
          Change Password
        </button>
      )}

      <AppModal isOpen={isOpen} closeModal={toggleModal}>
        <ChangePasswordForm user={user} onUpdateSuccess={toggleModal} />
      </AppModal>
    </div>
  );
};

export default ChangePassword;
