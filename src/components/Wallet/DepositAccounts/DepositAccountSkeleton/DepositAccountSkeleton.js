import { Skeleton } from "@mui/material";
import React from "react";

const DepositAccountSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex gap-2 justify-between">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} sx={{ height: 50, flex: 1 }} />
        ))}
      </div>
      <div>
        {[4, 5, 6].map((j) => (
          <Skeleton key={j} sx={{ height: 50, flex: 1 }} />
        ))}
      </div>
    </div>
  );
};

export default DepositAccountSkeleton;
