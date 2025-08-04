import { useVerifyTransaction } from "@/api/services/transactionServices";
import AppButton from "@/components/AppButton";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import React from "react";
import { MdVerified } from "react-icons/md";

const VerifyPayments = ({ request }) => {
  const { showMessage } = useToast();
  const { mutate: verifyTransaction, isPending: isVerifying } =
    useVerifyTransaction();
  const handleVerify = () => {
    verifyTransaction(request, {
      onSuccess: () => {
        showMessage("Transaction verified successfully");
      },
      onError: (error) => {
        showMessage(
          error?.response?.data?.message || "Failed to verify transaction",
          { type: ERROR }
        );
      },
    });
  };
  return (
    <div>
      <AppButton
        loading={isVerifying}
        bgColor={"bg-green-600"}
        onClick={handleVerify}
      >
        <MdVerified />
      </AppButton>
    </div>
  );
};

export default VerifyPayments;
