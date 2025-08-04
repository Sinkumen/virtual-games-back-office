import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import React, { useEffect, useState } from "react";
import NumberDrawer from "../NumberDrawer";
import Image from "next/image";
import {
  useActiveRetailBingoCards,
  useCreateGame,
  useCurrentGame,
} from "@/api/services/gameServices";
import useToast from "@/hooks/useToast";
import { ERROR } from "@/constants/toast";
import GameLobbyLoadingSkeleton from "@/components/GameLobbyLoadingSkeleton";
import { SocketContextProvider } from "@/contexts/SocketContext/SocketContextProvider";
import { useGameContext } from "@/contexts/GameContext/GameContextProvider";

const GameLobby = () => {
  const { showMessage } = useToast();
  const { setIsGameStarted } = useGameContext();

  const defaultStake = localStorage.getItem("stake");
  const defaultCallSpeed = JSON.parse(localStorage.getItem("call_speed")) || {
    id: 3,
    label: "3 Seconds",
  };
  const defaultWinningPattern = new Set(
    JSON.parse(localStorage.getItem("winning_pattern")) || [
      "regular_vertical",
      "regular_horizontal",
      "regular_corners",
      "regular_trbl_diagonal",
      "regular_tlbr_diagonal",
    ]
  );

  const defaultPatternSet = JSON.parse(localStorage.getItem("pattern_set")) || {
    id: 1,
    label: "Regular Patterns",
    patterns: [
      "regular_vertical",
      "regular_horizontal",
      "regular_corners",
      "regular_trbl_diagonal",
      "regular_tlbr_diagonal",
    ],
  };

  const {
    data: currentGameResponse,
    isLoading: isCurrentGameLoading,
    error,
  } = useCurrentGame();

  const { mutate: createGame, isPending } = useCreateGame();

  const {
    data: retailBingoCardsResponse,
    isLoading: retailBingoCardsLoading,
    error: retailBingoCardError,
  } = useActiveRetailBingoCards();

  const [selectedCards, setSelectedCards] = useState(new Set());
  const [stake, setStake] = useState(defaultStake);
  const [callSpeed, setCallSpeed] = useState(defaultCallSpeed);
  const [winningPatterns, setWinningPatterns] = useState(defaultWinningPattern);
  const [selectedPatternSet, setSelectedPatternSet] =
    useState(defaultPatternSet);

  const currentGame = currentGameResponse?.data?.data?.game;
  const cards = retailBingoCardsResponse?.data?.data?.shopCards || [];

  const handleSelection = (card) => {
    const cardId = card?._id;
    if (selectedCards.has(cardId)) {
      setSelectedCards((prev) => {
        const temp = new Set(prev);
        temp.delete(cardId);
        return temp;
      });
    } else {
      setSelectedCards(new Set([...selectedCards, cardId]));
    }
  };

  const handleStakeChange = (event) => {
    const newValue = event.target.value;
    localStorage.setItem("stake", newValue);
    setStake(newValue);
  };

  const handleCallSpeedChange = (newValue) => {
    setCallSpeed(newValue);
    localStorage.setItem("call_speed", JSON.stringify(newValue));
  };

  const handleSelectedPatternSetChange = (newValue) => {
    setSelectedPatternSet(newValue);
    const newValueSet = new Set(newValue?.patterns || []);
    localStorage.setItem("pattern_set", JSON.stringify(newValue));
    localStorage.setItem("winning_pattern", JSON.stringify(newValue?.patterns));
    setWinningPatterns(newValueSet);
  };

  const handleWinningPatternSelection = (pattern) => {
    setWinningPatterns((prev) => {
      const temp = new Set(prev);
      if (temp.has(pattern)) {
        temp.delete(pattern);
      } else {
        temp.add(pattern);
      }
      localStorage.setItem("winning_pattern", JSON.stringify([...temp]));
      return temp;
    });
  };

  const resetBoard = () => {
    setSelectedCards(new Set());
  };

  const handleCreateGame = () => {
    const payload = {
      selectedCards: [...selectedCards],
      stakeAmount: Number(stake),
      delaySeconds: callSpeed.id,
      winningPatterns: [...winningPatterns],
    };

    createGame(payload, {
      onSuccess: (data) => {
        resetBoard();
        showMessage("Game Created Successfully!");
      },
      onError: (error) => {
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  const canCreateGame =
    selectedCards.size && stake >= 5 && callSpeed && winningPatterns.size;

  useEffect(() => {
    if (currentGameResponse?.data?.data?.game) {
      setIsGameStarted(true);
    } else {
      setIsGameStarted(false);
    }
  }, [currentGameResponse]);

  if (isCurrentGameLoading || retailBingoCardsLoading) {
    return <GameLobbyLoadingSkeleton />;
  }
  if (currentGame) {
    return (
      <SocketContextProvider>
        <NumberDrawer />
      </SocketContextProvider>
    );
  }

  return (
    <div>
      <div className="flex gap-2 h-[85vh] 2xl:px-17">
        <div className="flex-[3] rounded-xl bg-secondary grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-10 gap-2 p-4">
          {cards.map((card, index) => {
            const isSelected = selectedCards?.has(card?._id);
            return (
              <button
                key={index}
                className={`${
                  isSelected
                    ? "bg-game-primary text-white hover:bg-game-primary "
                    : "bg-gray-300 hover:bg-gray-400"
                } rounded-lg text-center transition font-bold text-xl text-gray-500`}
                onClick={() => handleSelection(card)}
              >
                {card?.label}
              </button>
            );
          })}
        </div>
        <div className="flex-1 rounded-xl bg-secondary p-4">
          <div className="flex gap-2 items-center mb-2">
            <AppInput
              value={stake}
              onChange={handleStakeChange}
              placeholder="Enter stake"
              type="number"
              min={10}
              step={10}
            />
            <AppSelect
              className="bg-[#F3F4F6]"
              value={callSpeed}
              placeholder="Call speed"
              options={[
                { id: 3, label: "3 Seconds" },
                { id: 4, label: "4 Seconds" },
                { id: 5, label: "5 Seconds" },
                { id: 6, label: "6 Seconds" },
                { id: 7, label: "7 Seconds" },
                { id: 8, label: "8 Seconds" },
                { id: 9, label: "9 Seconds" },
                { id: 10, label: "10 Seconds" },
              ]}
              onChange={handleCallSpeedChange}
            />
          </div>

          <AppSelect
            className="bg-[#F3F4F6]"
            value={selectedPatternSet}
            placeholder="Winning Pattern"
            options={[
              {
                id: 1,
                label: "Regular Patterns",
                patterns: [
                  "regular_vertical",
                  "regular_horizontal",
                  "regular_corners",
                  "regular_trbl_diagonal",
                  "regular_tlbr_diagonal",
                ],
              },
              {
                id: 2,
                label: "Special Patterns",
                patterns: [
                  "special_X",
                  "special_T",
                  "special_U",
                  "special_diamond",
                ],
              },
            ]}
            onChange={handleSelectedPatternSetChange}
          />
          <AppButton
            loading={isPending}
            disabled={!canCreateGame}
            fullWidth
            onClick={handleCreateGame}
            className="mt-2"
          >
            Create Game
          </AppButton>
          <div className="flex gap-2 mt-2">
            <AppButton fullWidth onClick={resetBoard}>
              Reset Board
            </AppButton>{" "}
            <AppButton fullWidth>Announcement</AppButton>
          </div>
          <div className="mt-2 h-[60vh] overflow-y-auto custom-scrollbar p-1">
            {selectedPatternSet?.patterns && (
              <div className="grid grid-cols-3 gap-2 ">
                {selectedPatternSet?.patterns?.map((pattern, index) => {
                  const isSelected = winningPatterns.has(pattern);

                  return (
                    <div
                      key={index}
                      className={`flex justify-center bg-white ${
                        isSelected
                          ? " outline-2 outline-game-primary"
                          : "border-[0px]"
                      } border-game-primary p-2 rounded-lg`}
                      onClick={() => handleWinningPatternSelection(pattern)}
                    >
                      <Image
                        src={`/patterns/bingo_winning_pattern_${pattern}.svg`}
                        width={0}
                        height={0}
                        alt="winning-pattern"
                        className="hover:cursor-pointer w-[16vw] xl:w-[5vw] "
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
