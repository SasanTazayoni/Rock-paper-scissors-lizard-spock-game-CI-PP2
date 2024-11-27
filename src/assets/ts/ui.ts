import { gameOver, Rules } from "./game.ts";

const overlay = document.querySelector<HTMLDivElement>("[data-overlay]")!;
const rulesModal = document.querySelector<HTMLDialogElement>("[data-modal]")!;
const scoresModal = document.querySelector<HTMLDialogElement>(
  "[data-game-scores-modal]"
)!;
const endGameMessage = document.querySelector<HTMLHeadingElement>(
  "[data-end-game-message]"
)!;
const lastColumn =
  document.querySelector<HTMLDivElement>("[data-last-column]")!;
const playerRoundScore = document.querySelector<HTMLSpanElement>(
  "[data-player-round-wins]"
)!;
const computerRoundScore = document.querySelector<HTMLSpanElement>(
  "[data-computer-round-wins]"
)!;
const playerGameWins = document.querySelector<HTMLSpanElement>(
  "[data-player-game-wins]"
)!;
const computerGameWins = document.querySelector<HTMLSpanElement>(
  "[data-computer-game-wins]"
)!;

export function openScoresModal() {
  scoresModal.classList.add("open");
  overlay.classList.add("open");
}

export function closeModal() {
  if (rulesModal.classList.contains("open")) {
    closeModalHandler(rulesModal);
  } else if (scoresModal.classList.contains("open")) {
    closeScoresModal();
  } else return;
}

function closeModalHandler(modal: HTMLDialogElement) {
  modal.classList.remove("open");
  overlay.classList.remove("open");
}

function closeScoresModal() {
  closeModalHandler(scoresModal);
  resetUI();
  endGameMessage.textContent = "";
}

export function openRulesModal() {
  overlay.classList.add("open");
  rulesModal.classList.add("open");
}

export function initUIEventListeners() {
  const playGameBtns =
    document.querySelectorAll<HTMLButtonElement>("[data-play-btn]")!;
  const openRulesModalBtn =
    document.querySelector<HTMLButtonElement>("[data-rules-btn]")!;
  const checkGameScoresBtn = document.querySelector<HTMLButtonElement>(
    "[data-game-scores-btn]"
  )!;

  playGameBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
  checkGameScoresBtn.addEventListener("click", openScoresModal);
  openRulesModalBtn.addEventListener("click", openRulesModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
  window.onload = loadScoresFromLocalStorage;
}

function loadScoresFromLocalStorage() {
  const playerWins = localStorage.getItem("playerWins") || "0";
  const computerWins = localStorage.getItem("computerWins") || "0";
  playerGameWins.textContent = playerWins;
  computerGameWins.textContent = computerWins;
}

export function updateUI(choice: Rules, isWinner: boolean) {
  const element = document.createElement("div");
  element.textContent = choice.symbol;
  element.classList.add("result");
  if (isWinner) element.classList.add("winner");
  lastColumn.after(element);
  adjustOverlayHeight();
}

export function incrementScore(result: "WIN" | "LOSE" | "DRAW") {
  if (result === "DRAW") return;
  if (result === "WIN") {
    const currentPlayerScore = parseInt(playerRoundScore.textContent!);
    playerRoundScore.textContent = (currentPlayerScore + 1).toString();
  } else {
    const currentComputerScore = parseInt(computerRoundScore.textContent!);
    computerRoundScore.textContent = (currentComputerScore + 1).toString();
  }
}

export function handleGameOver() {
  const playerScore = parseInt(playerRoundScore.textContent!);
  const computerScore = parseInt(computerRoundScore.textContent!);

  if (gameOver(playerScore, computerScore)) {
    openModal(scoresModal);
    displayEndGameMessage();
  }
}

function openModal(modal: HTMLDialogElement) {
  modal.classList.add("open");
  overlay.classList.add("open");
}

export function displayEndGameMessage() {
  const playerScoreValue = parseInt(playerRoundScore.textContent!);

  if (playerScoreValue === 5) {
    endGameMessage.textContent = "You won this game!";
    endGameMessage.style.fontSize = "30px";
    updateGameScores("WIN");
  } else {
    endGameMessage.textContent = "Loser";
    endGameMessage.style.fontSize = "30px";
    updateGameScores("LOSE");
  }
}

function updateGameScores(result: "WIN" | "LOSE") {
  let playerWins = localStorage.getItem("playerWins") || "0";
  let computerWins = localStorage.getItem("computerWins") || "0";

  if (result === "WIN") {
    playerWins = (parseInt(playerWins) + 1).toString();
    localStorage.setItem("playerWins", playerWins);
  } else if (result === "LOSE") {
    computerWins = (parseInt(computerWins) + 1).toString();
    localStorage.setItem("computerWins", computerWins);
  }

  playerGameWins.textContent = playerWins;
  computerGameWins.textContent = computerWins;
}

export function adjustOverlayHeight() {
  const bodyHeight = document.body.scrollHeight;
  overlay.style.height = `${bodyHeight}px`;
}

export function resetUI() {
  playerRoundScore.textContent = "0";
  computerRoundScore.textContent = "0";
  document.querySelectorAll(".result").forEach((element) => element.remove());
  resetOverlayHeight();
}

function resetOverlayHeight() {
  overlay.style.height = "";
}
