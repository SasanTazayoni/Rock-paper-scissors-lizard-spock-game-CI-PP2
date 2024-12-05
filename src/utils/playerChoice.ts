import { rules } from "./rules.ts";

export type Selection = "rock" | "paper" | "scissors" | "lizard" | "spock";

export const getPlayerChoice = (name: Selection) => {
  return rules.find((rule) => rule.name === name)!;
};
