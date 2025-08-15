import { useGetTopReferrers } from "@/api/services/reportServices/reportServices";
import AppTable from "@/components/AppTable";
import React, { useState } from "react";
import AppSelect from "@/components/AppSelect";
import LeaderboardSkeleton from "../LeaderboardSkeleton";
import { rankStyles } from "../common/defaults";
import { getUserCell } from "../common/getUserCell";
import { sortBy } from "lodash";

const TopReferrers = () => {
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    sortBy: { id: "totalReferrals", label: "Referrals" },
  });

  const handleSortBy = (newValue) => {
    setFilters({ ...filters, sortBy: newValue });
  };

  const { data: topReferrersData, isLoading } = useGetTopReferrers(filters);

  const topReferrers = topReferrersData?.data?.data?.users || [];

  const columns = [
    { name: "Rank", id: "rank" },
    { name: "Player", id: "player" },
    { name: "Referrals", id: "gamesPlayed" },
    { name: "Referral Earnings", id: "totalCards" },
  ];

  const rows = topReferrers?.map((player, i) => {
    const rank = i + 1;

    return [
      ...getUserCell(player, rank),
      player.totalReferrals,
      player?.totalEarning?.toFixed(2),
    ];
  });

  return (
    <div>
      <div className="my-2 gap-2">
        <div className="flex flex-1 items-center gap-2">
          <AppSelect
            dense
            className="bg-[#F3F4F6]"
            value={filters.sortBy}
            placeholder="Sort By"
            options={[
              { id: "totalReferrals", label: "Referrals" },
              { id: "totalEarning", label: "Referral Earnings" },
            ]}
            onChange={handleSortBy}
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

export default TopReferrers;
