import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import AppButton from "../AppButton";

const AppDialog = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  title = "End Game",
  description = " This game is not yet completed, are you sure you want to end it?",
  confirmButtonLabel = "End",
  warning,
}) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-[9999] focus:outline-none "
      onClose={onClose}
    >
      <div className="fixed inset-0 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white shadow-2xl p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium ">
              {title}
            </DialogTitle>
            <p className="mt-2 text-sm/6 ">{description}</p>
            <div className="flex mt-4 gap-2">
              <AppButton dense bgColor={"bg-gray-500"} onClick={onClose}>
                Cancel
              </AppButton>
              <AppButton
                loading={isLoading}
                dense
                onClick={onConfirm}
                className={warning ? "bg-red-600" : ""}
              >
                {confirmButtonLabel}
              </AppButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AppDialog;
