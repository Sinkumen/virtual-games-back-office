import { Grid, Paper, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="p-5 bg-gray-100">
      <Skeleton
        variant="rectangular"
        height={50}
        className="mb-2 w-full"
        animation="wave"
      />
      {/* Top Stats */}
      <div className="flex gap-5 justify-between mb-5">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={"100%"}
            height={80}
            animation="wave"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="flex items-center justify-between gap-5 mb-5">
        <div>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              sx={{ height: 80, width: 200, mb: 1 }}
              animation="wave"
            />
          ))}
        </div>
        {/* Donut Chart */}
        <Skeleton
          variant="circular"
          width={200}
          height={200}
          animation="wave"
        />

        {/* Histogram */}
        <div className="flex items-end gap-2">
          <Skeleton
            variant="rectangular"
            width={40}
            height={150}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={40}
            height={100}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={40}
            height={50}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={40}
            height={30}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={40}
            height={20}
            animation="wave"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
