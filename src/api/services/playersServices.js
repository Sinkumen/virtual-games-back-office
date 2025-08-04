import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const getPlayers = async (filters) => {
  const params = {
    ...(filters?.phoneNumber ? { phoneNumber: filters.phoneNumber } : {}),
    ...(filters?.page ? { page: filters.page } : {}),
    ...(filters?.limit ? { limit: filters.limit } : {}),
  };
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/user/get-tenant-users`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const getPlayerTransaction = async (filters) => {
  const params = {
    ...(filters?.phoneNumber ? { phoneNumber: filters.phoneNumber } : {}),
    ...(filters?.page ? { page: filters.page } : {}),
    ...(filters?.limit ? { limit: filters.limit } : {}),
  };
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/user/user-transactions`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const refillPlayerBalance = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/user/update-user-balance`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };
  return await makeApiRequest(options);
};

const updateUserStatus = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/user/set-active`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };
  return await makeApiRequest(options);
};

export const useGetPlayers = (filters) => {
  return useQuery({
    queryKey: ["players", filters],
    queryFn: () => getPlayers(filters),
  });
};

export const useGetPlayerTransaction = (filters) => {
  return useQuery({
    queryKey: ["playerTransaction", filters],
    queryFn: () => getPlayerTransaction(filters),
  });
};

export const useRefillPlayerBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: refillPlayerBalance,
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};
