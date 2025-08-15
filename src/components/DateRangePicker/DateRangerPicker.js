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
    setTempDateRange();
    close();
  };

  return (
    <Popover className="relative">
      {({ close, open }) => {
        if (!open && tempDateRange) {
          if (
            dateRange.startDate !== tempDateRange.startDate ||
            dateRange.endDate !== tempDateRange.endDate ||
            dateRange.activePreset !== tempDateRange.activePreset
          ) {
            setDateRange(tempDateRange);
          }
        }
        return (
          <>
            <PopoverButton
              onClick={handleOpen}
              className=" text-left px-4 py-1 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg ring-1 ring-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <p className="text-xs font-semibold text-primary">Time Period</p>
              <span className="md:text-lg font-semibold">
                {dateRange.activePreset ||
                  formatDateRange(dateRange.startDate, dateRange.endDate) ||
                  "Select a date range"}
              </span>
            </PopoverButton>

            <PopoverPanel className="absolute z-10 ring-1 ring-gray-200 rounded-lg right-0 min-w-max">
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
        );
      }}
    </Popover>
  );
};

export default DateRangePicker;
