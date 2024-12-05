export const updateGameScores = (
  result: "WIN" | "LOSE",
  setPlayerGameWins: React.Dispatch<React.SetStateAction<number>>,
  setComputerGameWins: React.Dispatch<React.SetStateAction<number>>
) => {
  let playerWins = localStorage.getItem("playerWins") || "0";
  let computerWins = localStorage.getItem("computerWins") || "0";

  if (result === "WIN") {
    playerWins = (parseInt(playerWins) + 1).toString();
    localStorage.setItem("playerWins", playerWins);
    setPlayerGameWins(parseInt(playerWins));
  } else if (result === "LOSE") {
    computerWins = (parseInt(computerWins) + 1).toString();
    localStorage.setItem("computerWins", computerWins);
    setComputerGameWins(parseInt(computerWins));
  }
};
