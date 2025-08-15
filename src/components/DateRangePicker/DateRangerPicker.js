import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateRange } from "./helpers/formatDateRange";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DateRangePickerComponent from "./DateRangePickerComponent";
import moment from "moment";

const DateRangePicker = ({ onChange = () => {} }) => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    activePreset: null,
  });
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleOpen = () => {
    setTempDateRange(dateRange);
  };

  const handleCancel = (close) => {
    setDateRange(tempDateRange);
    close();
  };

  const handleOnChange = (close) => {
    const toUtcDate = (date) => (date ? moment(date).utc().format() : null);
    onChange({
      startDate: toUtcDate(dateRange?.startDate),
      endDate: toUtcDate(dateRange?.endDate),
    });
    close();
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <PopoverButton
            onClick={handleOpen}
            className="w-64 text-left px-4 py-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg ring-1 ring-gray-300 mb-2 focus:ring-1 focus:ring-primary"
          >
            <p className="text-xs text-primary">Date Range</p>
            <span className="text-lg font-semibold">
              {formatDateRange(dateRange.startDate, dateRange.endDate) ||
                "Select a date range"}
            </span>
          </PopoverButton>

          <PopoverPanel className="absolute z-10 mt-2">
            <DateRangePickerComponent
              showTwoMonths={true}
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              activePreset={dateRange.activePreset}
              onChange={setDateRange}
              onOk={() => handleOnChange(close)}
              onCancel={() => handleCancel(close)}
            />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default DateRangePicker;
