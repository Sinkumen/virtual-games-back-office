import { useGetPlayerGameHistory } from "@/api/services/playersServices";
import AppPagination from "@/components/AppPagination";
import AppTable from "@/components/AppTable";
import ManagePageSkeleton from "@/components/ManagePageSkeleton/ManagePageSkeleton";
import { chipColor } from "@/constants/colors";
import { Divider } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { FaReceipt } from "react-icons/fa6";
import GameDetail from "./GameDetail";

const GameHistory = ({ player }) => {
  const [filters, setFilters] = useState({
    userId: player?._id,
    page: 1,
    limit: 20,
  });

  const {
    data: gameHistoryResponse,
    isLoading: isLoadingGameHistory,
    error,
  } = useGetPlayerGameHistory(filters);

  const onPageChange = (_event, page) => setFilters({ ...filters, page });
  const onPageSizeChange = (event) => {
    const newSize = event.target.value;
    setFilters({ ...filters, limit: newSize });
  };

  if (isLoadingGameHistory) {
    return <ManagePageSkeleton />;
  }

  const gameHistory = gameHistoryResponse?.data?.data?.gameGroups || [];
  const pagination = gameHistoryResponse?.data?.data?.pagination || {};

  const columns = [
    { id: "game", name: "Game" },
    { id: "amount", name: "Stake" },
    { id: "status", name: "Status" },
  ];

  const rows = gameHistory.map((game) => {
    return [
      <div key={game?._id}>
        <p className="font-bold text-sm text-slate-600 dark:text-slate-100 capitalize">
          {game.transactions[0]?.gameMode}
        </p>
        <p className="text-xs">
          {moment(game.transactions[0]?.createdAt).fromNow()}
        </p>
      </div>,
      <div key={game?._id}>
        <div className="flex gap-1 items-center">
          <p className="font-bold text-lg text-slate-600 dark:text-slate-100">
            {game.betAmount || game?.totalBet}
          </p>
          <p>Birr</p>
        </div>
      </div>,
      <div key={game.id} className="flex items-center gap-2">
        <div
          className={`capitalize ${chipColor(game.status).textColor} ${
            chipColor(game.status).bgColor
          } p-1 px-2 rounded-md text-center`}
        >
          {game.status.replace("_", " ")}
        </div>
        {game?.provider === "abol" && <GameDetail game={game} />}
      </div>,
    ];
  });

  return (
    <div>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <FaReceipt className="text-[40px] text-primary" />
          <div>
            <p className="font-bold ">Transactions for {player.username}</p>
          </div>
        </div>
      </div>

      <Divider sx={{ my: 1 }} />
      <AppTable className="max-h-[400px] " columns={columns} rows={rows} />
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

export default GameHistory;
