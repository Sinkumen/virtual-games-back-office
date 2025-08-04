import { useCheckWinner } from "@/api/services/gameServices";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import AppModal from "@/components/AppModal";
import BingoCard from "@/components/BingoCard";
import WinningPatternNotice from "@/components/WinningPatternNotice";
import { ERROR } from "@/constants/toast";
import useToast from "@/hooks/useToast";
import { getDarkColor } from "@/utils/game";
import { TrophyIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaGift, FaTrophy } from "react-icons/fa6";
import GameDetails from "./GameDetails";

const GameNotice = ({
  currentGame,
  isStarted,
  isPaused,
  isCompleted,
  drawnNumbers,
  shuffleGrid,
  shuffling,
}) => {
  const queryClient = useQueryClient();
  const { showMessage } = useToast();
  const [cardToCheck, setCardToCheck] = useState("");
  const [result, setResult] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: checkWinner, isPending: isCheckingWinner } = useCheckWinner();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCardIdInputChange = (event) => {
    setCardToCheck(event.target.value);
  };

  const checkCard = () => {
    if (cardToCheck >= 1 && cardToCheck <= 100) {
      const selectedCard = currentGame.selectedCards.find(
        (card) => card?.label == cardToCheck
      );
      if (selectedCard) {
        const payload = { selectedCard: selectedCard?._id };
        checkWinner(
          { ...currentGame, payload },
          {
            onSuccess: (data) => {
              setResult(data?.data?.data);
              setIsModalOpen(true);
            },
            onError: (error) => {
              showMessage(error.message, { type: ERROR });
            },
          }
        );
      } else {
        showMessage("Card not selected for this game.", { type: "error" });
      }
    } else {
      showMessage("Please enter numbers from 1 to 100", { type: "error" });
    }
  };

  const selectedCards = currentGame.selectedCards;

  selectedCards.sort((a, b) => a?.label - b?.label);

  return (
    <div className="flex gap-2">
      <div className=" flex-1 rounded-xl bg-secondary  bg-red p-4 ">
        <div className="flex gap-2 mb-2 justify-end ">
          <AppInput
            disabled={!isStarted || !isPaused || isCompleted}
            type="number"
            className="grow"
            value={cardToCheck}
            onChange={handleCardIdInputChange}
          />
          <AppButton
            loading={isCheckingWinner}
            disabled={!isPaused || !cardToCheck || isCompleted}
            onClick={checkCard}
          >
            Check
          </AppButton>
          <AppButton
            disabled={!isPaused || isCompleted || shuffling}
            onClick={shuffleGrid}
          >
            Shuffle
          </AppButton>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(40px,_1fr))] gap-1.5 max-h-[140px]  2xl:max-h-[200px] overflow-y-auto ">
          {selectedCards?.map((card, i) => {
            const colors = getDarkColor(card?.label % 75 || 1);
            return (
              <div
                className={`rounded-lg bg-game-primary border-[1px] ${colors.borderColor}  p-2 font-bold text-white flex justify-center items-center`}
                key={i}
              >
                {card?.label}
              </div>
            );
          })}
        </div>

        {isPaused && result && (
          <AppModal
            isOpen={isModalOpen}
            closeModal={toggleModal}
            className="w-[630px] "
          >
            <div className="w-full">
              <div className="flex gap-2 mb-2 items-center">
                <AppInput
                  disabled={!isStarted || !isPaused || isCompleted}
                  type="number"
                  className="grow"
                  value={cardToCheck}
                  onChange={handleCardIdInputChange}
                />
                <AppButton
                  loading={isCheckingWinner}
                  disabled={!isPaused || !cardToCheck || isCompleted}
                  onClick={checkCard}
                >
                  Check
                </AppButton>
              </div>
              <BingoCard
                card={result?.shopCard}
                result={result}
                drawnNumbers={drawnNumbers}
                onComplete={async (isWinner) => {
                  if (isWinner) {
                    await queryClient.invalidateQueries(["currentGame"]);
                  } else {
                    toggleModal();
                  }
                }}
              />
            </div>
          </AppModal>
        )}
      </div>
      <div className="flex-2 rounded-xl bg-secondary">
        <div className="flex items-center justify-center gap-15 py-7">
          <div className="flex items-center gap-2">
            <FaTrophy className="text-game-primary text-3xl " />
            <p className="font-bold text-game-primary text-3xl">Jackpot</p>
          </div>

          <div className="flex items-center gap-2">
            <FaGift className="text-game-primary text-3xl " />
            <p className="font-bold text-game-primary text-3xl">Bonus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameNotice;
