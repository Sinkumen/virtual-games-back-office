import { useQuery } from "@tanstack/react-query";
import makeApiRequest from "../../makeApiRequest";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";

const fetchOverview = async (filters) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/overview?startDate=${filters.startDate}&endDate=${filters.endDate}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data: filters,
  };

  return await makeApiRequest(options);
};

const fetchGeneralOverview = async (filters) => {
  const params = {
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/general-overview`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };
  return await makeApiRequest(options);
};

const fetchTopPlayers = async (filters) => {
  const params = {
    ...(filters.limit && { limit: filters.limit }),
    ...(filters.page && { page: filters.page }),
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
    ...(filters.sortBy && { sortBy: filters.sortBy?.id }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/top-players`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const fetchTopReferrers = async (filters) => {
  const params = {
    ...(filters.limit && { limit: filters.limit }),
    ...(filters.page && { page: filters.page }),
    ...(filters.sortBy && { sortBy: filters.sortBy?.id }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/top-referrals`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const fetchTransactions = async (filters) => {
  const params = {
    ...(filters.limit && { limit: filters.limit }),
    ...(filters.page && { page: filters.page }),
    ...(filters.startDate && { startDate: filters.startDate }),
    ...(filters.endDate && { endDate: filters.endDate }),
    ...(filters.sortBy && { sortBy: filters.sortBy?.id }),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/top-transactions`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

export const useGetOverview = (filters) => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["overview", filters],
    queryFn: () => fetchOverview(filters),
    enabled: user?.role === "admin",
  });
};

export const useGetTopPlayers = (filters) => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["topPlayers", filters],
    queryFn: () => fetchTopPlayers(filters),
    enabled: user?.role === "admin",
  });
};

export const useGetTopReferrers = (filters) => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["topReferrers", filters],
    queryFn: () => fetchTopReferrers(filters),
    enabled: user?.role === "admin",
  });
};

export const useGetTopTransactions = (filters) => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["topTransactions", filters],
    queryFn: () => fetchTransactions(filters),
    enabled: user?.role === "admin",
  });
};

export const useGetGeneralOverview = (filters) => {
  const { user } = useUserContext();

  return useQuery({
    queryKey: ["generalOverview", filters],
    queryFn: () => fetchGeneralOverview(filters),
    enabled: user?.role === "admin",
  });
};
