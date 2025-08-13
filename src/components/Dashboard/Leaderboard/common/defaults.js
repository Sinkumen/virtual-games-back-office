import moment from "moment";

export const defaultDateRange = [
  {
    startDate: moment().startOf("day").utc().format(),
    endDate: moment().endOf("day").utc().format(),
    key: "selection",
    default: false,
    label: "Today",
  },
];

export const defaultFilter = {
  limit: 10,
  page: 1,
  startDate: moment().startOf("day").utc().format(),
  endDate: moment().endOf("day").utc().format(),
};

export const rankStyles = {
  1: "ring-2 ring-offset-2 ring-yellow-400 text-yellow-500",
  2: "ring-2 ring-offset-2 ring-gray-400 text-gray-500",
  3: "ring-2 ring-offset-2 ring-orange-400 text-orange-500",
};
