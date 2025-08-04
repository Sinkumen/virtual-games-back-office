import Shops from "@/contents/Admin/RetailManagement/Shops";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const ShopManagementPage = () => {
  return (
    <>
      <title>Manage Shops</title>
      <MainLayoutLight>
        <Shops />
      </MainLayoutLight>
    </>
  );
};

export default ShopManagementPage;
