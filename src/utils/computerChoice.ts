import { rules } from "./rules";

export const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * rules.length);
  return rules[randomIndex];
};
