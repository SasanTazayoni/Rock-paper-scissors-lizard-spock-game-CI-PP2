export const updateGameScores = (
  result: "WIN" | "LOSE",
  setPlayerGameWins: React.Dispatch<React.SetStateAction<number>>,
  setComputerGameWins: React.Dispatch<React.SetStateAction<number>>
) => {
  const stored = localStorage.getItem("gameScores");
  const { player = 0, computer = 0 } = stored ? JSON.parse(stored) : {};

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
