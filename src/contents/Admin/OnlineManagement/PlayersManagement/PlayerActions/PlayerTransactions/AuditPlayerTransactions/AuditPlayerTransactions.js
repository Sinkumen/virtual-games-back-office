import AppButton from "@/components/AppButton";
import React from "react";
import { IoReceipt } from "react-icons/io5";

const AuditPlayerTransactions = () => {
  return (
    <div>
      <AppButton>
        <IoReceipt className="text-lg" />
      </AppButton>
    </div>
  );
};

export default AuditPlayerTransactions;
