import { rules } from "./rules";
import type { Selection } from "./rules";
export type { Selection } from "./rules";

export const getPlayerChoice = (name: Selection) => {
  return rules.find((rule) => rule.name === name)!;
};
