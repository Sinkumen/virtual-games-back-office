import { Skeleton } from "@mui/material";
import React from "react";

const SettingsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex-1 ring-1 flex flex-col gap-2 ring-gray-300 p-4 rounded-lg"
        >
          <div className="flex gap-2">
            <Skeleton variant="rounded" height={50} width="100%" />
            <Skeleton variant="rounded" height={50} width="100%" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="rounded" height={50} width="100%" />
            <Skeleton variant="rounded" height={50} width="100%" />
          </div>
          <Skeleton variant="rounded" height={50} width="100%" />
        </div>
      ))}
    </div>
  );
};

export default SettingsSkeleton;
