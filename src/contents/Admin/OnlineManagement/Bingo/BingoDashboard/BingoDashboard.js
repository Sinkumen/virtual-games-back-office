import React, { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AppTable from "@/components/AppTable";
import { useGetOverview } from "@/api/services/reportServices/reportServices";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import { defaultDateRange } from "@/utils/parseFilters";
import { Divider } from "@mui/material";
import GameSpecificReports from "./GameSpecificReports";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import Leaderboard from "@/components/Dashboard/Leaderboard";
import { formatNumberWithCommas } from "@/utils/number";
import DateFilter from "./DateFilter";
import DateRangePicker from "@/components/DateRangePicker";

const BingoDashboard = () => {
  const [filters, setFilters] = useState(defaultDateRange);
  const { data: overviewResponse, isLoading, error } = useGetOverview(filters);

  const overview = overviewResponse?.data?.data;
  const aggregateOverview = overview?.aggregateOverview;
  const firstOverview = [
    {
      title: "Revenue",
      value: `${formatNumberWithCommas(aggregateOverview?.totalRevenue)} Birr`,
      icon: FaMoneyBillTrendUp,
      // alt: aggregateOverview?.totalRevenue - overview?.totalGiveaway,
      // altLabel: "Net",
    },
    {
      title: "Total Sales",
      value: `${formatNumberWithCommas(aggregateOverview?.totalSales)} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Giveaway",
      value: `${formatNumberWithCommas(overview?.totalGiveaway)} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Games",
      value: aggregateOverview?.totalGames,
      alt: aggregateOverview?.averagePlayersPerGame,
      altLabel: "APG",
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Deposit",
      value: `${formatNumberWithCommas(overview?.totalApprovedDeposit)} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Withdrawals",
      value: `${formatNumberWithCommas(
        overview?.totalApprovedWithdrawal
      )} Birr`,

      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Players",
      value: overview?.totalUsers,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Active Players",
      value: overview?.totalActiveUsers,
      icon: FaMoneyBillTrendUp,
    },
  ];

  const columns = [
    { id: "name", name: "Shop Name" },
    { id: "agent", name: "Agent" },
    { id: "totalGames", name: "Total Games" },
    { id: "sales", name: "Sales" },
    { id: "revenue", name: "Revenue" },
  ];

  const rows =
    overview?.topShops?.map((shop) => [
      shop.shopName,
      shop.agentName,
      shop.totalGames,
      shop.totalSales,
      shop.totalRevenue,
    ]) || [];

  return (
    <div>
      {/* <DateFilter filters={filters} setFilters={setFilters} /> */}
      <div className="flex items-end justify-between border-b border-gray-300 pb-2 mb-2">
        <div>
          <p className=" md:text-2xl font-semibold">Bingo Dashboard</p>
          <p className="text-xs md:text-sm text-gray-500">
            Overview of bingo game
          </p>
        </div>
        <DateRangePicker
          onChange={(range) => setFilters({ ...filters, ...range })}
        />
      </div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <AggregateCard aggregateReport={firstOverview} />
          <GameSpecificReports overview={overview} />
        </>
      )}
      <Divider sx={{ my: 2 }} />
      <div className="flex flex-col xl:flex-row md:gap-10 mt-6 md:mt-0">
        <div className="flex-1">
          <Leaderboard />
        </div>
        <div className="flex-1">
          <div className="bg-slate-200 p-1 my-2">
            <p className="text-center text-xl font-bold text-gray-600">
              Top 5 Performing Shops
            </p>
          </div>

          <AppTable rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default BingoDashboard;
