import { Skeleton } from "@mui/material";
import React from "react";

const LeaderboardSkeleton = () => {
  return (
    <div>
      <div>
        <Skeleton
          variant="rectangular"
          height={40}
          className="mb-2 w-full"
          animation="wave"
        />
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={30}
            className="mb-2 w-full"
            animation="wave"
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardSkeleton;
