import React from "react";

type ResetButtonProps = {
  resetGame: () => void;
  setPlayerGameWins: React.Dispatch<React.SetStateAction<number>>;
  setComputerGameWins: React.Dispatch<React.SetStateAction<number>>;
};

const ResetButton: React.FC<ResetButtonProps> = ({
  resetGame,
  setPlayerGameWins,
  setComputerGameWins,
}) => {
  const clearLocalStorage = () => {
    localStorage.removeItem("playerWins");
    localStorage.removeItem("computerWins");
  };

  const handleRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
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
};

export default ResetButton;
