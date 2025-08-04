import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const fetchAgents = async (page, limit, sortBy, order) => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user?role=agent&page=${page}&limit=${limit}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const fetchAgentReport = async (page, limit, filters, sortBy, order) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/report/agents?page=${page}&limit=${limit}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data: filters,
  };

  return await makeApiRequest(options);
};

const createAgent = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const updateAgent = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_RETAIL_API}/dashboard-user/${data.id}`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };
  return await makeApiRequest(options);
};

export const useGetAgentReports = (page, limit, filters) => {
  return useQuery({
    queryKey: ["agentReport", page, limit, filters],
    queryFn: () => fetchAgentReport(page, limit, filters),
  });
};

export const usePaginatedAgents = (page, limit, sortBy, order) => {
  return useQuery({
    queryKey: ["paginatedAgents", page, limit, sortBy, order],
    queryFn: () => fetchAgents({ page, limit, sortBy, order }),
  });
};

export const useGetAgents = (disabled) => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => fetchAgents(1, 1000),
    enabled: !disabled,
  });
};

export const useCreateAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries(["agents"]);
    },
  });
};

export const useUpdateAgent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAgent,
    onSuccess: () => {
      queryClient.invalidateQueries(["agents"]);
    },
  });
};

export const useUpdateAgentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAgentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["agents"]);
    },
  });
};
