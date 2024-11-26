import { gameOver } from "./game.js";

const overlay = document.querySelector("[data-overlay]");
const initialModal = document.querySelector("[data-modal]");
const scoresModal = document.querySelector("[data-game-scores-modal]");
const endGameMessage = document.querySelector("[data-end-game-message]");
const lastColumn = document.querySelector("[data-last-column]");
const playerRoundScore = document.querySelector("[data-player-round-score]");
const computerRoundScore = document.querySelector(
  "[data-computer-round-score]"
);
const playerGameWins = document.querySelector("[data-player-game-wins]");
const computerGameWins = document.querySelector("[data-computer-game-wins]");

export function openScoresModal() {
  scoresModal.classList.add("open");
  overlay.classList.add("open");
}

export function closeModal() {
  if (initialModal.classList.contains("open")) {
    closeModalHandler(initialModal);
  } else if (scoresModal.classList.contains("open")) {
    closeScoresModal();
  } else return;
}

function closeModalHandler(modal) {
  modal.classList.remove("open");
  overlay.classList.remove("open");
}

function closeScoresModal() {
  closeModalHandler(scoresModal);
  resetUI();
  endGameMessage.innerText = "";
}

export function openRulesModal() {
  overlay.classList.add("open");
  initialModal.classList.add("open");
}

export function initUIEventListeners() {
  const playGameBtns = document.querySelectorAll("[data-play-btn]");
  const openRulesModalBtn = document.querySelector("[data-rules-btn]");
  const checkGameScoresBtn = document.querySelector("[data-game-scores-btn]");

  playGameBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
  checkGameScoresBtn.addEventListener("click", openScoresModal);
  openRulesModalBtn.addEventListener("click", openRulesModal);
  overlay.addEventListener("click", closeModal);
  window.onload = loadScoresFromLocalStorage;
}

function loadScoresFromLocalStorage() {
  const playerWins = localStorage.getItem("playerWins") || 0;
  const computerWins = localStorage.getItem("computerWins") || 0;
  playerGameWins.innerText = playerWins;
  computerGameWins.innerText = computerWins;
}

export function updateUI(choice, isWinner) {
  const element = document.createElement("div");
  element.innerText = choice.symbol;
  element.classList.add("result");
  if (isWinner) element.classList.add("winner");
  lastColumn.after(element);
  adjustOverlayHeight();
}

export function incrementScore(result) {
  if (result === "DRAW") return;
  if (result === "WIN") {
    playerRoundScore.innerText++;
  } else {
    computerRoundScore.innerText++;
  }
}

export function handleGameOver() {
  if (gameOver(playerRoundScore.innerText, computerRoundScore.innerText)) {
    openModal(scoresModal);
    updateGameScores();
    displayEndGameMessage();
  }
}

function openModal(modal) {
  modal.classList.add("open");
  overlay.classList.add("open");
}

export function displayEndGameMessage() {
  const playerScoreValue = parseInt(playerRoundScore.innerText);

  if (playerScoreValue === 5) {
    endGameMessage.innerText = "You won this game!";
    endGameMessage.style.fontSize = "30px";
    updateGameScores("WIN");
  } else {
    endGameMessage.innerText = "Loser";
    endGameMessage.style.fontSize = "30px";
    updateGameScores("LOSE");
  }
}

function updateGameScores(result) {
  let playerWins = parseInt(localStorage.getItem("playerWins") || 0);
  let computerWins = parseInt(localStorage.getItem("computerWins") || 0);

  if (result === "WIN") {
    playerWins++;
    localStorage.setItem("playerWins", playerWins);
  } else if (result === "LOSE") {
    computerWins++;
    localStorage.setItem("computerWins", computerWins);
  }

  playerGameWins.innerText = playerWins;
  computerGameWins.innerText = computerWins;
}

export function adjustOverlayHeight() {
  const bodyHeight = document.body.scrollHeight;
  overlay.style.height = `${bodyHeight}px`;
}

export function resetUI() {
  playerRoundScore.innerText = 0;
  computerRoundScore.innerText = 0;
  document.querySelectorAll(".result").forEach((element) => element.remove());
  resetOverlayHeight();
}

function resetOverlayHeight() {
  overlay.style.height = "";
}
