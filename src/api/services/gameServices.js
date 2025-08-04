import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeApiRequest from "../makeApiRequest";

const getOnlineBingoCards = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/bingo-card`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const getActiveRetailBingoCards = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/card-cluster/activeCluster`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const regenerateCards = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/bingo-card/swapCards`,
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  return await makeApiRequest(options);
};

const getCurrentGame = async () => {
  const options = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/game/currentCashierGame`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const createGame = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/game`,
    data,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const drawNumber = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/game/draw/${data._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const endGame = async (data) => {
  const options = {
    method: "put",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/game/end/${data._id}`,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

const checkWinner = async (data) => {
  const options = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_ADMIN_API}/game/check-winner/${data?._id}`,
    data: data?.payload,
    headers: { "Access-Control-Allow-Origin": "*" },
  };

  return await makeApiRequest(options);
};

/// Hooks

export const useBingoCards = () => {
  return useQuery({
    queryKey: ["bingoCards"],
    queryFn: () => getOnlineBingoCards(),
  });
};

export const useActiveRetailBingoCards = () => {
  return useQuery({
    queryKey: ["retailBingoCards"],
    queryFn: getActiveRetailBingoCards,
  });
};

export const useRegenerateBingoCards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: regenerateCards,
    onSuccess: () => {
      queryClient.invalidateQueries(["bingoCards"]);
    },
  });
};

export const useCurrentGame = () => {
  return useQuery({
    queryKey: ["currentGame"],
    queryFn: () => getCurrentGame(),
  });
};

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries(["cashierBalance"]);
    },
  });
};

export const useDrawNumber = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: drawNumber,
    onSuccess: (newData) => {
      queryClient.setQueryData(["currentGame"], (oldData) => {
        const oldGameData = oldData.data.data.game; // Access the game object from oldData
        const { selectedCards, ...restNewGameData } = newData.data.data.game; // Destructure to exclude selectedCards from newData
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              game: {
                ...oldGameData,
                ...restNewGameData,
              },
            },
          },
        };
      });
    },
  });
};

export const useEndGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: endGame,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentGame"]);
    },
  });
};

export const useCheckWinner = () => {
  return useMutation({
    mutationFn: checkWinner,
  });
};
