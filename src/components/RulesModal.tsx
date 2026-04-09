type RulesModalProps = {
  showRulesModal: boolean;
  closeRulesModal: () => void;
};

export default function RulesModal({
  showRulesModal,
  closeRulesModal,
}: RulesModalProps) {
  return (
    <>
      {showRulesModal && (
        <dialog
          data-testid="rules-modal"
          className="rules-modal open"
          data-modal
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-modal-title"
        >
          <h2 id="rules-modal-title">How it works (rules)</h2>
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
              src={`${import.meta.env.BASE_URL}images/rules.png`}
              className="modal-image"
              alt="Rock-paper-lizard-Spock game rules diagram"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
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
    </>
  );
}
