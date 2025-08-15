import { useGetTransactionTrends } from "@/api/services/reportServices/trendSercices";
import AppBarChart from "@/components/Dashboard/AppBarChart";
import { trendDateRanges } from "@/dataset/dateRanges";
import moment from "moment";
import React, { useState } from "react";

const WalletTransactionTrend = () => {
  const [filters, setFilters] = useState(trendDateRanges[0]);
  const { data: trendResponse, isLoading } = useGetTransactionTrends(filters);

  if (isLoading) {
    return (
      <div className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  const transactionTrends = trendResponse?.data?.data || [];

  console.log({ transactionTrends });

  return (
    <div>
      <p className="text-lg font-semibold my-2">Wallet Transaction Trend</p>
      <AppBarChart
        categories={
          transactionTrends?.map((rep) => moment(rep?.date).format("DD")) || []
        }
        series={[
          {
            name: "Deposit",
            data:
              transactionTrends?.map((rep) => rep?.totalDeposit?.toFixed(2)) ||
              [],
          },
          {
            name: "Withdrawal",
            data:
              transactionTrends?.map((rep) =>
                rep?.totalWithdrawal?.toFixed(2)
              ) || [],
          },
        ]}
      />
    </div>
  );
};

export default WalletTransactionTrend;
