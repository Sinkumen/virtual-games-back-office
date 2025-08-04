import { getTenantColor } from "@/constants/colors";
import { ABOL_TENANT_ID, SKY_TENANT_ID } from "@/constants/tenant";
import {
  MenuItem,
  Pagination,
  Select,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

const theme = createTheme({
  palette: {
    primary: { main: getTenantColor(tenantId) },
    text: "#fff",
  },
});

const AppPagination = ({
  page,
  count,
  limit,
  onPageChange,
  onLimitChange,
  hideNextButton,
}) => {
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="flex text-black gap-4 mt-2 items-center rounded-lg">
      <ThemeProvider theme={theme}>
        <Pagination
          hideNextButton={isXs && hideNextButton}
          page={page}
          onChange={onPageChange}
          count={count}
          shape="rounded"
          color="primary"
          size={isXs ? "small" : "medium"}
        />
      </ThemeProvider>
      <div className="">
        <Select
          sx={{ p: 0 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          placeholder="Age"
          size="small"
          onChange={onLimitChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default AppPagination;
