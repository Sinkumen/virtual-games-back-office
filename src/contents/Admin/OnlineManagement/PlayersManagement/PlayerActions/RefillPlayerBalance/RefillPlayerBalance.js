import { useRefillPlayerBalance } from "@/api/services/playersServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import { FaGasPump } from "react-icons/fa6";

const RefillPlayerBalance = ({ player }) => {
  const { showMessage } = useToast();
  const { mutate: refillBalance, isPending } = useRefillPlayerBalance();

  const handleRefill = (event, close) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    const payload = { userId: player._id, amount: Number(amount) };
    refillBalance(payload, {
      onSuccess: () => {
        showMessage("Player balance refilled successfully");
        close(); // Close the popover on success
      },
      onError: (error) => {
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="w-full">
            <button className="flex text-sm w-full items-center gap-2 rounded py-1 px-2 hover:bg-gray-200">
              <FaGasPump />
              Refill Balance
            </button>
          </PopoverButton>
          <PopoverBackdrop className="fixed inset-0" />
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col bg-white shadow-2xl p-3 rounded-md"
          >
            <form
              onSubmit={(event) => handleRefill(event, close)} // Pass close to handleRefill
              method="POST"
              className="flex gap-2 items-end"
            >
              <AppInput
                className={"min-w-[130px]"}
                name="amount"
                type="number"
                required={true}
                label="Refill Amount"
                placeholder="Refill Amount"
                min={5}
                max={10000}
              />
              <AppButton type="submit" loading={isPending}>
                Refill
              </AppButton>
            </form>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default RefillPlayerBalance;
