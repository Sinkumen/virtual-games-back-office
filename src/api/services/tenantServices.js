import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const getOnlineTenantSetting = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/tenant/onlineSettings`,
  };

  return await makeApiRequest(options);
};

const updateOnlineTenantSetting = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/tenant/onlineSettings`,
    data,
  };

  return await makeApiRequest(options);
};

export const useGetOnlineTenantSetting = () => {
  return useQuery({
    queryKey: ["onlineTenantSetting"],
    queryFn: () => getOnlineTenantSetting(),
  });
};

export const useUpdateOnlineTenantSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOnlineTenantSetting,
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineTenantSetting"]);
    },
  });
};
