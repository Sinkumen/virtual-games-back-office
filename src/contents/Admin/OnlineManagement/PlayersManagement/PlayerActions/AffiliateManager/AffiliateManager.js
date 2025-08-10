import { useUpdateUserPromoCode } from "@/api/services/playersServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";
import useToast from "@/hooks/useToast";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { TbAffiliate } from "react-icons/tb";

const AffiliateManager = ({ player }) => {
  const { showMessage } = useToast();

  const { mutate: updatePromoCode, isPending } = useUpdateUserPromoCode();

  const handleUpdatePromoCode = (event, close) => {
    event.preventDefault();
    const promoCode = event.target.promo_code.value;
    if (!promoCode) {
      return;
    }

    updatePromoCode(
      { userId: player?._id, promoCode },
      {
        onSuccess: () => {
          showMessage("Promo code updated successfully");
        },
        onError: (error) => {
          showMessage(`Error updating promo code: ${error.message}`, {
            type: "error",
          });
        },
      }
    );
    close();
  };

  return (
    <div>
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton>
              <AppButton>
                <TbAffiliate className="text-lg" />
              </AppButton>
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="flex flex-col bg-white shadow-2xl p-3 rounded-md"
            >
              <form
                onSubmit={(event) => handleUpdatePromoCode(event, close)} // Pass close to handleRefill
                method="POST"
                className="flex gap-2 items-end"
              >
                <AppInput
                  className={"min-w-[130px]"}
                  name="promo_code"
                  required={true}
                  label="Promo Code"
                  placeholder="Promo Code"
                  minLength={4}
                  maxLength={6}
                />
                <AppButton type="submit" loading={isPending}>
                  Save
                </AppButton>
              </form>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default AffiliateManager;
