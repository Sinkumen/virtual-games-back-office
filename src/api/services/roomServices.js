import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const getRooms = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/room`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const createRoom = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/room`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const updateRoom = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/room/${data?._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

export const useGetRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries(["rooms"]);
    },
  });
};
