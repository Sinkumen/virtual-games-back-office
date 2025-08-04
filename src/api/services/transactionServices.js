import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const fetchPaymentRequests = async (filters) => {
  const statusParam = filters?.status ? `status=${filters?.status}` : "";
  const typeParam = filters?.type ? `type=${filters?.type}` : "";
  const pageParam = filters?.page ? `page=${filters?.page}` : "";
  const limitParam = filters?.limit ? `limit=${filters?.limit}` : "";
  const dateParams = filters?.startDate
    ? `startDate=${filters?.startDate}&endDate=${filters?.endDate}`
    : "";

  const params = [statusParam, typeParam, pageParam, limitParam, dateParams]
    .filter((param) => param)
    .join("&");

  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/transaction-request/all?${params}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const resolvePaymentRequest = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/transaction-request/${data.id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const getDepositAccounts = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/account-detail`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const createAccountEntry = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/account-detail/account-entry`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const updateAccountEntry = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/account-detail/account-entry/${data?._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const deleteAccountEntry = async (data) => {
  const options = {
    method: "delete",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/account-detail/account-entry/${data?._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const verifyTransaction = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/transaction-request/verify/${data?._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

export const useGetPaymentRequests = (filters) => {
  return useQuery({
    queryKey: ["paymentRequest", filters],
    queryFn: () => fetchPaymentRequests(filters),
  });
};

export const useResolvePaymentRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resolvePaymentRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentRequest"]);
    },
  });
};

export const useGetDepositAccount = () => {
  return useQuery({
    queryKey: ["depositAccounts"],
    queryFn: getDepositAccounts,
  });
};

export const useCreateAccountEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccountEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountEntry"]);
    },
  });
};

export const useUpdateAccountEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAccountEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountEntry"]);
    },
  });
};

export const useDeleteAccountEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccountEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["accountEntry"]);
    },
  });
};

export const useVerifyTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(["paymentRequest"]);
    },
  });
};
