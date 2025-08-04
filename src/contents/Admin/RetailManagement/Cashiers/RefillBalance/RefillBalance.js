import { useRefillCashierBalance } from "@/api/services/cashierServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { FaGasPump } from "react-icons/fa6";

const maxRefillAmount = 50000;

const RefillBalance = ({ cashier }) => {
  const { showMessage } = useToast();
  const { mutate: refillBalance, isPending, error } = useRefillCashierBalance();

  const handleRefill = (event, close) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    if (amount >= 500 && amount <= maxRefillAmount) {
      const payload = { id: cashier._id, balance: Number(amount) };
      refillBalance(payload, {
        onSuccess: () => {
          showMessage("Casher balance refilled successfully");
          close(); // Close the popover on success
        },
        onError: (error) => {
          showMessage(error.message, { type: ERROR });
        },
      });
    } else {
      showMessage(`Amount must range from 500 to ${maxRefillAmount} Birr`, {
        type: ERROR,
      });
    }
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className={"bg-primary/20 h-full px-4 rounded-md"}>
            <FaGasPump className="text-primary text-lg" />
          </PopoverButton>
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
                min={500}
                max={maxRefillAmount}
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

export default RefillBalance;
