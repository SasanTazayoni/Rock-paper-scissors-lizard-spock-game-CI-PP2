import { rules } from "./rules.ts";

export const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * rules.length);
  return rules[randomIndex];
};
