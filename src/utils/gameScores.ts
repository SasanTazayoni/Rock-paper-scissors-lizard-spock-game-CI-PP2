export const updateGameScores = (
  result: "WIN" | "LOSE",
  setPlayerGameWins: React.Dispatch<React.SetStateAction<number>>,
  setComputerGameWins: React.Dispatch<React.SetStateAction<number>>
) => {
  const stored = localStorage.getItem("gameScores");
  let parsed: { player?: number; computer?: number } = {};
  try {
    parsed = stored ? JSON.parse(stored) : {};
  } catch {
    localStorage.removeItem("gameScores");
  }
  const { player = 0, computer = 0 } = parsed;

  let updatedPlayer = player;
  let updatedComputer = computer;

  if (result === "WIN") {
    updatedPlayer += 1;
    setPlayerGameWins(updatedPlayer);
  } else if (result === "LOSE") {
    updatedComputer += 1;
    setComputerGameWins(updatedComputer);
  }

  localStorage.setItem(
    "gameScores",
    JSON.stringify({ player: updatedPlayer, computer: updatedComputer })
  );
};
