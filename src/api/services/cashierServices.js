import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const createCashier = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/dashboard-user`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const updateCashier = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/dashboard-user/${data.id}`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  return await makeApiRequest(options);
};

const getCashiers = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/dashboard-user?role=cashier`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const fetchCashierReport = async (page, limit, filters, sortBy, order) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/cashiers?page=${page}&limit=${limit}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data: filters,
  };

  return await makeApiRequest(options);
};

const refillCashierBalance = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/dashboard-user/updateBalance/${data.id}`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  return await makeApiRequest(options);
};

export const useCreateCashier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCashier,
    onSuccess: () => {
      queryClient.invalidateQueries(["cashiers"]);
    },
  });
};

export const useUpdateCashier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCashier,
    onSuccess: () => {
      queryClient.invalidateQueries(["cashiers"]);
    },
  });
};

export const useGetCashiers = () => {
  return useQuery({
    queryKey: ["cashiers"],
    queryFn: getCashiers,
  });
};

export const useCashierReports = (page, limit, filters) => {
  return useQuery({
    queryKey: ["cashierReport", page, limit, filters],
    queryFn: () => fetchCashierReport(page, limit, filters),
  });
};

export const useRefillCashierBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refillCashierBalance,
    onSuccess: () => {
      queryClient.invalidateQueries(["cashiers"]);
    },
  });
};
