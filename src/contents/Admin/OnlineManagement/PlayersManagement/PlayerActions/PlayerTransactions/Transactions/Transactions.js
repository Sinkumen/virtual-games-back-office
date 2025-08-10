import { useGetPlayerTransaction } from "@/api/services/playersServices";
import AppPagination from "@/components/AppPagination";
import AppTable from "@/components/AppTable";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import { Chip, Divider } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { FaReceipt } from "react-icons/fa6";
import AuditPlayerTransactions from "../AuditPlayerTransactions";
import { chipColor } from "@/constants/colors";

const Transactions = ({ player }) => {
  const [filters, setFilters] = useState({
    phoneNumber: player?.phoneNumber,
    page: 1,
    limit: 20,
  });
  const onPageChange = (_event, page) => setFilters({ ...filters, page });
  const onPageSizeChange = (event) => {
    const newSize = event.target.value;
    setFilters({ ...filters, limit: newSize });
  };
  const { data: transactionResponse, isLoading } =
    useGetPlayerTransaction(filters);

  if (isLoading) {
    return <ManagePageSkeleton />;
  }

  const transactions = transactionResponse?.data?.data?.transactions || [];
  const pagination = transactionResponse?.data?.data?.pagination || {};

  const columns = [
    { id: "createdAt", name: "Date" },
    { id: "amount", name: "Amount" },
    { id: "type", name: "Type" },
    { id: "commission", name: "Deduction %" },
  ];

  const rows = transactions.map((transaction) => {
    return [
      moment(transaction.createdAt).fromNow(),
      `${transaction.amount} Birr`,
      <div
        className={`capitalize ${chipColor(transaction.type).textColor} ${
          chipColor(transaction.type).bgColor
        } p-1 px-2 rounded-md text-center`}
        key={transaction.id}
      >
        {transaction.type.replace("_", " ")}
      </div>,
      `${transaction.type === "win" ? 0 : transaction.gameCommission} %`,
    ];
  });

  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <FaReceipt className="text-[40px] text-primary" />
          <div>
            <p className="font-bold ">Transactions for {player.username}</p>
            <p className=" text-gray-500">
              {transactions.length} transactions found
            </p>
          </div>
        </div>

        <div className="self-end">
          <AuditPlayerTransactions />
        </div>
      </div>
      <Divider sx={{ my: 1 }} />

      <AppTable className="h-[400px] " columns={columns} rows={rows} />

      <AppPagination
        hideNextButton
        page={filters.page}
        onPageChange={onPageChange}
        count={pagination?.pages || 0}
        limit={filters.limit}
        onLimitChange={onPageSizeChange}
      />
    </div>
  );
};

export default Transactions;
