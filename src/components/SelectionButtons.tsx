import type { Selection } from "../utils/rules";

type SelectionButtonsProps = {
  handleSelection: (choice: Selection) => void;
};

export default function SelectionButtons({
  handleSelection,
}: SelectionButtonsProps) {
  return (
    <>
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
    </>
  );
}
