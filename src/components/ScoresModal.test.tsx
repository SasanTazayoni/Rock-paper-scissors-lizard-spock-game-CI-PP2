import { render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ScoresModal from "./ScoresModal";

describe("ScoresModal", () => {
  test("renders the default header and both scores", () => {
    const { getByText } = render(
      <ScoresModal
        isGameOver={false}
        playerGameWins={1}
        computerGameWins={2}
        closeGameScoresModal={() => {}}
      />
    );

    expect(getByText("Game Scores")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
  });

  test("shows 'Game Over! You won!' header when gameOutcome is WIN", () => {
    const { getByText } = render(
      <ScoresModal
        isGameOver={true}
        gameOutcome="WIN"
        playerGameWins={4}
        computerGameWins={2}
        closeGameScoresModal={() => {}}
      />
    );

    expect(getByText(/game over! you won!/i)).toBeInTheDocument();
  });

  test("shows 'Game Over! You lost!' header when gameOutcome is LOSE", () => {
    const { getByText } = render(
      <ScoresModal
        isGameOver={true}
        gameOutcome="LOSE"
        playerGameWins={4}
        computerGameWins={5}
        closeGameScoresModal={() => {}}
      />
    );

    expect(getByText(/game over! you lost!/i)).toBeInTheDocument();
  });

  test("calls closeGameScoresModal when 'Continue' is clicked", () => {
    const closeHandler = vi.fn();
    const { getByText } = render(
      <ScoresModal
        isGameOver={false}
        playerGameWins={1}
        computerGameWins={0}
        closeGameScoresModal={closeHandler}
      />
    );

    fireEvent.click(getByText("Continue"));
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  test("shows 'Game Over!' header without win/lose suffix when gameOutcome is undefined", () => {
    const { getByText, queryByText } = render(
      <ScoresModal
        isGameOver={true}
        playerGameWins={4}
        computerGameWins={5}
        closeGameScoresModal={() => {}}
      />
    );

    expect(getByText(/game over!/i)).toBeInTheDocument();
    expect(queryByText(/you won!/i)).not.toBeInTheDocument();
    expect(queryByText(/you lost!/i)).not.toBeInTheDocument();
  });
});
