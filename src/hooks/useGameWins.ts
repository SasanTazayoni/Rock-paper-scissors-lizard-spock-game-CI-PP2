import { useState, useEffect } from "react";

export function useGameWins() {
  const [playerGameWins, setPlayerGameWins] = useState(0);
  const [computerGameWins, setComputerGameWins] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("gameScores");
    if (stored) {
      const { player, computer } = JSON.parse(stored);
      setPlayerGameWins(player || 0);
      setComputerGameWins(computer || 0);
    }
  }, []);

  return {
    playerGameWins,
    setPlayerGameWins,
    computerGameWins,
    setComputerGameWins,
  };
}
