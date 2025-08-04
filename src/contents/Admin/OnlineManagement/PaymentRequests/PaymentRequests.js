import ManageDepositAccounts from "@/components/Wallet/ManageDepositAccounts";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import DepositRequests from "./DepositRequests";
import WithdrawalRequests from "./WithdrawalRequests.js";

const PaymentRequests = () => {
  return (
    <div>
      <div className="flex justify-end xl:justify-between">
        <p className="font-bold mb-1 md:font-black md:text-2xl md:my-2 hidden xl:block ">
          Payment Requests
        </p>
        <ManageDepositAccounts />
      </div>

      <div className=" flex-col xl:flex-row xl:gap-10 gap-4 hidden xl:flex">
        <DepositRequests />
        <WithdrawalRequests />
      </div>
      <TabGroup className="xl:hidden h-[80svh] overflow-auto ">
        <TabList className="border-b-2 border-primary mb-1 sticky top-0 bg-white z-100 flex justify-between items-center">
          <div className="flex gap-1">
            <Tab className="px-4 py-2 border data-selected:border-primary data-selected:bg-primary data-selected:text-white text-primary focus:outline-none rounded-tl-lg rounded-tr-lg cursor-pointer">
              Deposit
            </Tab>
            <Tab className="px-4 py-2 border data-selected:bg-primary data-selected:text-white text-primary focus:outline-none rounded-tl-lg rounded-tr-lg cursor-pointer">
              Withdraw
            </Tab>
          </div>
          <span className="px-4 text-primary font-bold text-sm">
            Payment Requests
          </span>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DepositRequests mobileView />
          </TabPanel>
          <TabPanel>
            <WithdrawalRequests mobileView />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PaymentRequests;
