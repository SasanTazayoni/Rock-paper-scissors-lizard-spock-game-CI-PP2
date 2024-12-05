import React, { useState, useRef, useEffect } from "react";
import { getComputerChoice } from "./utils/computerChoice.ts";
import { getPlayerChoice } from "./utils/playerChoice.ts";
import { playGameRound } from "./utils/gameLogic.ts";
import {
  adjustOverlayHeight,
  resetOverlayHeight,
} from "./utils/overlayUtils.ts";
import { updateGameScores } from "./utils/gameScores.ts";
import { Selection } from "./utils/rules.ts";

type Result = {
  symbol: string;
  isWinner: boolean;
};

const GameComponent: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerGameWins, setPlayerGameWins] = useState(0);
  const [computerGameWins, setComputerGameWins] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showGameScoresModal, setShowGameScoresModal] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [playerResult, setPlayerResult] = useState<Result[]>([]);
  const [computerResult, setComputerResult] = useState<Result[]>([]);
  const lastColumnRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const playerWins = localStorage.getItem("playerWins") || "0";
    const computerWins = localStorage.getItem("computerWins") || "0";
    setPlayerGameWins(parseInt(playerWins));
    setComputerGameWins(parseInt(computerWins));
  }, []);

  useEffect(() => {
    if (playerScore >= 5 || computerScore >= 5) {
      setIsGameOver(true);
      if (playerScore >= 5) {
        updateGameScores("WIN", setPlayerGameWins, setComputerGameWins);
      } else {
        updateGameScores("LOSE", setPlayerGameWins, setComputerGameWins);
      }
      setShowGameScoresModal(true);
      setIsOverlayOpen(true);
    }
  }, [playerScore, computerScore]);

  useEffect(() => {
    if (isOverlayOpen) {
      adjustOverlayHeight();
    } else {
      resetOverlayHeight();
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    const handleResize = () => {
      adjustOverlayHeight();
    };

    adjustOverlayHeight();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Event handlers
  const handleSelection = (selection: Selection) => {
    const roundResult = playGameRound(selection);
    const playerChoice = getPlayerChoice(selection);
    const computerChoice = getComputerChoice();

    if (roundResult === "WIN") {
      setPlayerScore((prev) => prev + 1);
    } else if (roundResult === "LOSE") {
      setComputerScore((prev) => prev + 1);
    }

    setPlayerResult((prevChoices) => [
      { symbol: playerChoice.symbol, isWinner: roundResult === "WIN" },
      ...prevChoices,
    ]);

    setComputerResult((prevChoices) => [
      { symbol: computerChoice.symbol, isWinner: roundResult === "LOSE" },
      ...prevChoices,
    ]);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerResult([]);
    setComputerResult([]);
  };

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

  const toggleRulesModal = () => {
    setShowRulesModal((prev) => !prev);
    setIsOverlayOpen((prev) => !prev);
  };

  const closeRulesModal = () => {
    setShowRulesModal(false);
    setIsOverlayOpen(false);
  };

  const closeGameScoresModal = () => {
    setShowGameScoresModal(false);
    setIsOverlayOpen(false);

    if (isGameOver) {
      setIsGameOver(false);
      resetGame();
    }
  };

  const resetGameAndStorage = () => {
    resetGame();
    clearLocalStorage();
    setPlayerGameWins(0);
    setComputerGameWins(0);
  };

  return (
    <>
      <nav className="btns">
        <button
          className="btn--reset"
          aria-label="Reset Button"
          data-reset-btn
          onClick={resetGameAndStorage}
          onMouseDown={handleRippleEffect}
        >
          Reset
        </button>
        <div className="btn-container">
          <button
            className="btn--dark"
            aria-label="Dark Theme Button"
            data-rules-btn
            onClick={toggleRulesModal}
          >
            See rules
          </button>
          <button
            className="btn--dark"
            aria-label="Game Scores Button"
            data-game-scores-btn
            onClick={() => {
              setShowGameScoresModal(true);
              setIsOverlayOpen(true);
            }}
          >
            Wins & losses
          </button>
        </div>
      </nav>

      <header>
        <h1>Rock Paper Scissors Lizard Spock game</h1>
      </header>

      <main>
        <section className="selections">
          <button
            className="selection"
            data-selection="rock"
            aria-label="Rock icon: A fist raised in a rock gesture"
            onClick={() => handleSelection("rock")}
          >
            ✊
          </button>
          <button
            className="selection"
            data-selection="paper"
            aria-label="Paper icon: An open hand with fingers spread"
            onClick={() => handleSelection("paper")}
          >
            🖐
          </button>
          <button
            className="selection"
            data-selection="scissors"
            aria-label="Scissors icon: A hand showing the scissors gesture"
            onClick={() => handleSelection("scissors")}
          >
            ✌️
          </button>
          <button
            className="selection"
            data-selection="lizard"
            aria-label="Lizard icon: A hand showing the lizard gesture"
            onClick={() => handleSelection("lizard")}
          >
            🤏
          </button>
          <button
            className="selection"
            data-selection="spock"
            aria-label="Spock icon: A hand showing the Spock gesture"
            onClick={() => handleSelection("spock")}
          >
            🖖
          </button>
        </section>

        <section className="scores">
          <div className="player-results">
            <div>
              Player:
              <span className="score" data-player-round-wins>
                {playerScore}
              </span>
            </div>
            {playerResult.map((result, index) => (
              <div
                key={index}
                className={`result ${result.isWinner ? "winner" : ""}`}
              >
                {result.symbol}
              </div>
            ))}
          </div>

          <div className="computer-results">
            <div ref={lastColumnRef} data-last-column>
              Computer:
              <span className="score loss" data-computer-round-wins>
                {computerScore}
              </span>
            </div>
            {computerResult.map((result, index) => (
              <div
                key={index}
                className={`result ${result.isWinner ? "winner" : ""}`}
              >
                {result.symbol}
              </div>
            ))}
          </div>
        </section>

        {showRulesModal && (
          <dialog className="start-game-modal open" data-modal>
            <h2>How it works (rules)</h2>
            <div className="rules">
              <ul className="rules-list">
                <li>
                  <span
                    className="icon"
                    aria-label="Rock icon: A fist raised in a rock gesture"
                  >
                    ✊
                  </span>
                  Rock beats scissors and lizard but loses to paper and spock.
                </li>
                <li>
                  <span
                    className="icon"
                    aria-label="Paper icon: An open hand with fingers spread"
                  >
                    🖐
                  </span>
                  Paper beats rock and spock but loses to scissors and lizard.
                </li>
                <li>
                  <span
                    className="icon"
                    aria-label="Scissors icon: A hand showing the scissors gesture"
                  >
                    ✌️
                  </span>
                  Scissors beats paper and lizard but loses to spock and rock.
                </li>
                <li>
                  <span
                    className="icon"
                    aria-label="Lizard icon: A hand showing the lizard gesture"
                  >
                    🤏
                  </span>
                  Lizard beats spock and paper but loses to rock and scissors.
                </li>
                <li>
                  <span
                    className="icon"
                    aria-label="Spock icon: A hand showing the Spock gesture"
                  >
                    🖖
                  </span>
                  Spock beats rock and scissors but loses to paper and lizard.
                </li>
              </ul>
              <img
                src="./src/assets/images/rules.png"
                className="modal-image"
                alt="Rock-paper-lizard-Spock game rules diagram"
              />
            </div>
            <div className="rules-text">
              <p>The winner of a game is the first to win 5 rounds.</p>
            </div>
            <button className="btn" data-play-btn onClick={closeRulesModal}>
              Play game
            </button>
          </dialog>
        )}

        {showGameScoresModal && (
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
        )}

        {isOverlayOpen && (
          <div className="overlay open" data-overlay ref={overlayRef}></div>
        )}
      </main>
    </>
  );
};

export default GameComponent;
