import Cashiers from "@/contents/Admin/RetailManagement/Cashiers";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const CashierManagementPage = () => {
  return (
    <>
      <title>Manage Cashiers</title>
      <MainLayoutLight>
        <Cashiers />
      </MainLayoutLight>
    </>
  );
};

export default CashierManagementPage;
