import React, { useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import AppTable from "@/components/AppTable";
import { useGetOverview } from "@/api/services/reportServices";

import AggregateCard from "@/components/Dashboard/AggregateCard";
import { defaultDateRange } from "@/utils/parseFilters";
import AppDatePicker from "@/components/AppDatePicker";
import AppSelect from "@/components/AppSelect";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { dateRanges } from "@/dataset/dateRanges";
import moment from "moment";
import { Divider } from "@mui/material";
import GameSpecificReports from "./GameSpecificReports";
import DashboardSkeleton from "@/components/Dashboard/DashboardSkeleton";
import Leaderboard from "@/components/Dashboard/Leaderboard";

const BingoDashboard = () => {
  const [filters, setFilters] = useState(defaultDateRange);
  const [dateRange, setDateRange] = useState(dateRanges[0]);

  const { data: overviewResponse, isLoading, error } = useGetOverview(filters);

  const overview = overviewResponse?.data?.data;
  const aggregateOverview = overview?.aggregateOverview;
  const firstOverview = [
    {
      title: "Revenue",
      value: `${aggregateOverview?.totalRevenue} Birr`,
      icon: FaMoneyBillTrendUp,
      // alt: aggregateOverview?.totalRevenue - overview?.totalGiveaway,
      // altLabel: "Net",
    },
    {
      title: "Total Sales",
      value: `${aggregateOverview?.totalSales} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Giveaway",
      value: `${(overview?.totalGiveaway || 0).toFixed(2)} Birr`,
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
      value: `${overview?.totalApprovedDeposit} Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: "Total Withdrawals",
      value: `${overview?.totalApprovedWithdrawal} Birr`,

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
      <div className=" mx-0 rounded-lg flex gap-2 w-full flex-col xl:flex-row mb-2">
        <AppSelect
          name="Date"
          Icon={CalendarDaysIcon}
          options={dateRanges}
          placeholder="Select date range."
          value={dateRange}
          onChange={(value) => {
            setDateRange(value);
            setFilters((prev) => ({
              ...prev,
              startDate: moment(value.startDate).startOf("day").utc().format(),
              endDate: moment(value.endDate).endOf("day").utc().format(),
            }));
          }}
        />
        <div className="flex gap-2 flex-2">
          <AppDatePicker
            value={moment(filters?.startDate)._d}
            placeholder="Select start date"
            onChange={(newDate) => {
              setFilters((prev) => ({
                ...prev,
                startDate: moment(newDate).startOf("day").utc().format(),
              }));
              setDateRange(dateRanges.at(-1));
            }}
            name={"from"}
            label={"From"}
          />
          <AppDatePicker
            value={moment(filters?.endDate)._d}
            placeholder="Select end date"
            onChange={(newDate) => {
              setFilters((prev) => ({
                ...prev,
                endDate: moment(newDate).endOf("day").utc().format(),
              }));
              setDateRange(dateRanges.at(-1));
            }}
            name={"to"}
            label={"To"}
          />
        </div>
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
