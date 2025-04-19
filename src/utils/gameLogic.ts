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
    console.log(`Result: WIN — ${player.name} beats ${computerChoice.name}`);
    return "WIN";
  }

  console.log(`Result: LOSE — ${computerChoice.name} beats ${player.name}`);
  return "LOSE";
};
