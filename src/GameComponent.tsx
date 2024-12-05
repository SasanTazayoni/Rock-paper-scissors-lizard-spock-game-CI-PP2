import React, { useState, useRef, useEffect } from "react";
import { getComputerChoice } from "./utils/computerChoice";
import { getPlayerChoice } from "./utils/playerChoice";
import { playGameRound } from "./utils/gameLogic";
import { adjustOverlayHeight, resetOverlayHeight } from "./utils/overlayUtils";
import { updateGameScores } from "./utils/gameScores";
import { Selection } from "./utils/rules";
import ResetButton from "./components/ResetBtn";
import RulesModal from "./components/RulesModal";
import ScoresModal from "./components/ScoresModal";

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
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [showGameScoresModal, setShowGameScoresModal] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
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
      setIsOverlayOpen(true);
      setShowGameScoresModal(true);
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

  const toggleRulesModal = () => {
    setShowRulesModal((prev) => !prev);
    setIsOverlayOpen((prev) => !prev);
  };

  const closeGameScoresModal = () => {
    setShowGameScoresModal(false);
    setIsOverlayOpen(false);

    if (isGameOver) {
      setIsGameOver(false);
      resetGame();
    }
  };

  return (
    <>
      <nav className="btns">
        <ResetButton
          resetGame={resetGame}
          setPlayerGameWins={setPlayerGameWins}
          setComputerGameWins={setComputerGameWins}
        />
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
              setShowGameScoresModal((prev) => !prev);
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

        <RulesModal
          showRulesModal={showRulesModal}
          toggleRulesModal={toggleRulesModal}
        />

        {showGameScoresModal && (
          <ScoresModal
            isGameOver={isGameOver}
            playerGameWins={playerGameWins}
            computerGameWins={computerGameWins}
            closeGameScoresModal={closeGameScoresModal}
          />
        )}

        {isOverlayOpen && (
          <div className="overlay open" data-overlay ref={overlayRef}></div>
        )}
      </main>
    </>
  );
};

export default GameComponent;
