export type Rule = {
  name: string;
  beats: string[];
  symbol: string;
};

export type Selection = "rock" | "paper" | "scissors" | "lizard" | "spock";

export const rules = [
  { name: "rock", beats: ["scissors", "lizard"], symbol: "✊" },
  { name: "paper", beats: ["rock", "spock"], symbol: "🖐" },
  { name: "scissors", beats: ["paper", "lizard"], symbol: "✌️" },
  { name: "lizard", beats: ["spock", "paper"], symbol: "🤏" },
  { name: "spock", beats: ["rock", "scissors"], symbol: "🖖" },
];
