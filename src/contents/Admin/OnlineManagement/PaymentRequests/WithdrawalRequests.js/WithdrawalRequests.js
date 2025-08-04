import { useGetPaymentRequests } from "@/api/services/transactionServices";
import React, { useState } from "react";
import { getRow } from "../helpers/getRow";
import AppTable from "@/components/AppTable";
import AppPagination from "@/components/AppPagination";
import TableSkeleton from "@/components/Skeletons/TableSkeleton";
import AppSelect from "@/components/AppSelect";

const WithdrawalRequests = ({ mobileView }) => {
  const [withdrawPage, setWithdrawPage] = useState(1);
  const [withdrawLimit, setWithdrawLimit] = useState(10);
  const [withdrawStatus, setWithdrawStatus] = useState("");

  const onPageChange = (_event, page) => setWithdrawPage(page);
  const onPageSizeChange = (event) => {
    setWithdrawPage(1);
    setWithdrawLimit(event.target.value);
  };

  const handleStatusChange = (status) => {
    setWithdrawStatus(status);
  };

  const { data: withdrawRequestResponse, isLoading: isLoadingWithdraw } =
    useGetPaymentRequests({
      status: withdrawStatus?.id,
      type: "withdrawal",
      page: withdrawPage,
      limit: withdrawLimit,
    });

  const playerColumns = [
    { id: "amount", name: "Amount" },
    { id: "username", name: "Player" },
    { id: "type", name: "Payment Type" },
    { id: "action", name: "Action" },
  ];

  if (isLoadingWithdraw) {
    return <TableSkeleton />;
  }

  const withdrawalRequests =
    withdrawRequestResponse?.data?.data?.requests || [];

  const withdrawalRows =
    withdrawalRequests.map((request) => getRow(request)) || [];

  return (
    <div className="flex-1 z-0">
      <div className="flex gap-2 items-center pr-1">
        <div className="flex-2 bg-slate-200 p-1 my-2 pl-4">
          <p className="font-semibold text-xl text-slate-500 sticky top-0 z-50">
            Withdraw
          </p>
        </div>
        <AppSelect
          dense
          value={withdrawStatus}
          placeholder="Select status"
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
        <AppTable rows={withdrawalRows} columns={playerColumns} />
      ) : (
        <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <AppTable rows={withdrawalRows} columns={playerColumns} />
        </div>
      )}
      <AppPagination
        page={withdrawPage}
        onPageChange={onPageChange}
        count={withdrawRequestResponse?.data?.data?.pagination?.totalPages || 0}
        limit={withdrawLimit}
        onLimitChange={onPageSizeChange}
      />
    </div>
  );
};

export default WithdrawalRequests;
