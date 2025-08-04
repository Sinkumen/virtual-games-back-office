import { useGetDepositAccount } from "@/api/services/transactionServices";
import AppButton from "@/components/AppButton";
import AppTab from "@/components/AppTab";
import { MenuButton } from "@headlessui/react";
import React from "react";
import { MdAdd, MdMoreVert } from "react-icons/md";
import DepositAccountSkeleton from "./DepositAccountSkeleton";
import AccountNumbers from "./AccountNumbers";

const DepositAccounts = () => {
  const {
    data: accountDetailsResponse,
    isLoading,
    error,
  } = useGetDepositAccount();

  const accounts = accountDetailsResponse?.data?.data?.accounts || [];

  const tabs = accounts.map((account) => ({
    id: account._id,
    content: <p>{account.name}</p>,
  }));

  const panels = accounts.map((account) => ({
    id: account._id,
    content: <AccountNumbers account={account} />,
  }));

  if (isLoading) {
    return <DepositAccountSkeleton />;
  }

  return (
    <div>
      <AppTab
        tabs={tabs}
        tabPanels={panels}
        AddTabComponent={
          <AppButton dense disabled className={"mb-1"}>
            <MdAdd />
          </AppButton>
        }
      />
    </div>
  );
};

export default DepositAccounts;
