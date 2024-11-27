export type Rules = {
  name: string;
  symbol: string;
  beats: string[];
};

export const rules: Rules[] = [
  { name: "rock", symbol: "✊", beats: ["scissors", "lizard"] },
  { name: "paper", symbol: "🖐", beats: ["rock", "spock"] },
  { name: "scissors", symbol: "✌️", beats: ["paper", "lizard"] },
  { name: "lizard", symbol: "🤏", beats: ["spock", "paper"] },
  { name: "spock", symbol: "🖖", beats: ["scissors", "rock"] },
];

export type Selection = (typeof rules)[number]["name"];

export let computerChoice: Rules;
export let playerChoice: Rules;

export function computerPlay(): Rules {
  const randomIndex = Math.floor(Math.random() * rules.length);
  return rules[randomIndex];
}

export function playGameRound(playerSelection: Selection) {
  playerChoice = rules.find((rule) => rule.name === playerSelection)!;
  computerChoice = computerPlay();

  const roundResult = playRound(playerChoice, computerChoice);
  return roundResult;
}

export function playRound(playerChoice: Rules, computerChoice: Rules) {
  const playerWin = determineWinner(playerChoice.beats, computerChoice.name);
  const computerWin = determineWinner(computerChoice.beats, playerChoice.name);

  if (playerWin) return "WIN";
  if (computerWin) return "LOSE";
  return "DRAW";
}

export function determineWinner(
  selection: string[],
  opponentSelection: string
) {
  return selection.includes(opponentSelection);
}

export function getComputerChoice() {
  return computerChoice;
}

export function getPlayerChoice() {
  return playerChoice;
}

export function gameOver(playerScore: number, computerScore: number) {
  return playerScore === 5 || computerScore === 5;
}
