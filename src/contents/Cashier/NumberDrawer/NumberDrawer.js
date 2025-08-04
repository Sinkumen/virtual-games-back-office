import useToast from "@/hooks/useToast";
import React, { useEffect, useRef, useState } from "react";
import { playAudio } from "@/utils/audio";

import { useDrawNumber, useEndGame } from "@/api/services/gameServices";
import { useQueryClient } from "@tanstack/react-query";
import { ERROR } from "@/constants/toast";
import AppDialog from "@/components/AppDialog/AppDialog";
import GameNotice from "./GameNotice";
import { useSocketContext } from "@/contexts/SocketContext/SocketContextProvider";
import BeatLoader from "@/components/BeatLoader";
import { useUserContext } from "@/contexts/UserContext/UserContextProvider";
import GameDetails from "./GameNotice/GameDetails";
import NumberDrawBall from "./NumberDrawBall";
import GameControls from "./GameControls";
import WinningPatternNotice from "@/components/WinningPatternNotice";

const gridRows = [
  {
    label: "B",
    numbers: Array.from({ length: 15 }, (_, i) => i + 1),
    bgColor: "bg-gradient-to-b from-b-light to-b-dark",
  },
  {
    label: "I",
    numbers: Array.from({ length: 15 }, (_, i) => i + 16),
    bgColor: "bg-gradient-to-b from-i-light to-i-dark",
  },
  {
    label: "N",
    numbers: Array.from({ length: 15 }, (_, i) => i + 31),
    bgColor: "bg-gradient-to-b from-n-light to-n-dark",
  },
  {
    label: "G",
    numbers: Array.from({ length: 15 }, (_, i) => i + 46),
    bgColor: "bg-gradient-to-b from-g-light to-g-dark",
  },
  {
    label: "O",
    numbers: Array.from({ length: 15 }, (_, i) => i + 61),
    bgColor: "bg-gradient-to-b from-o-light to-o-dark",
  },
];

const NumberDrawer = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useToast();

  const { socket } = useSocketContext();
  const { user } = useUserContext();

  const pendingDrawRef = useRef(); // Store the pending draw result

  const currentGame = queryClient.getQueryData(["currentGame"])?.data?.data
    ?.game;

  const { mutate: endGame, isPending: isEndingGame } = useEndGame();

  const [countdown, setCountdown] = useState(3);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [isPaused, setIsPaused] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGameDisconnected, setIsGameDisconnected] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [shuffledGridRows, setShuffledGridRows] = useState(gridRows);

  const shuffleGrid = () => {
    playAudio("/audio/shuffle.mp3");
    setShuffling(true);
    let count = 0;

    const generateShuffledGrid = () =>
      gridRows.map((row) => {
        const shuffled = [...row.numbers];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return {
          ...row,
          numbers: shuffled,
        };
      });

    const interval = setInterval(() => {
      setShuffledGridRows(generateShuffledGrid());
      count++;
      if (count >= 50) {
        clearInterval(interval);
        setShuffledGridRows(gridRows);
        setShuffling(false);
      }
    }, 100);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const isStarted = currentGame?.status !== "pending";
  const isCompleted = currentGame?.status === "completed";

  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) {
      const drawSequence = [...currentGame.drawSequence];
      if (currentGame.status === "active") {
        const newDraw = drawSequence.pop();
        pendingDrawRef.current = { newDraw, updatedGame: currentGame };
      }
      setCountdown(currentGame.delaySeconds);
      setDrawnNumbers(drawSequence);
      setSelectedNumber(drawSequence?.at(-1));
    }
  }, [currentGame]);

  useEffect(() => {
    if (!socket) return;

    const handleNumberDrawn = (message) => {
      const updatedGame = message.game;
      const newDraw = message.number;
      pendingDrawRef.current = { newDraw, updatedGame };

      const selectedCards =
        currentGame?.selectedCards || updatedGame?.selectedCards;

      const prize = currentGame?.prize || 0;

      queryClient.setQueryData(["currentGame"], (oldResponse) => {
        oldResponse.data.data.game = { ...updatedGame, selectedCards, prize };
        return oldResponse;
      });
    };

    const handleDrawNumberError = (error) => {
      showMessage(error?.message, { type: ERROR });
    };

    socket.on("number_drawn", handleNumberDrawn);
    socket.on("'draw_number_error'", handleDrawNumberError);

    socket.on("connect", () => {
      setIsGameDisconnected(false);
    });

    socket.on("reconnect", () => {
      setIsGameDisconnected(false);
    });

    socket.on("disconnect", () => {
      setIsGameDisconnected(true);
    });

    return () => {
      socket.off("number_drawn", handleNumberDrawn);
      socket.off("'draw_number_error'", handleDrawNumberError);

      socket.off("connect");
      socket.off("reconnect");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    if (currentGame.status === "completed") {
      queryClient.invalidateQueries(["currentGame"]);
    }
    if (!isPaused && !isCompleted) {
      const drawNumber = () => {
        pendingDrawRef.current = null;

        socket.emit("draw_number", {
          gameId: currentGame?._id,
          cashierId: user?._id,
        });
      };

      if (!pendingDrawRef.current) {
        drawNumber();
      }

      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev < 1) {
            if (pendingDrawRef.current) {
              const { newDraw, updatedGame } = pendingDrawRef.current;
              playAudio(`/audio/numbers/${newDraw}.mp3`);
              setSelectedNumber(newDraw);
              setDrawnNumbers(updatedGame.drawSequence);
            }
            drawNumber();
            return currentGame?.delaySeconds || 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [isPaused, isCompleted]);

  const startTimer = () => {
    if (!isStarted) {
      setIsPaused(false);
      playAudio("/audio/actions/game_started.mp3");
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(timerRef.current);
    playAudio("/audio/actions/game_paused.mp3");
  };

  const resumeTimer = () => {
    if (isPaused) {
      setIsPaused(false);
      playAudio("/audio/actions/game_started.mp3");
    }
  };

  const stopTimer = () => {
    toggleDialog();
  };

  const handleEndGame = () => {
    endGame(currentGame, {
      onSuccess: () => {
        queryClient.invalidateQueries(["currentGame"]);
        showMessage("Game ended successfully", { type: "success" });
        toggleDialog();
      },
      onError: (error) => {
        showMessage(error.message, { type: ERROR });
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {isGameDisconnected && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center bg-white p-5 rounded-lg">
            <BeatLoader />
            <div className="text-black text-xl font-bold animate-pulse">
              Reconnecting...
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <GameControls
              isStarted={isStarted}
              isPaused={isPaused}
              start={startTimer}
              pause={pauseTimer}
              resume={resumeTimer}
              end={stopTimer}
              shuffling={shuffling}
            />
          </div>
          <div className="flex-2">
            <GameDetails currentGame={currentGame} />
          </div>
        </div>

        <div className="flex gap-2 ">
          <NumberDrawBall
            selectedNumber={selectedNumber}
            isPaused={isPaused}
            isStarted={isStarted}
            currentGame={currentGame}
          />

          <div className="flex lg:flex-[4] lg:flex-col">
            {(shuffling ? shuffledGridRows : gridRows).map((row, i) => (
              <div
                key={i}
                className="flex gap-2 m-1 text-black rounded-lg justify-center flex-col lg:flex-row"
              >
                <p
                  className={`flex-1 min-w-[50px] lg:min-w-[0px] max-w-[55px] 2xl:max-w-[65px] aspect-square ${row.bgColor} rounded-lg text-center font-bold text-[1em] xl:text-[1.5em] text-white flex items-center justify-center`}
                >
                  {row.label}
                </p>
                {row.numbers.map((number) => (
                  <div
                    key={number}
                    className={`flex-1 min-w-[50px] lg:min-w-[0px]  max-w-[55px] 2xl:max-w-[65px] aspect-square ${
                      drawnNumbers?.includes(number)
                        ? "bg-game-primary text-white"
                        : "bg-gray-300"
                    } rounded-lg text-center font-bold text-[1em] xl:text-[1.2em]  text-gray-500 transition flex items-center justify-center`}
                  >
                    <p>{number}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="rounded-xl flex items-center bg-secondary p-2 justify-center gap-4">
            <WinningPatternNotice
              winningPatterns={currentGame.winningPatterns}
            />
          </div>
        </div>
      </div>

      <GameNotice
        currentGame={currentGame}
        isStarted={isStarted}
        isPaused={isPaused}
        isCompleted={isCompleted}
        drawnNumbers={drawnNumbers}
        shuffleGrid={shuffleGrid}
        shuffling={shuffling}
      />

      <AppDialog
        warning
        open={isDialogOpen}
        onClose={toggleDialog}
        onConfirm={handleEndGame}
        isLoading={isEndingGame}
      />
    </div>
  );
};

export default NumberDrawer;
