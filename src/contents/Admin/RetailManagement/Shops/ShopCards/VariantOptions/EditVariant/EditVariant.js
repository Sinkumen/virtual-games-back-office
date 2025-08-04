import { useUpdateShopCardVariants } from "@/api/services/shopServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppModal from "@/components/AppModal";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

const EditVariant = ({ variant, onSuccess = () => {} }) => {
  const [variantName, setVariantName] = useState(variant?.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showMessage } = useToast();
  const {
    mutate: updateVariant,
    isPending,
    error,
  } = useUpdateShopCardVariants();

  const handleInputChange = (e) => {
    setVariantName(e.target.value);
  };

  const handleSave = () => {
    const data = {
      id: variant?._id,
      name: variantName,
    };
    updateVariant(data, {
      onSuccess: () => {
        onSuccess();
        showMessage("Variant edited successfully!");
      },
      onError: (error) => {
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  return (
    <div>
      <button
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 ${
          isPending ? " opacity-50" : "hover:bg-primary/15"
        } w-full`}
      >
        <MdEdit className="size-4 fill-primary" />
        Edit
      </button>
      <AppModal
        className={"p-5"}
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      >
        <p className="font-bold mb-3">Change Variant Name</p>

        <div className="flex gap-2">
          <AppInput
            value={variantName}
            onChange={handleInputChange}
            placeholder={"Enter a variant name"}
          />
          <AppButton loading={isPending} onClick={handleSave}>
            Save
          </AppButton>
        </div>
      </AppModal>
    </div>
  );
};

export default EditVariant;
