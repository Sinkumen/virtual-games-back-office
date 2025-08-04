import { Skeleton } from "@mui/material";
import React from "react";

const RoomSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Skeleton variant="rounded" height={40} width="40%" />
        <Skeleton variant="rounded" height={40} width="20%" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="flex-1 ring-1 flex flex-col gap-2 ring-gray-300 p-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <Skeleton variant="rounded" height={40} width="40%" />
              <div className="flex gap-2 w-[40%]">
                <Skeleton variant="rounded" height={40} className="flex-1" />
                <Skeleton variant="rounded" height={40} className="flex-1" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton variant="rounded" height={50} width="100%" />
              <Skeleton variant="rounded" height={50} width="100%" />
            </div>
            <div className="flex gap-2">
              <Skeleton variant="rounded" height={50} width="100%" />
              <Skeleton variant="rounded" height={50} width="100%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSkeleton;
