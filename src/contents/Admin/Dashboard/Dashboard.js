import React, { useState } from "react";
import SalesRevenueTrend from "./Trend/SalesRevenueTrend";
import WalletTransactionTrend from "./Trend/WalletTransactionTrend";
import { useGetGeneralOverview } from "@/api/services/reportServices/reportServices";
import { dateRanges } from "@/dataset/dateRanges";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import {
  FaChartLine,
  FaGift,
  FaSackDollar,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa6";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import DateRangePicker from "@/components/DateRangePicker";
import { IoGameController } from "react-icons/io5";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

const Dashboard = () => {
  const [filters, setFilters] = useState(dateRanges[0]);
  const { data: overviewResponse, isLoading } = useGetGeneralOverview(filters);

  const overview = overviewResponse?.data?.data;

  const firstOverview = [
    {
      title: "Revenue",
      value: `${overview?.totalRevenue?.toFixed(2)} Birr`,
      icon: FaSackDollar,
    },
    {
      title: "Total Sales",
      value: `${overview?.totalSales} Birr`,
      icon: FaChartLine,
    },
    {
      title: "Giveaway",
      value: `${(overview?.totalGiveaway || 0).toFixed(2)} Birr`,
      icon: FaGift,
      breakdown: overview?.giveawayReport?.giveawayBreakdown,
    },
    {
      title: "Total Games",
      value: overview?.totalGames,
      icon: IoGameController,
    },
    {
      title: "Total Deposit",
      value: `${overview?.depositReport?.totalDeposit} Birr`,
      icon: FaArrowCircleDown,
      breakdown: overview?.depositReport?.depositBreakdown,
    },
    {
      title: "Total Withdrawals",
      value: `${overview?.withdrawalReport?.totalWithdrawal} Birr`,
      icon: FaArrowCircleUp,
      breakdown: overview?.withdrawalReport?.withdrawalBreakdown,
    },
    {
      title: "Total Players",
      value: overview?.totalUsers,
      icon: FaUsers,
    },
    {
      title: "Active Players",
      value: overview?.totalActiveUsers,
      icon: FaUserCheck,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-2xl font-semibold">Dashboard</p>
          <p className="text-sm text-gray-500">Overview of key metrics</p>
        </div>
        <div>
          <DateRangePicker
            onChange={(range) => setFilters({ ...filters, ...range })}
          />
        </div>
      </div>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <AggregateCard aggregateReport={firstOverview} />
      )}
      <div className="flex flex-col gap-1">
        <div className="flex-1 overflow-auto">
          <SalesRevenueTrend />
        </div>
        <div className="flex-1">
          <WalletTransactionTrend />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
