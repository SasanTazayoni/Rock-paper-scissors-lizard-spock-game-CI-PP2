export const rules = [
  { name: "rock", symbol: "✊", beats: ["scissors", "lizard"] },
  { name: "paper", symbol: "🖐", beats: ["rock", "spock"] },
  { name: "scissors", symbol: "✌️", beats: ["paper", "lizard"] },
  { name: "lizard", symbol: "🤏", beats: ["spock", "paper"] },
  { name: "spock", symbol: "🖖", beats: ["scissors", "rock"] },
];

export function computerPlay() {
  const randomIndex = Math.floor(Math.random() * rules.length);
  return rules[randomIndex];
}

export let computerChoice = null;
export let playerChoice = null;

export function playGameRound(playerSelection) {
  playerChoice = rules.find((rule) => rule.name === playerSelection);
  computerChoice = computerPlay();

  const roundResult = playRound(playerChoice, computerChoice);
  return roundResult;
}

export function playRound(playerChoice, computerChoice) {
  const playerWin = determineWinner(playerChoice.beats, computerChoice.name);
  const computerWin = determineWinner(computerChoice.beats, playerChoice.name);

  if (playerWin) return "WIN";
  if (computerWin) return "LOSE";
  return "DRAW";
}

export function determineWinner(selection, opponentSelection) {
  return selection.includes(opponentSelection);
}

export function getComputerChoice() {
  return computerChoice;
}

export function getPlayerChoice() {
  return playerChoice;
}

export function gameOver(playerScore, computerScore) {
  return parseInt(playerScore) === 5 || parseInt(computerScore) === 5;
}
