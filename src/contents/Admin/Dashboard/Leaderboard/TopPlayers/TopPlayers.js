import { useGetTopPlayers } from "@/api/services/reportServices";
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
import AppPagination from "@/components/AppPagination";

const TopPlayers = () => {
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [filters, setFilters] = useState({
    ...defaultFilter,
    sortBy: { id: "totalGames", label: "Total Games" },
  });

  const handleSortBy = (newValue) => {
    setFilters({ ...filters, sortBy: newValue });
  };

  const onPageChange = (_event, page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const onPageSizeChange = (event) => {
    setFilters((prev) => ({ ...prev, limit: event.target.value, page: 1 }));
  };

  const { data: topPlayersData, isLoading } = useGetTopPlayers(filters);

  const topPlayers = topPlayersData?.data?.data?.topPlayers || [];
  const totalCount = topPlayersData?.data?.data?.total || 0;

  const columns = [
    { name: "Rank", id: "rank" },
    { name: "Player", id: "player" },
    { name: "Games", id: "gamesPlayed" },
    { name: "Total Cards", id: "totalCards" },
    { name: "Total Winnings", id: "totalWinnings" },
    { name: "Total Spent", id: "totalSpent" },
  ];

  const rows = topPlayers?.map((player, i) => {
    const rank = i + 1;

    return [
      ...getUserCell(player, rank),
      player.totalGames,
      player.totalCards,
      player.totalWins,
      player.totalSpent,
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
              { id: "totalGames", label: "Total Games" },
              { id: "totalCards", label: "Total Cards" },
              { id: "totalWins", label: "Total Wins" },
              { id: "totalSpent", label: "Total Spent" },
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
        <>
          <AppTable stickyFirstColumn columns={columns} rows={rows} />
          <AppPagination
            page={filters.page}
            onPageChange={onPageChange}
            count={Math.ceil(totalCount / filters.limit) || 0}
            limit={filters.limit}
            onLimitChange={onPageSizeChange}
          />
        </>
      )}
    </div>
  );
};

export default TopPlayers;
