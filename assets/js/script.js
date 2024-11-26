import * as Game from "./game.js";
import {
  initUIEventListeners,
  updateUI,
  incrementScore,
  handleGameOver,
  resetUI,
} from "./ui.js";

const selectionIcons = document.querySelectorAll("[data-selection]");
const resetBtn = document.querySelector("[data-reset-btn]");

selectionIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const playerSelection = icon.dataset.selection;
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
  localStorage.setItem("playerWins", 0);
  localStorage.setItem("computerWins", 0);
  document.querySelector("[data-player-game-wins]").innerText = 0;
  document.querySelector("[data-computer-game-wins]").innerText = 0;
}

function resetRippleEffect(e) {
  const x = e.clientX - e.target.offsetLeft;
  const y = e.clientY - e.target.offsetTop;

  const ripples = document.createElement("span");
  ripples.style.left = `${x}px`;
  ripples.style.top = `${y}px`;
  resetBtn.appendChild(ripples);

  setTimeout(() => ripples.remove(), 500);
}

initUIEventListeners();
