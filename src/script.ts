import * as Game from "./assets/ts/game.ts";
import {
  initUIEventListeners,
  updateUI,
  incrementScore,
  handleGameOver,
  resetUI,
} from "./assets/ts/ui.ts";

const selectionIcons =
  document.querySelectorAll<HTMLButtonElement>("[data-selection]")!;
const resetBtn = document.querySelector<HTMLButtonElement>("[data-reset-btn]")!;

selectionIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const playerSelection = icon.dataset.selection as Game.Selection;
    const roundResult = Game.playGameRound(playerSelection);
    const computerChoice = Game.getComputerChoice();
    const playerChoice = Game.getPlayerChoice();

    updateUI(computerChoice, roundResult === "LOSE");
    updateUI(playerChoice, roundResult === "WIN");
    incrementScore(roundResult);
    handleGameOver();
  });
});

resetBtn.addEventListener("click", (e) => {
  resetUI();
  resetScores();
  resetRippleEffect(e);
});

function resetScores() {
  localStorage.setItem("playerWins", "0");
  localStorage.setItem("computerWins", "0");
  const playerGameWins = document.querySelector<HTMLSpanElement>(
    "[data-player-game-wins]"
  )!;
  const computerGameWins = document.querySelector<HTMLSpanElement>(
    "[data-computer-game-wins]"
  )!;
  playerGameWins.textContent = "0";
  computerGameWins.textContent = "0";
}

function resetRippleEffect(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  const x = e.clientX - target.offsetLeft;
  const y = e.clientY - target.offsetTop;

  const ripples = document.createElement("span");
  ripples.style.left = `${x}px`;
  ripples.style.top = `${y}px`;
  resetBtn.appendChild(ripples);

  setTimeout(() => ripples.remove(), 500);
}

initUIEventListeners();
