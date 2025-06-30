import type { Dispatch, SetStateAction, MouseEvent } from "react";

type NavigationButtonsProps = {
  resetGame: () => void;
  setPlayerGameWins: Dispatch<SetStateAction<number>>;
  setComputerGameWins: Dispatch<SetStateAction<number>>;
  toggleRulesModal: () => void;
  toggleGameScoresModal: () => void;
};

export default function NavigationButtons({
  resetGame,
  setPlayerGameWins,
  setComputerGameWins,
  toggleRulesModal,
  toggleGameScoresModal,
}: NavigationButtonsProps) {
  const clearLocalStorage = () => {
    localStorage.removeItem("gameScores");
  };

  const handleRippleEffect = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const x = e.clientX - target.offsetLeft;
    const y = e.clientY - target.offsetTop;

    const ripple = document.createElement("span");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  };

  const handleResetClick = () => {
    clearLocalStorage();
    resetGame();
    setPlayerGameWins(0);
    setComputerGameWins(0);
  };

  return (
    <nav className="btns">
      <button
        className="btn--reset"
        aria-label="Reset Button"
        data-reset-btn
        onClick={handleResetClick}
        onMouseDown={handleRippleEffect}
      >
        Reset
      </button>

      <div className="btn-container">
        <button
          className="btn--dark"
          aria-label="See Rules Button"
          data-rules-btn
          onClick={toggleRulesModal}
        >
          See rules
        </button>

        <button
          className="btn--dark"
          aria-label="Game Scores Button"
          data-game-scores-btn
          onClick={toggleGameScoresModal}
        >
          Wins & losses
        </button>
      </div>
    </nav>
  );
}
