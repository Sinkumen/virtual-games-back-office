import BingoCards from "@/contents/Admin/OnlineManagement/BingoCards";
import MainLayoutLight from "@/layouts/MainLayoutLight";
import React from "react";

const BingoCardsPage = () => {
  return (
    <>
      <title>Bingo Cards</title>
      <MainLayoutLight>
        <BingoCards />
      </MainLayoutLight>
    </>
  );
};

export default BingoCardsPage;
