import GamesManagement from "@/contents/Admin/OnlineManagement/GamesManagement";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const GamesManagementPage = () => {
  return (
    <>
      <title>Manage Games</title>
      <MainLayoutLight>
        <GamesManagement />
      </MainLayoutLight>
    </>
  );
};

export default GamesManagementPage;
