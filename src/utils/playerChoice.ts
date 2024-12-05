import { rules } from "./rules";

export type Selection = "rock" | "paper" | "scissors" | "lizard" | "spock";

export const getPlayerChoice = (name: Selection) => {
  return rules.find((rule) => rule.name === name)!;
};
