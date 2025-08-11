import { useUpdateUserPromoCode } from "@/api/services/playersServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React from "react";
import { MdCancel } from "react-icons/md";

const PromoCodeForm = ({ player, onSuccess, onCancel }) => {
  const { showMessage } = useToast();
  const { mutate: updatePromoCode, isPending } = useUpdateUserPromoCode();

  const handleUpdatePromoCode = (event) => {
    event.preventDefault();
    const promoCode = event.target.promo_code.value;
    if (!promoCode) {
      showMessage("Promo code required!", { ERROR });
      return;
    }

    updatePromoCode(
      { userId: player?._id, promoCode: promoCode?.toUpperCase() },
      {
        onSuccess: () => {
          showMessage("Promo code updated successfully");
          onSuccess();
        },
        onError: (error) => {
          showMessage(`Error updating promo code: ${error.message}`, {
            type: "error",
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={(event) => handleUpdatePromoCode(event, close)}
      method="POST"
      className="flex gap-2 items-end w-full"
    >
      <AppInput
        dense
        defaultValue={player?.promoCode}
        className={"min-w-[130px] w-full uppercase"}
        name="promo_code"
        required={true}
        placeholder="Promo Code"
        minLength={4}
        maxLength={6}
      />

      <div className="flex items-center gap-1">
        <AppButton dense type="submit" loading={isPending}>
          Save
        </AppButton>
        <AppButton
          disabled={isPending}
          bgColor={"bg-red-500"}
          onClick={onCancel}
        >
          <MdCancel />
        </AppButton>
      </div>
    </form>
  );
};

export default PromoCodeForm;
