import PaymentRequests from "@/contents/Admin/OnlineManagement/PaymentRequests";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const PaymentRequestPage = () => {
  return (
    <>
      <title>Manage Agents</title>
      <MainLayoutLight>
        <PaymentRequests />
      </MainLayoutLight>
    </>
  );
};

export default PaymentRequestPage;
