import AppDatePicker from "@/components/AppDatePicker";
import AppSelect from "@/components/AppSelect";
import { dateRanges } from "@/dataset/dateRanges";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import React, { useState } from "react";

const DateFilter = ({ setFilters, filters }) => {
  const [dateRange, setDateRange] = useState(dateRanges[0]);
  return (
    <div className=" mx-0 rounded-lg flex gap-2 w-full flex-col xl:flex-row mb-2">
      <AppSelect
        name="Date"
        Icon={CalendarDaysIcon}
        options={dateRanges}
        placeholder="Select date range."
        value={dateRange}
        onChange={(value) => {
          setDateRange(value);
          setFilters((prev) => ({
            ...prev,
            startDate: moment(value.startDate).startOf("day").utc().format(),
            endDate: moment(value.endDate).endOf("day").utc().format(),
          }));
        }}
      />
      <div className="flex gap-2 flex-2">
        <AppDatePicker
          value={moment(filters?.startDate)._d}
          placeholder="Select start date"
          onChange={(newDate) => {
            setFilters((prev) => ({
              ...prev,
              startDate: moment(newDate).startOf("day").utc().format(),
            }));
            setDateRange(dateRanges.at(-1));
          }}
          name={"from"}
          label={"From"}
        />
        <AppDatePicker
          value={moment(filters?.endDate)._d}
          placeholder="Select end date"
          onChange={(newDate) => {
            setFilters((prev) => ({
              ...prev,
              endDate: moment(newDate).endOf("day").utc().format(),
            }));
            setDateRange(dateRanges.at(-1));
          }}
          name={"to"}
          label={"To"}
        />
      </div>
    </div>
  );
};

export default DateFilter;
