import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import AppButton from "../AppButton";
import moment from "moment";

const AppDateRangePicker = ({
  selectedRange = [
    {
      startDate: moment().startOf("day").format(),
      endDate: moment().endOf("day").format(),
      key: "selection",
      default: true,
    },
  ],
  onChange,
  maxDate,
  dense = false,
  onDone,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDateRangeOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateRangeClose = () => {
    setAnchorEl(null);
  };
  const handleOnDone = () => {
    onDone({
      label: "Custom",
      startDate: moment(selectedRange[0].startDate)
        .startOf("day")
        .utc()
        .format(),
      endDate: moment(selectedRange[0].endDate).endOf("day").utc().format(),
    });
    handleDateRangeClose();
  };

  const dateRangeOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const primaryColor = "#f5b617";

  return (
    <div className="w-full md:w-auto">
      <div
        className={`flex w-full shadow-sm justify-between gap-4 rounded-md ring-1 ring-gray-300 px-3 ${
          dense ? "p-2" : "py-3"
        } text-sm whitespace-nowrap`}
        onClick={handleDateRangeOpen}
        sx={{
          display: "flex",
          gap: 2,
          borderColor: "lightgray",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 1,
          p: 1,
          flexWrap: "wrap",
        }}
      >
        <p sx={{ flex: 1, whiteSpace: "nowrap" }}>
          {selectedRange[0]?.startDate
            ? moment(selectedRange[0].startDate).format("MMM DD, YYYY")
            : "MM/DD/YYYY"}
        </p>
        <p>|</p>
        <p sx={{ flex: 1, whiteSpace: "nowrap" }}>
          {selectedRange[0]?.endDate
            ? moment(selectedRange[0].endDate).format("MMM DD, YYYY")
            : "MM/DD/YYYY"}
        </p>
      </div>
      <Popover
        id={id}
        open={dateRangeOpen}
        anchorEl={anchorEl}
        onClose={handleDateRangeClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DateRange
            onChange={(item) => {
              onChange([{ ...item.selection, default: false }]);
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            showDateDisplay={!dense}
            months={1}
            ranges={selectedRange}
            direction="horizontal"
            rangeColors={[primaryColor, "#fff", "#fff"]}
            preventSnapRefocus={selectedRange[0]?.default ? true : false}
            calendarFocus={selectedRange[0]?.default ? "backwards" : "forwards"}
            maxDate={maxDate}
          />
          <AppButton className="rounded-none" onClick={handleOnDone}>
            Done
          </AppButton>
        </Box>
      </Popover>
    </div>
  );
};

export default AppDateRangePicker;
