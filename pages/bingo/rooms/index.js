import RoomManagement from "@/contents/Admin/OnlineManagement/Bingo/RoomManagement";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const RoomManagementPage = () => {
  return (
    <>
      <title>Manage Rooms</title>
      <MainLayoutLight>
        <RoomManagement />
      </MainLayoutLight>
    </>
  );
};

export default RoomManagementPage;
