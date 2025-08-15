import React, { useState } from "react";
import SalesRevenueTrend from "./Trend/SalesRevenueTrend";
import WalletTransactionTrend from "./Trend/WalletTransactionTrend";
import { useGetGeneralOverview } from "@/api/services/reportServices/reportServices";
import { dateRanges } from "@/dataset/dateRanges";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AggregateCard from "@/components/Dashboard/AggregateCard";
import DateRangePicker from "@/components/DateRangePicker";

const Dashboard = () => {
  const [filters, setFilters] = useState(dateRanges[0]);
  const { data: overviewResponse, isLoading } = useGetGeneralOverview(filters);

  const overview = overviewResponse?.data?.data;

  const firstOverview = [
    {
      title: "Revenue",
      value: `${overview?.totalRevenue} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Sales",
      value: `${overview?.totalSales} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Giveaway",
      value: `${(overview?.totalGiveaway || 0).toFixed(2)} Birr`,
      icon: FaMoneyBillTrendUp,
      breakdown: overview?.giveawayReport?.giveawayBreakdown,
    },
    {
      title: "Total Games",
      value: overview?.totalGames,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Deposit",
      value: `${overview?.depositReport?.totalDeposit} Birr`,
      icon: FaMoneyBillTrendUp,
      breakdown: overview?.depositReport?.depositBreakdown,
    },
    {
      title: "Total Withdrawals",
      value: `${overview?.withdrawalReport?.totalWithdrawal} Birr`,
      icon: FaMoneyBillTrendUp,
      breakdown: overview?.withdrawalReport?.withdrawalBreakdown,
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

  console.log({ overview });

  return (
    <div>
      Dashboard
      <div>
        <DateRangePicker
          onChange={(range) => setFilters({ ...filters, ...range })}
        />
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
