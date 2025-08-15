import moment from "moment";

export const dateRanges = [
  {
    id: 1,
    label: "Today",
    startDate: moment().utc().startOf("day").format(),
    endDate: moment().utc().endOf("day").format(),
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

export const localDateRanges = [
  {
    id: 1,
    label: "Today",
    startDate: moment().startOf("day").format(),
    endDate: moment().endOf("day").format(),
  },
  {
    id: 2,
    label: "Yesterday",
    startDate: moment().subtract(1, "day").startOf("day").format(),
    endDate: moment().subtract(1, "day").endOf("day").format(),
  },
  {
    id: 3,
    label: "This Week",
    startDate: moment().startOf("isoWeek").format(),
    endDate: moment().endOf("isoWeek").format(),
  },
  {
    id: 4,
    label: "Last Week",
    startDate: moment().subtract(7, "day").startOf("isoWeek").format(),
    endDate: moment().subtract(7, "day").endOf("isoWeek").format(),
  },
  {
    id: 5,
    label: "This Month",
    startDate: moment().startOf("month").format(),
    endDate: moment().endOf("month").format(),
  },
  {
    id: 6,
    label: "Last Month",
    startDate: moment().subtract(30, "day").startOf("month").format(),
    endDate: moment().subtract(30, "day").endOf("month").format(),
  },
];

export const trendDateRanges = [
  {
    id: "thisWeek",
    label: "This Week",
    startDate: moment().startOf("isoWeek").utc().format(),
    endDate: moment().endOf("isoWeek").utc().format(),
  },
  {
    id: "lastWeek",
    label: "Last Week",
    startDate: moment().subtract(7, "day").startOf("isoWeek").utc().format(),
    endDate: moment().subtract(7, "day").endOf("isoWeek").utc().format(),
  },
  {
    id: "thisMonth",
    label: "This Month",
    startDate: moment().startOf("month").utc().format(),
    endDate: moment().endOf("month").utc().format(),
  },
  {
    id: "lastMonth",
    label: "Last Month",
    startDate: moment().subtract(30, "day").startOf("month").utc().format(),
    endDate: moment().subtract(30, "day").endOf("month").utc().format(),
  },
];
