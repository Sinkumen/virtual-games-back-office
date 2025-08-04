import moment from "moment";

export const parseFilters = (filters) => {
  const { startDate, endDate, name, shopOwner, shops } = filters || {};
  return {
    startDate,
    endDate,
    name,
    agentIds: shopOwner?.map((agent) => agent._id),
    shopIds: shops?.map((agent) => agent._id),
  };
};

export const defaultDateRange = {
  startDate: moment().startOf("day").utc().format(),
  endDate: moment().endOf("day").utc().format(),
};
