import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";

const BingoCardsSkeleton = () => {
  return (
    <div>
      <div className="hidden md:flex justify-between gap-5 mb-3">
        <Skeleton variant="rounded" width={300} height={30} />
        <Skeleton variant="rounded" width={300} height={30} />
        <Skeleton variant="rounded" width={300} height={30} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 25 }).map((_, index) => (
          <div key={index} className="flex justify-center">
            <Box sx={{ width: 300, p: 1 }}>
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={40}
                sx={{ borderRadius: 1, mb: 1 }}
              />

              <Grid container spacing={1} sx={{ mb: 1 }}>
                {Array.from({ length: 25 }).map((_, index) => (
                  <Grid item xs={2.4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={40}
                      sx={{ borderRadius: 1 }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCardsSkeleton;
