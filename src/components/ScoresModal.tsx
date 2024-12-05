import React from "react";

type ScoresModalProps = {
  isGameOver: boolean;
  playerGameWins: number;
  computerGameWins: number;
  closeGameScoresModal: () => void;
};

const ScoresModal: React.FC<ScoresModalProps> = ({
  isGameOver,
  playerGameWins,
  computerGameWins,
  closeGameScoresModal,
}) => {
  return (
    <dialog className="game-scores-modal open" data-game-scores-modal>
      <h2>{isGameOver ? "Game Over!" : "Game Scores"}</h2>
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
      <button className="btn" onClick={closeGameScoresModal}>
        Continue
      </button>
    </dialog>
  );
};

export default ScoresModal;
