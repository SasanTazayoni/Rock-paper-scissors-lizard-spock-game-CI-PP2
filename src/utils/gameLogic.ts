import { getPlayerChoice } from "./playerChoice";
import { Rule, Selection } from "./rules";

export const playGameRound = (
  playerChoice: Selection,
  computerChoice: Rule
): "WIN" | "LOSE" | "DRAW" => {
  const player = getPlayerChoice(playerChoice);

  if (player.name === computerChoice.name) {
    return "DRAW";
  }

  if (player.beats.includes(computerChoice.name)) {
    return "WIN";
  }

  return "LOSE";
};
