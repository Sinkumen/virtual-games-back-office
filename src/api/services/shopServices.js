import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const getShops = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/shop`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const fetchShopReport = async (page, limit, filters, sortBy, order) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/report/shops?page=${page}&limit=${limit}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data: filters,
  };

  return await makeApiRequest(options);
};

const createShop = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/shop`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const updateShop = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/shop/${data.id}`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const getShopCardVariants = async (data) => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/card-cluster/all?shopId=${data._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const updateShopCardVariant = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/card-cluster/${data.id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const activateShopCardVariant = async (data) => {
  const shopId = data.shopId;
  delete data.shopId;
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/card-cluster/shops/${shopId}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

export const useCreateShops = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createShop,
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
    },
  });
};

export const useUpdateShops = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShop,
    onSuccess: () => {
      queryClient.invalidateQueries(["shops"]);
    },
  });
};

export const useGetShops = (disabled) => {
  return useQuery({
    queryKey: ["shops"],
    queryFn: getShops,
    enabled: !disabled,
  });
};

export const useShopReports = (page, limit, filters) => {
  return useQuery({
    queryKey: ["shopReport", page, limit, filters],
    queryFn: () => fetchShopReport(page, limit, filters),
  });
};

export const useGetShopCardVariants = (data) => {
  return useQuery({
    queryKey: ["shopCardVariants", data],
    queryFn: () => getShopCardVariants(data),
  });
};

export const useUpdateShopCardVariants = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateShopCardVariant,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopCardVariants"]);
    },
  });
};

export const useActivateShopCardVariants = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateShopCardVariant,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopCardVariants"]);
    },
  });
};
