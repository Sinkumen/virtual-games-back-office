import { useGetPlayerTransaction } from "@/api/services/playersServices";
import AppPagination from "@/components/AppPagination";
import AppTable from "@/components/AppTable";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import { Chip, Divider } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { FaReceipt } from "react-icons/fa6";

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

  const chipColor = (type) => {
    switch (type) {
      case "win":
        return { textColor: `text-[#4caf50]`, bgColor: `bg-[#4caf50]/20` }; // Green for win
      case "bet":
        return { textColor: `text-[#f44336]`, bgColor: `bg-[#f44336]/20` }; // Red for loss
      case "deposit":
      case "chapa_deposit":
        return { textColor: `text-[#2196f3]`, bgColor: `bg-[#2196f3]/20` }; // Blue for deposit
      case "withdrawal":
      case "chapa_withdrawal":
        return { textColor: `text-[#ff9800]`, bgColor: `bg-[#ff9800]/20` }; // Orange for withdrawal
      default:
        return { textColor: `text-[#000000]`, bgColor: `bg-[#9e9e9e]/20` }; // Grey for default
    }
  };

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
      <div className="flex gap-2 items-center">
        <FaReceipt className="text-[40px] text-primary" />
        <div>
          <p className="font-bold ">Transactions for {player.username}</p>
          <p className=" text-gray-500">
            {transactions.length} transactions found
          </p>
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
