import Agents from "@/contents/Admin/RetailManagement/Agents";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const AgentManagementPage = () => {
  return (
    <>
      <title>Manage Agents</title>
      <MainLayoutLight>
        <Agents />
      </MainLayoutLight>
    </>
  );
};

export default AgentManagementPage;
