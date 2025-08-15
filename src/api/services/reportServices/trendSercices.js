import { useQuery } from "@tanstack/react-query";
import makeApiRequest from "../../makeApiRequest";

const fetchTransactionTrends = async (filters) => {
  const params = {
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/daily-transaction-report`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const fetchSalesRevenueTrends = async (filters) => {
  const params = {
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/daily-sales-revenue-report`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

export const useGetTransactionTrends = (filters) => {
  return useQuery({
    queryKey: ["transactionTrends", filters],
    queryFn: () => fetchTransactionTrends(filters),
  });
};

export const useGetSalesRevenueTrends = (filters) => {
  console.log({ filters });
  return useQuery({
    queryKey: ["salesRevenueTrends", filters],
    queryFn: () => fetchSalesRevenueTrends(filters),
  });
};
