import BingoDashboard from "@/contents/Admin/OnlineManagement/Bingo/BingoDashboard";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const BingoDashboardPage = () => {
  return (
    <>
      <title>Manage Bingo</title>
      <MainLayoutLight>
        <BingoDashboard />
      </MainLayoutLight>
    </>
  );
};

export default BingoDashboardPage;
