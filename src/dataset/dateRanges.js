import moment from "moment";

export const dateRanges = [
  {
    id: 1,
    label: "Today",
    startDate: moment().utc().format(),
    endDate: moment().utc().format(),
  },
  {
    id: 2,
    label: "Yesterday",
    startDate: moment().subtract(1, "day").startOf("day").utc().format(),
    endDate: moment().subtract(1, "day").endOf("day").utc().format(),
  },
  {
    id: 3,
    label: "This Week",
    startDate: moment().startOf("isoWeek").utc().format(),
    endDate: moment().endOf("isoWeek").utc().format(),
  },
  {
    id: 4,
    label: "Last Week",
    startDate: moment().subtract(7, "day").startOf("isoWeek").utc().format(),
    endDate: moment().subtract(7, "day").endOf("isoWeek").utc().format(),
  },
  {
    id: 5,
    label: "This Month",
    startDate: moment().startOf("month").utc().format(),
    endDate: moment().endOf("month").utc().format(),
  },
  {
    id: 6,
    label: "Last Month",
    startDate: moment().subtract(30, "day").startOf("month").utc().format(),
    endDate: moment().subtract(30, "day").endOf("month").utc().format(),
  },
  {
    id: 7,
    label: "Custom",
    startDate: moment().utc().format(),
    endDate: moment().utc().format(),
  },
];
