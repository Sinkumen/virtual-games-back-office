import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const signIn = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user/signin`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const getMe = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user/me`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const updateUser = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user/${data.id}`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const getBalance = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user/balance`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const changePassword = async (data) => {
  const options = {
    method: "patch",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/change-password`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useGetMe = (enabled) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useGetBalance = () => {
  return useQuery({
    queryKey: ["cashierBalance"],
    queryFn: getBalance,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 30,
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
    },
  });
};

export const useUpdateUser = (queryKeyAffected) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeyAffected]);
    },
  });
};
