import { getPlayerChoice } from "./playerChoice";
import { getComputerChoice } from "./computerChoice";
import { Selection } from "./rules";

export const playGameRound = (
  playerChoice: Selection
): "WIN" | "LOSE" | "DRAW" => {
  const computerChoice = getComputerChoice();
  const player = getPlayerChoice(playerChoice);
  if (player.name === computerChoice.name) {
    return "DRAW";
  }
  if (player.beats.includes(computerChoice.name)) {
    return "WIN";
  }
  return "LOSE";
};
