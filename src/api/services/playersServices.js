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
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/user/get-tenant-users`,
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
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/user/user-transactions`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const getPlayerGameHistory = async (filters) => {
  const params = {
    ...(filters?.page ? { page: filters.page } : {}),
    ...(filters?.limit ? { limit: filters.limit } : {}),
    ...(filters?.userId ? { userId: filters.userId } : {}),
    ...(filters?.provider ? { provider: filters.provider } : {}),
    ...(filters?.gameMode ? { gameMode: filters.gameMode } : {}),
  };
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/players-game-history`,
    headers: { "Access-Control-Allow-Origin": "*" },
    params,
  };

  return await makeApiRequest(options);
};

const getGameDetails = async (gameId) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/report/players-game-detail?gameId=${gameId}`,
  };

  return await makeApiRequest(options);
};

const refillPlayerBalance = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/user/update-user-balance`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };
  return await makeApiRequest(options);
};

const updateUserStatus = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/user/set-active`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };
  return await makeApiRequest(options);
};

const updateUserPromoCode = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/user/promo-code`,
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

export const useGetPlayerGameHistory = (filters) => {
  return useQuery({
    queryKey: ["playerGameHistory", filters],
    queryFn: () => getPlayerGameHistory(filters),
  });
};

export const useGetGameDetails = (gameId) => {
  return useQuery({
    queryKey: ["gameDetails", gameId],
    queryFn: () => getGameDetails(gameId),
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

export const useUpdateUserPromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserPromoCode,
    onSuccess: () => {
      queryClient.invalidateQueries(["players"]);
    },
  });
};
