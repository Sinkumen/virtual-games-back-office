import { Skeleton } from "@mui/material";
import React from "react";

const TableSkeleton = () => {
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const cells = Array.from({ length: 5 }, (_, i) => i + 11);
  return (
    <div className="flex-1">
      {rows.map((row) => (
        <div key={row + "first"} className="flex gap-2">
          {cells.map((cell) => (
            <Skeleton
              key={cell + "second"}
              animation="wave"
              variant="rounded"
              sx={{ width: "100%", height: 30, mb: "16px" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
