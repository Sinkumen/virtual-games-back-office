import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateRange } from "../helpers/formatDateRange";
import { getDatePickerHeader } from "../helpers/getDatePickerHeader";
import { localDateRanges } from "@/dataset/dateRanges";

const DateRangePickerComponent = ({
  showTwoMonths = false,
  onOk,
  onCancel,
  startDate,
  endDate,
  activePreset,
  onChange,
}) => {
  const [dateRangeString, setDateRangeString] = useState("");

  useEffect(() => {
    setDateRangeString(formatDateRange(startDate, endDate));
  }, [startDate, endDate]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onChange({ startDate: start, endDate: end, activePreset: null });
  };

  const setDateRange = (start, end, label) => {
    onChange({ startDate: start, endDate: end, activePreset: label });
  };

  const handlePresetChange = (preset) => {
    setDateRange(preset.startDate, preset.endDate, preset.label);
  };

  const handleClear = () => {
    handleReset();
  };

  const handleOk = () => {
    if (onOk) onOk();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const containerClasses = `
    font-sans p-4 md:p-8 rounded-lg shadow-2xl mx-auto
    bg-white text-gray-800
    dark:bg-gray-900 dark:text-white 
  `;

  return (
    <div className={containerClasses}>
      <div className="mb-6 hidden md:block">
        <p className="text-sm text-primary">Select date range</p>
        <h2 className="text-3xl font-bold tracking-tight">{dateRangeString}</h2>
      </div>

      <div className="flex flex-col lg:flex-row md:border-t border-gray-200 dark:border-gray-700 md:pt-6">
        <div className="pr-0 lg:pr-8 lg:border-r border-gray-200 dark:border-gray-700 relative">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md flex justify-center">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              monthsShown={showTwoMonths && window.innerWidth >= 1024 ? 2 : 1}
              selectsRange
              inline
              fixedHeight
              calendarClassName="react-datepicker-custom"
              renderCustomHeader={getDatePickerHeader}
              disabledKeyboardNavigation
            />
          </div>
        </div>

        {/* Presets Section */}
        <div className="flex-shrink-0 w-full lg:w-48 pl-0 lg:pl-8 mt-2 lg:mt-0">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-2">
            {localDateRanges.map((btn) => {
              const isActive = activePreset === btn.label;
              return (
                <button
                  key={btn.label}
                  onClick={() => handlePresetChange(btn)}
                  className={`w-full text-left px-4 py-2 text-xs md:text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-gray-200 hover:bg-primary-light text-gray-700 dark:bg-gray-700 dark:hover:bg-primary dark:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2 md:border-t border-gray-200 dark:border-gray-700 md:pt-4 mt-6">
        <button
          disabled={!startDate || !endDate}
          onClick={handleOk}
          className="cursor-pointer px-6 py-2 rounded-md bg-primary hover:bg-primary-light transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-default"
        >
          OK
        </button>
        <button
          onClick={handleClear}
          className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200  rounded-md transition-colors  text-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          Clear
        </button>
        <button
          onClick={handleCancel}
          className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200  rounded-md transition-colors text-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
