import AppSelect from "@/components/AppSelect";
import AppBarChart from "@/components/Dashboard/AppBarChart";
import AppDonutChart from "@/components/Dashboard/AppDonutChart";
import { formatNumberWithCommas } from "@/utils/number";
import React, { useMemo, useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const GameSpecificReports = ({ overview }) => {
  const [gameType, setGameType] = useState({ label: "Online", id: "online" });

  const report = overview?.[gameType?.id] || {};

  const firstOverview = [
    {
      title: `${gameType?.id === "online" ? "Online" : "Retail"} Total Sales`,
      value: `${
        formatNumberWithCommas(report?.aggregate?.totalSales) || 0
      } Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: `${gameType?.id === "online" ? "Online" : "Retail"} Revenue`,
      value: `${
        formatNumberWithCommas(report?.aggregate?.totalRevenue) || 0
      } Birr`,
      icon: FaMoneyBillTrendUp,
    },
    {
      title: `Total ${gameType?.id === "online" ? "Online" : "Retail"} Games`,
      value: report?.aggregate?.totalGames || 0,
      icon: FaMoneyBillTrendUp,
    },
  ];

  const labels = useMemo(
    () =>
      report?.gamesAndPlayersGraph?.map((rep) => `${rep?.stakeAmount} Birr`) ||
      [],
    [report]
  );

  const series = useMemo(
    () => report?.gamesAndPlayersGraph?.map((rep) => rep?.totalGames) || [],
    [report]
  );

  return (
    <div className="app">
      <div className="bg-slate-200 p-1 mt-2 text-gray-600">
        <p className="font-bold text-lg text-center">Game Type Breakdown</p>
      </div>
      <div className="flex flex-col xl:flex-row justify-between p-1 items-center">
        <div className="w-full flex-1">
          <AppSelect
            value={gameType}
            onChange={setGameType}
            placeholder="Select game type"
            options={[
              { label: "Online", id: "online" },
              { label: "Retail", id: "offline" },
            ]}
          />
          <div className="grid grid-cols-1 xs:grid-cols-1 xl:grid-cols-1 justify-between ring-1 ring-slate-300 rounded-xl my-2">
            {firstOverview.map((overview, i) => (
              <div
                key={i}
                className={`flex-1 ${
                  i > 0 ? "border-t-[1px]" : ""
                } border-slate-300 p-4`}
              >
                <div className="flex gap-4">
                  <div className="bg-primary/10 border-[1px] border-primary/70 p-2 sm:p-4 rounded-lg aspect-square flex items-center justify-center">
                    <overview.icon className="text-primary text-sm" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-bold text-nowrap text-xs sm:text-sm">
                      {overview.title}
                    </p>
                    <p className="font-black text-base md:text-xl lg:text-2xl">
                      {overview.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-2 flex-col-reverse xl:flex-row justify-center items-center">
          <AppDonutChart
            key={`pie-${gameType.id}${JSON.stringify(overview)}`}
            labels={labels}
            series={series}
          />
          <AppBarChart
            categories={report?.gamesAndPlayersGraph?.map(
              (rep) => `${rep?.stakeAmount} Birr`
            )}
            series={[
              {
                name: "Games",
                data:
                  report?.gamesAndPlayersGraph?.map((rep) => rep?.totalGames) ||
                  [],
              },
              {
                name: "Average No. Players",
                data:
                  report?.gamesAndPlayersGraph?.map(
                    (rep) => rep?.averagePlayersPerGame
                  ) || [],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default GameSpecificReports;
