import AppTab from "@/components/AppTab";
import React from "react";
import TopPlayers from "./TopPlayers";
import TopReferrers from "./TopReferrers";
import TopTransactions from "./TopTransactions";

const Leaderboard = () => {
  const tabs = [
    { content: <p className="text-sm py-1">Game</p>, id: "topPlayers" },
    {
      content: <p className="text-sm py-1">Transaction</p>,
      id: "topTransactions",
    },
    { content: <p className="text-sm py-1">Referral</p>, id: "topReferrers" },
  ];

  const panels = [
    { content: <TopPlayers />, id: "topPlayers" },
    { content: <TopTransactions />, id: "topTransactions" },
    { content: <TopReferrers />, id: "topReferrers" },
  ];
  return <AppTab title="Ranks" tabs={tabs} tabPanels={panels} />;
};

export default Leaderboard;
