import {
  useGetTopPlayers,
  useGetTopTransactions,
} from "@/api/services/reportServices/reportServices";
import AppTable from "@/components/AppTable";
import React, { useState } from "react";
import AppDateRangePicker from "@/components/AppDateRangePicker";
import AppSelect from "@/components/AppSelect";
import { dateRanges } from "@/dataset/dateRanges";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import LeaderboardSkeleton from "../LeaderboardSkeleton";
import {
  defaultDateRange,
  defaultFilter,
  rankStyles,
} from "../common/defaults";
import { getUserCell } from "../common/getUserCell";

const TopTransactions = () => {
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [filters, setFilters] = useState({
    ...defaultFilter,
    sortBy: { id: "totalDeposit", label: "Deposit Amount" },
  });

  const handleSortBy = (newValue) => {
    setFilters({ ...filters, sortBy: newValue });
  };

  const { data: topTransactionsData, isLoading } =
    useGetTopTransactions(filters);

  const topTransactions = topTransactionsData?.data?.data?.users || [];

  const columns = [
    { name: "Rank", id: "rank" },
    { name: "Player", id: "player" },
    { name: "Total Deposit", id: "totalDeposit" },
    { name: "Total Withdrawals", id: "totalWithdrawals" },
  ];

  const rows = topTransactions?.map((player, i) => {
    const rank = i + 1;

    return [
      ...getUserCell(player, rank),
      player.totalDeposit,
      player.totalWithdrawal,
    ];
  });

  return (
    <div>
      <div className="my-2 gap-2">
        <div className="flex flex-1 items-center gap-2">
          <AppSelect
            dense
            name="Date"
            Icon={CalendarDaysIcon}
            options={dateRanges}
            placeholder="Select date range."
            value={dateRange?.[0]}
            onChange={(value) => {
              setDateRange([{ ...value, key: "selection", default: false }]);
              setFilters((prev) => ({
                ...prev,
                startDate: moment(value.startDate)
                  .startOf("day")
                  .utc()
                  .format(),
                endDate: moment(value.endDate).endOf("day").utc().format(),
              }));
            }}
          />
          <AppSelect
            dense
            className="bg-[#F3F4F6]"
            value={filters.sortBy}
            placeholder="Sort By"
            options={[
              { id: "totalDeposit", label: "Deposit Amount" },
              { id: "totalWithdrawal", label: "Withdrawal Amount" },
            ]}
            onChange={handleSortBy}
          />
        </div>
        <div className="flex-1 my-2">
          <AppDateRangePicker
            dense
            selectedRange={dateRange}
            onChange={setDateRange}
            maxDate={new Date()}
            onDone={(newDateRange) => {
              setDateRange([newDateRange]);
              setFilters({
                ...filters,
                startDate: newDateRange.startDate,
                endDate: newDateRange.endDate,
              });
            }}
          />
        </div>
      </div>
      {isLoading ? (
        <LeaderboardSkeleton />
      ) : (
        <AppTable stickyFirstColumn columns={columns} rows={rows} />
      )}
    </div>
  );
};

export default TopTransactions;
