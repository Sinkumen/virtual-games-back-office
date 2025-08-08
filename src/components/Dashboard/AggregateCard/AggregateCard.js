import { Tooltip } from "@mui/material";
import React from "react";

const AggregateCard = ({ aggregateReport }) => {
  return (
    <div
      className={`grid grid-cols-2 xl:grid-cols-4 justify-between ring-1 ring-slate-300 rounded-xl `}
    >
      {aggregateReport.map((overview, i) => {
        const isLastItem = i === aggregateReport.length - 1;
        const isOddLength = aggregateReport.length % 2 !== 0;

        return (
          <div
            key={i}
            className={`flex-1 w-full ${
              i > 0 ? (i % 2 === 0 ? "md:border-l" : "border-l") : ""
            } border-slate-300 p-2 md:p-6 ${
              isOddLength && isLastItem
                ? "max-md:col-span-full max-md:justify-center max-md:items-center max-md:border-b-[1px]"
                : ""
            } ${
              !(isOddLength && isLastItem) &&
              Math.ceil((i + 1) / 2) !== Math.ceil(aggregateReport.length / 2)
                ? "border-b"
                : ""
            }`}
          >
            <div
              className={`flex gap-4 ${
                isOddLength ? "max-md:justify-center" : ""
              }`}
            >
              <div className="bg-primary/10 border-[1px] border-primary/70 p-2 sm:p-4 rounded-lg aspect-square flex items-center justify-center">
                <overview.icon className="text-primary text-sm" />
              </div>

              <div>
                <Tooltip title={overview.toolTip} arrow>
                  <p className="text-gray-400 font-bold text-xs sm:text-sm">
                    {overview.title}
                  </p>
                </Tooltip>
                <div className="flex gap-2 items-center text-sm">
                  <p className="font-black text-base md:text-xl lg:text-2xl">
                    {overview.value}
                  </p>
                  {overview?.alt && (
                    <p className="text-gray-500 font-semibold">
                      {overview.alt} {overview.altLabel}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AggregateCard;
