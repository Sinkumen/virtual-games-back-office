import React, { memo } from "react";
import { getDarkColor } from "@/utils/game";
import AppText from "../../AppText";
import { FaStar } from "react-icons/fa6";

const GREEN = 35;
const RED = 47;

const isWinningCell = (row, col, winningResult) => {
  if (!winningResult || !winningResult) return false;

  return winningResult.some(([r, c]) => r === row && c === col);
};

const BingoCard = ({
  label = 1,
  card = [],
  result,
  drawnNumbers = [],
  fullScreen,
  showBorder,
  winningCells,
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
    result ? resultNumber : Number(label % 75) || 75
  );

  return (
    <div
      className={`flex ${
        showBorder
          ? `bg-white/50 dark:bg-transparent border-[1px] ${cardColors?.borderColor}`
          : `bg-white/50 dark:bg-transparent`
      } text-white p-2 rounded-lg text-center justify-center gap-2 relative`}
    >
      {/* <div
        className={`${cardColors.bgGradient} rounded-tl-lg rounded-bl-lg w-[5vw] md:w-[2.5vw]`}
      /> */}

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
        {card.map((row, i) => (
          <div key={`row-${i}`} className="flex gap-1 my-2">
            {row.map((num, j) => {
              const isSelected = drawnNumbers.includes(num) || num === 0;
              const isWinning = isWinningCell(i, j, winningCells); // true or false

              return (
                <div
                  key={`cell-${j}`}
                  className={`${
                    isSelected
                      ? cardColors.bgGradient
                      : cardColors.bgTransparent + " dark:bg-transparent"
                  } ${result && !isWinning ? "opacity-35" : ""} ${
                    cardColors.borderColor
                  } border-[1px] ${
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
              # Card {label}
            </AppText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BingoCard);
