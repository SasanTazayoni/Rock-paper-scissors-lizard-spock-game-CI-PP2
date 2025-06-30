import type { MouseEvent, Dispatch, SetStateAction } from "react";

type ResetButtonProps = {
  resetGame: () => void;
  setPlayerGameWins: Dispatch<SetStateAction<number>>;
  setComputerGameWins: Dispatch<SetStateAction<number>>;
};

export default function ResetButton({
  resetGame,
  setPlayerGameWins,
  setComputerGameWins,
}: ResetButtonProps) {
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

  const handleClick = () => {
    clearLocalStorage();
    resetGame();
    setPlayerGameWins(0);
    setComputerGameWins(0);
  };

  return (
    <button
      className="btn--reset"
      aria-label="Reset Button"
      data-reset-btn
      onClick={handleClick}
      onMouseDown={handleRippleEffect}
    >
      Reset
    </button>
  );
}
