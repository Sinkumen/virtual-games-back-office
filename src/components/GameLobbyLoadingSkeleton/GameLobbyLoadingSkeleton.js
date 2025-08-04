import { Skeleton } from "@mui/material";
import React from "react";

const GameLobbyLoadingSkeleton = () => {
  return (
    <div className="flex p-4 w-full h-[85vh] gap-6">
      <div className="flex-[3] grid grid-cols-[repeat(auto-fill,_minmax(5vw,_1fr))] gap-4 w-full">
        {Array.from({ length: 75 }, (_, i) => i + 1).map((num) => (
          <Skeleton key={num} variant="rounded" sx={{ height: "5vw" }} />
        ))}
      </div>
      <div className="flex-1">
        <Skeleton variant="rounded" sx={{ height: "80vh" }} />
      </div>
    </div>
  );
};

export default GameLobbyLoadingSkeleton;
