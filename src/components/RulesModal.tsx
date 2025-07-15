type RulesModalProps = {
  showRulesModal: boolean;
  toggleRulesModal: () => void;
};

export default function RulesModal({
  showRulesModal,
  toggleRulesModal,
}: RulesModalProps) {
  if (!showRulesModal) return null;

  return (
    <dialog className="start-game-modal open" data-modal>
      <h2>How it works (rules)</h2>
      <div className="rules">
        <ul className="rules-list">
          <li>
            <span className="icon">✊</span>
            Rock beats scissors and lizard but loses to paper and spock.
          </li>
          <li>
            <span className="icon">🖐</span>
            Paper beats rock and spock but loses to scissors and lizard.
          </li>
          <li>
            <span className="icon">✌️</span>
            Scissors beats paper and lizard but loses to spock and rock.
          </li>
          <li>
            <span className="icon">🤏</span>
            Lizard beats spock and paper but loses to rock and scissors.
          </li>
          <li>
            <span className="icon">🖖</span>
            Spock beats rock and scissors but loses to paper and lizard.
          </li>
        </ul>
        <img
          src={
            window.location.hostname === "localhost"
              ? "./images/rules.png"
              : "/Rock-paper-scissors-lizard-spock-game-CI-PP2/images/rules.png"
          }
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
  );
}
