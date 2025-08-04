import PlayersManagements from "@/contents/Admin/OnlineManagement/PlayersManagement";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const PlayersManagementPage = () => {
  return (
    <>
      <title>Manage Players</title>
      <MainLayoutLight>
        <PlayersManagements />
      </MainLayoutLight>
    </>
  );
};

export default PlayersManagementPage;
