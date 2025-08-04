import React, { useContext, useState } from "react";
import GameContext from "./GameContext";

const GameContextProvider = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  return (
    <GameContext.Provider value={{ isGameStarted, setIsGameStarted }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);

export default GameContextProvider;
