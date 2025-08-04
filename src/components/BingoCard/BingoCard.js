import React, { memo, useEffect } from "react";
import { getDarkColor } from "@/utils/game";
import AppButton from "../AppButton";
import Image from "next/image";
import Lottie from "lottie-react";
import lottieData from "../../../public/lottie/lost.json";
import { playAudio } from "@/utils/audio";
import AppText from "../AppText";
import confetti from "canvas-confetti";
import { FaStar } from "react-icons/fa6";

const GREEN = 35;
const RED = 47;

const firework = () => {
  const duration = 10000; // 5 seconds
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 20, // slower particles
    spread: 360,
    ticks: 150, // particles stay longer
    gravity: 0.6, // slower fall
    zIndex: 1000,
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const x = Math.random() * 0.8 + 0.1; // avoid edge cutoffs
    const y = Math.random() * 0.4 + 0.1;

    confetti({
      ...defaults,
      particleCount: 60,
      origin: { x, y },
      scalar: Math.random() * 0.4 + 0.8, // variation in size
    });
  }, 400); // slower bursts
};

const BingoCard = ({
  card = {},
  result,
  drawnNumbers = [],
  fullScreen,
  showBorder,
  onComplete,
}) => {
  const headers = [
    { label: "B", bgColor: "bg-gradient-to-b from-[#00ACFF] to-[#0566FF]" },
    { label: "I", bgColor: "bg-gradient-to-b from-[#FDDC00] to-[#FE9300]" },
    { label: "N", bgColor: "bg-gradient-to-b from-[#0ABD05] to-[#058604]" },
    { label: "G", bgColor: "bg-gradient-to-b from-[#FB2223] to-[#D1060A]" },
    { label: "O", bgColor: "bg-gradient-to-b from-[#804693] to-[#683390]" },
  ];

  const isWinningCard = result?.isWinner;
  const resultNumber = isWinningCard ? GREEN : RED;
  const cardColors = getDarkColor(
    result ? resultNumber : Math.floor(Math.random() * 75) + 1
  );

  useEffect(() => {
    if (result) {
      if (isWinningCard) {
        playAudio("/audio/WINNER.mp3");
        firework();
      } else {
        playAudio("/audio/NOT_A_WINNER.mp3");
      }
    }
  }, [card]);

  return (
    <div
      className={`break-inside-avoid flex ${
        showBorder
          ? `bg-white/50 dark:bg-transparent border-[1px] ${cardColors?.borderColor}`
          : `bg-white/50`
      } text-white p-2 rounded-lg text-center justify-center gap-4 relative`}
    >
      <div className="rounded-lg overflow-clip">
        <div
          className={`${cardColors.bgTransparent} ${cardColors.borderColor}  border-[1px] rounded-tl-lg rounded-tr-lg justify-center lg:p-2 2xl:py-3`}
        >
          <div className="flex gap-1 xs:gap-2 p-2 lg:p-0 ">
            {headers.map((header, j) => (
              <div
                key={`cell-${j}`}
                className={`flex items-center justify-center rounded-lg w-full`}
              >
                <p
                  className={`font-black ${header.bgColor} text-white flex-1 text-[12px] 2xs:text-lg 1xs:text-2xl rounded-sm md:rounded-md`}
                >
                  {header.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {card?.grid?.map((row, i) => (
          <div key={`row-${i}`} className="flex gap-1 my-2">
            {row.map((num, j) => {
              const isSelected = drawnNumbers.includes(num) || num === 0;

              return (
                <div
                  key={`cell-${j}`}
                  className={`${
                    isSelected
                      ? cardColors.bgGradient
                      : cardColors.bgTransparent
                  } ${cardColors.borderColor} border-[1px] ${
                    fullScreen
                      ? "3xs:w-[30px] 3xs:h-[30px]"
                      : "3xs:w-[20px] 3xs:h-[20px] 2xs:w-[25px] 2xs:h-[25px]"
                  }   sm:w-[30px] sm:h-[30px] lg:w-[40px] lg:h-[40px] 2xl:w-[50px] 2xl:h-[50px] rounded-sm lg:rounded-lg flex items-center justify-center`}
                >
                  {num ? (
                    <p
                      className={`${
                        isSelected ? "text-white" : cardColors.textColor
                      }  text-[10px] 2xs:text-xs 1xs:text-base font-black`}
                    >
                      {num}
                    </p>
                  ) : (
                    <FaStar className="text-[10px] 2xs:text-xs 1xs:text-lg" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div
          className={`${cardColors.bgTransparent} ${cardColors.borderColor} mt-2  border-[1px] rounded-bl-lg rounded-br-lg justify-center lg:p-1`}
        >
          <div>
            <AppText
              className={`font-bold ${cardColors.textColor} text-base m-1`}
            >
              # Card {card.label}
            </AppText>
          </div>
        </div>
      </div>
      {result && (
        <div className="flex flex-col justify-between items-center text-black pl-4">
          <p className={`${cardColors.textColor} font-bold text-xl`}>
            {isWinningCard ? "Winner" : "No a Winner 😭"}
          </p>
          {!isWinningCard && (
            <Lottie
              animationData={lottieData}
              style={{ height: 260, width: 250 }}
              loop={true}
            />
          )}

          {isWinningCard && (
            <div className="flex flex-col items-center">
              <Image
                src={`patterns/bingo_winning_pattern_${result.WinningPattern}.svg`}
                width={170}
                height={0}
                alt="winning-pattern"
              />
              <p className="font-bold text-n-dark ">WINNING PATTERN</p>
            </div>
          )}

          {isWinningCard && (
            <div className="flex gap-2 items-center">
              <p className=" text-n-dark text-xl ">Won</p>
              <p className="font-black text-n-dark text-6xl ">
                {result?.prize || 0}
              </p>
              <p className=" text-n-dark text-xl ">Birr</p>
            </div>
          )}

          <AppButton fullWidth onClick={() => onComplete(isWinningCard)}>
            Done
          </AppButton>
        </div>
      )}
    </div>
  );
};

export default memo(BingoCard);
