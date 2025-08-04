import { useGetPaymentRequests } from "@/api/services/transactionServices";
import AppPagination from "@/components/AppPagination";
import AppTable from "@/components/AppTable";
import React, { useState } from "react";
import { getRow } from "../helpers/getRow";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import AppSelect from "@/components/AppSelect";

const DepositRequests = ({ mobileView }) => {
  const [depositPage, setDepositPage] = useState(1);
  const [depositLimit, setDepositLimit] = useState(10);
  const [depositStatus, setDepositStatus] = useState("");

  const onPageChange = (_event, page) => setDepositPage(page);

  const onPageSizeChange = (event) => {
    setDepositPage(1);
    setDepositLimit(event.target.value);
  };

  const handleStatusChange = (status) => {
    setDepositStatus(status);
  };

  const { data: depositRequestResponse, isLoading: isLoadingDeposit } =
    useGetPaymentRequests({
      status: depositStatus?.id,
      type: "deposit",
      page: depositPage,
      limit: depositLimit,
    });

  const playerColumns = [
    { id: "amount", name: "Amount" },
    { id: "username", name: "Player" },
    { id: "type", name: "Payment Type" },
    { id: "action", name: "Action" },
  ];

  if (isLoadingDeposit) {
    return <TableSkeleton />;
  }

  const depositRequests = depositRequestResponse?.data?.data?.requests || [];
  const depositRows = depositRequests.map((request) => getRow(request)) || [];

  return (
    <div className="flex-1">
      <div className="flex gap-2 items-center pr-1">
        <div className="flex-2 bg-slate-200 p-1 my-2 pl-4 sticky top-0 z-50">
          <p className="font-semibold text-xl text-slate-500">Deposit</p>
        </div>
        <AppSelect
          dense
          placeholder="Select status"
          value={depositStatus}
          options={[
            { id: "", name: "All" },
            { id: "pending", name: "Pending" },
            { id: "approved", name: "Approved" },
            { id: "declined", name: "Declined" },
          ]}
          onChange={handleStatusChange}
        />
      </div>

      {mobileView ? (
        <AppTable rows={depositRows} columns={playerColumns} />
      ) : (
        <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <AppTable rows={depositRows} columns={playerColumns} />
        </div>
      )}
      <AppPagination
        page={depositPage}
        onPageChange={onPageChange}
        count={depositRequestResponse?.data?.data?.pagination?.totalPages || 0}
        limit={depositLimit}
        onLimitChange={onPageSizeChange}
      />
    </div>
  );
};

export default DepositRequests;
