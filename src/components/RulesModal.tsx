import React from "react";

type RulesModalProps = {
  showRulesModal: boolean;
  toggleRulesModal: () => void;
};

const RulesModal: React.FC<RulesModalProps> = ({
  showRulesModal,
  toggleRulesModal,
}) => {
  return (
    showRulesModal && (
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
            src="/images/rules.png"
            className="modal-image"
            alt="Rock-paper-lizard-Spock game rules diagram"
          />
        </div>
        <div className="rules-text">
          <p>The winner of a game is the first to win 5 rounds.</p>
        </div>
        <button className="btn" data-play-btn onClick={toggleRulesModal}>
          Play game
        </button>
      </dialog>
    )
  );
};

export default RulesModal;
