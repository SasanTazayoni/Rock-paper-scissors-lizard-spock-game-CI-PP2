import { useState, useEffect } from "react";
import { getComputerChoice } from "./utils/computerChoice";
import { getPlayerChoice } from "./utils/playerChoice";
import { playGameRound } from "./utils/gameLogic";
import { adjustOverlayHeight, resetOverlayHeight } from "./utils/overlayUtils";
import { updateGameScores } from "./utils/gameScores";
import { Selection } from "./utils/rules";
import RulesModal from "./components/RulesModal";
import ScoresModal from "./components/ScoresModal";
import ResultColumn from "./components/ResultColumn";
import NavigationButtons from "./components/NavigationsButtons";

export type Result = {
  symbol: string;
  isWinner: boolean;
};

type RoundResult = {
  player: Result;
  computer: Result;
};

function GameComponent() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerGameWins, setPlayerGameWins] = useState(0);
  const [computerGameWins, setComputerGameWins] = useState(0);
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [showGameScoresModal, setShowGameScoresModal] = useState(false);
  const [history, setHistory] = useState<RoundResult[]>([]);
  const isGameOver = playerScore >= 5 || computerScore >= 5;
  const isOverlayOpen = showRulesModal || showGameScoresModal || isGameOver;

  useEffect(() => {
    const stored = localStorage.getItem("gameScores");
    if (stored) {
      const { player, computer } = JSON.parse(stored);
      setPlayerGameWins(player || 0);
      setComputerGameWins(computer || 0);
    }
  }, []);

  useEffect(() => {
    if (playerScore >= 5 || computerScore >= 5) {
      if (playerScore >= 5) {
        updateGameScores("WIN", setPlayerGameWins, setComputerGameWins);
      } else {
        updateGameScores("LOSE", setPlayerGameWins, setComputerGameWins);
      }
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
    const playerChoice = getPlayerChoice(selection);
    const computerChoice = getComputerChoice();

    const roundResult = playGameRound(selection, computerChoice);

    if (roundResult === "WIN") {
      setPlayerScore((prev) => prev + 1);
    } else if (roundResult === "LOSE") {
      setComputerScore((prev) => prev + 1);
    }

    setHistory((prev) => [
      {
        player: {
          symbol: playerChoice.symbol,
          isWinner: roundResult === "WIN",
        },
        computer: {
          symbol: computerChoice.symbol,
          isWinner: roundResult === "LOSE",
        },
      },
      ...prev,
    ]);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setHistory([]);
  };

  const toggleRulesModal = () => {
    setShowRulesModal((prev) => !prev);
  };

  const closeGameScoresModal = () => {
    setShowGameScoresModal(false);

    if (isGameOver) {
      resetGame();
    }
  };

  return (
    <>
      <nav className="btns">
        <NavigationButtons
          resetGame={resetGame}
          setPlayerGameWins={setPlayerGameWins}
          setComputerGameWins={setComputerGameWins}
          toggleRulesModal={toggleRulesModal}
          toggleGameScoresModal={() => setShowGameScoresModal((prev) => !prev)}
        />
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
          <ResultColumn
            label="Player"
            score={playerScore}
            results={history.map((round) => round.player)}
          />

          <ResultColumn
            label="Computer"
            score={computerScore}
            results={history.map((round) => round.computer)}
            extraClass="loss"
          />
        </section>

        <RulesModal
          showRulesModal={showRulesModal}
          toggleRulesModal={toggleRulesModal}
        />

        {showGameScoresModal && (
          <ScoresModal
            isGameOver={isGameOver}
            gameOutcome={playerScore > computerScore ? "WIN" : "LOSE"}
            playerGameWins={playerGameWins}
            computerGameWins={computerGameWins}
            closeGameScoresModal={closeGameScoresModal}
          />
        )}

        {isOverlayOpen && <div className="overlay open" data-overlay></div>}
      </main>
    </>
  );
}

export default GameComponent;
