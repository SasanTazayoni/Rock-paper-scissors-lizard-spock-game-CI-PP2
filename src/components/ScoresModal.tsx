type ScoresModalProps = {
  isGameOver: boolean;
  gameOutcome?: "WIN" | "LOSE"; // new optional prop
  playerGameWins: number;
  computerGameWins: number;
  closeGameScoresModal: () => void;
};

export default function ScoresModal({
  isGameOver,
  gameOutcome,
  playerGameWins,
  computerGameWins,
  closeGameScoresModal,
}: ScoresModalProps) {
  let headerText = "Game Scores";

  if (isGameOver) {
    headerText = "Game Over!";
    if (gameOutcome === "WIN") headerText += " You won!";
    else if (gameOutcome === "LOSE") headerText += " You lost!";
  }

  return (
    <dialog
      data-testid="game-scores-modal"
      className="game-scores-modal open"
      role="dialog"
      data-game-scores-modal
      aria-modal="true"
      aria-labelledby="game-scores-modal-title"
    >
      <h2 id="game-scores-modal-title">{headerText}</h2>
      <div className="game-scores">
        <div>
          Total wins:
          <span className="player-game-score" data-player-game-wins>
            {playerGameWins}
          </span>
        </div>
        <div>
          Total losses:
          <span className="computer-game-score" data-computer-game-wins>
            {computerGameWins}
          </span>
        </div>
      </div>
      <button
        className="btn"
        aria-label="Continue"
        data-testid="continue-button"
        onClick={closeGameScoresModal}
      >
        Continue
      </button>
    </dialog>
  );
}
