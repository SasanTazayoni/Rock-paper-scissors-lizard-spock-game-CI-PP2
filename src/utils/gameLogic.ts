import { getPlayerChoice } from "./playerChoice.ts";
import { getComputerChoice } from "./computerChoice.ts";
import { Selection } from "./rules.ts";

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
