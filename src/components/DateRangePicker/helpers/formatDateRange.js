import moment from "moment";

export const formatDateRange = (start, end) => {
  if (!start) return "Select date range";

  const startMoment = moment(start);
  const endMoment = moment(end);

  const startFormatted = startMoment.format("MMM D");

  if (!end) return startFormatted;

  // If the year is different, show it
  if (startMoment.year() !== endMoment.year()) {
    return `${startMoment.format("MMM D, YYYY")} – ${endMoment.format(
      "MMM D, YYYY"
    )}`;
  }

  // If the month is different, show it for the start date
  if (startMoment.month() !== endMoment.month()) {
    return `${startMoment.format("MMM D")} – ${endMoment.format("MMM D")}`;
  }

  // If same month and year
  return `${startFormatted} – ${endMoment.format("D")}`;
};
