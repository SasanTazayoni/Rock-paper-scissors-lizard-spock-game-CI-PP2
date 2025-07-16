import { describe, test, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import GameComponent from "./GameComponent";
import RulesModal from "./components/RulesModal";
import * as gameLogic from "./utils/gameLogic.ts";
import * as gameScores from "./utils/gameScores";

vi.mock("./components/Footer", () => ({
  default: () => <footer>Footer Mock</footer>,
}));

vi.mock("./hooks/useOverlayHeight", () => ({
  useOverlayHeight: vi.fn(),
}));

describe("GameComponent – initial render", () => {
  test("shows the Rules modal on first load", () => {
    render(<GameComponent />);

    const dialog = document.querySelector("[data-modal].open");
    expect(dialog).toBeInTheDocument();
    expect(document.querySelector("[data-overlay].open")).toBeInTheDocument();
  });

  test("renders navigation buttons (Reset, See Rules, Game Scores)", () => {
    const { getByLabelText } = render(<GameComponent />);

    expect(getByLabelText("Reset Button")).toBeInTheDocument();
    expect(getByLabelText("See Rules Button")).toBeInTheDocument();
    expect(getByLabelText("Game Scores Button")).toBeInTheDocument();
  });

  test("renders selection buttons (rock, paper, scissors, lizard, spock)", () => {
    const { getByLabelText } = render(<GameComponent />);

    expect(getByLabelText(/^Rock icon:/i)).toBeInTheDocument();
    expect(getByLabelText(/^Paper icon:/i)).toBeInTheDocument();
    expect(getByLabelText(/^Scissors icon:/i)).toBeInTheDocument();
    expect(getByLabelText(/^Lizard icon:/i)).toBeInTheDocument();
    expect(getByLabelText(/^Spock icon:/i)).toBeInTheDocument();

    expect(getByLabelText("Player label")).toBeInTheDocument();
    expect(getByLabelText("Player score")).toHaveTextContent("0");
    expect(getByLabelText("Computer label")).toBeInTheDocument();
    expect(getByLabelText("Computer score")).toHaveTextContent("0");
  });

  test("renders result columns showing player and computer scores", () => {
    const { getByText } = render(<GameComponent />);

    const playerLabel = getByText(/Player:/i);
    expect(playerLabel).toBeInTheDocument();

    const playerScore =
      playerLabel.nextElementSibling ||
      playerLabel.querySelector(".score") ||
      playerLabel.parentNode.querySelector(".score");
    expect(playerScore).toBeInTheDocument();
    expect(playerScore.textContent).toBe("0");

    const computerLabel = getByText(/Computer:/i);
    expect(computerLabel).toBeInTheDocument();

    const computerScore =
      computerLabel.nextElementSibling ||
      computerLabel.querySelector(".score") ||
      computerLabel.parentNode.querySelector(".score");
    expect(computerScore).toBeInTheDocument();
    expect(computerScore.textContent).toBe("0");
  });

  test("ScoresModal: should not be visible initially", () => {
    const { container } = render(<GameComponent />);

    const scoresModal = container.querySelector("[data-scores-modal]");

    if (scoresModal) {
      expect(scoresModal.classList.contains("open")).toBe(false);
    } else {
      expect(scoresModal).toBeNull();
    }
  });
});

describe("Score updates on selection", () => {
  test("clicking a selection button increases player score on a win", () => {
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("WIN");

    const { getAllByRole, getByLabelText } = render(<GameComponent />);
    const selectionButtons = getAllByRole("button", { name: /icon/i });

    const playerScore = getByLabelText("Player score");
    expect(playerScore.textContent).toBe("0");

    fireEvent.click(selectionButtons[0]);

    expect(playerScore.textContent).toBe("1");
  });

  test("clicking a selection button increases computer score on a loss", async () => {
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("LOSE");

    const { getAllByRole, getByLabelText } = render(<GameComponent />);
    const buttons = getAllByRole("button", { name: /icon/i });

    const computerScore = getByLabelText("Computer score");
    expect(computerScore.textContent).toBe("0");

    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(computerScore.textContent).toBe("1");
    });
  });
});

describe("Game Over Behavior", () => {
  test("game ends when PLAYER reaches 5 points, ScoresModal opens, wins updated", async () => {
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("WIN");
    const updateSpy = vi
      .spyOn(gameScores, "updateGameScores")
      .mockImplementation(() => {});

    const { getByRole, getByLabelText, container } = render(<GameComponent />);
    const rockBtn = getByRole("button", { name: /Rock icon/i });

    for (let i = 0; i < 5; i++) fireEvent.click(rockBtn);

    await waitFor(() => {
      expect(getByLabelText("Player score").textContent).toBe("5");
      expect(
        container.querySelector("[data-game-scores-modal]")
      ).toBeInTheDocument();
      expect(updateSpy).toHaveBeenCalledWith(
        "WIN",
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  test("game ends when COMPUTER reaches 5 points, ScoresModal opens, wins updated", async () => {
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("LOSE");
    const updateSpy = vi
      .spyOn(gameScores, "updateGameScores")
      .mockImplementation(() => {});

    const { getByRole, getByLabelText, container } = render(<GameComponent />);
    const rockBtn = getByRole("button", { name: /Rock icon/i });

    for (let i = 0; i < 5; i++) fireEvent.click(rockBtn);

    await waitFor(() => {
      expect(getByLabelText("Computer score").textContent).toBe("5");
      expect(
        container.querySelector("[data-game-scores-modal]")
      ).toBeInTheDocument();
      expect(updateSpy).toHaveBeenCalledWith(
        "LOSE",
        expect.any(Function),
        expect.any(Function)
      );
    });
  });
});

describe("Reset button", () => {
  test("clicking Reset zeroes scores and clears history", async () => {
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("WIN");

    const { getByLabelText, getByRole, queryByTestId } = render(
      <GameComponent />
    );

    fireEvent.click(getByRole("button", { name: /Rock icon/i }));

    await waitFor(() => {
      expect(getByLabelText("Player score").textContent).toBe("1");
    });

    fireEvent.click(getByLabelText("Reset Button"));

    await waitFor(() => {
      expect(getByLabelText("Player score").textContent).toBe("0");
      expect(getByLabelText("Computer score").textContent).toBe("0");
      expect(queryByTestId("player-latest-result")).toBeNull();
      expect(queryByTestId("computer-latest-result")).toBeNull();
    });
  });
});

describe("Rules Modal Close Behavior", () => {
  test("clicking the Rules modal close button closes the Rules modal", () => {
    const { getByTestId, getByText, queryByTestId } = render(<GameComponent />);
    expect(getByTestId("rules-modal")).toBeInTheDocument();
    const playButton = getByText(/play game/i);
    fireEvent.click(playButton);
    expect(queryByTestId("rules-modal")).not.toBeInTheDocument();
  });

  test("clicking the Play game button closes the Rules modal", () => {
    const closeRulesModal = vi.fn();
    const { getByText } = render(
      <RulesModal showRulesModal={true} closeRulesModal={closeRulesModal} />
    );

    fireEvent.click(getByText(/play game/i));
    expect(closeRulesModal).toHaveBeenCalledTimes(1);
  });
});

describe("ScoresModal close behavior", () => {
  test("clicking Continue closes ScoresModal and resets game on WIN", async () => {
    const { getByRole, queryByTestId, getByLabelText, getByTestId } = render(
      <GameComponent />
    );
    vi.spyOn(gameLogic, "playGameRound").mockReturnValue("WIN");

    const rockBtn = getByRole("button", { name: /Rock icon/i });
    for (let i = 0; i < 5; i++) {
      fireEvent.click(rockBtn);
    }

    await waitFor(() => {
      expect(queryByTestId("game-scores-modal")).toBeInTheDocument();
      expect(getByLabelText("Player score").textContent).toBe("5");
    });

    fireEvent.click(getByTestId("continue-button"));

    await waitFor(() => {
      expect(queryByTestId("game-scores-modal")).not.toBeInTheDocument();
      expect(getByLabelText("Player score").textContent).toBe("0");
      expect(getByLabelText("Computer score").textContent).toBe("0");
    });
  });
});

describe("RulesModal behavior", () => {
  test("clicking See rules button re‑opens the Rules modal (openRulesModal)", async () => {
    const { getByLabelText, getByText, queryByTestId } = render(
      <GameComponent />
    );

    fireEvent.click(getByText(/play game/i)); // closes Rules modal
    await waitFor(() =>
      expect(queryByTestId("rules-modal")).not.toBeInTheDocument()
    );

    const seeRulesBtn = getByLabelText("See Rules Button");
    fireEvent.click(seeRulesBtn);

    await waitFor(() =>
      expect(queryByTestId("rules-modal")).toBeInTheDocument()
    );
  });
});
