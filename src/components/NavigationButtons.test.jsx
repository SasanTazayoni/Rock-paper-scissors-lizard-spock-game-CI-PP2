import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NavigationButtons from "./NavigationsButtons";

describe("NavigationButtons component", () => {
  test("renders all buttons with correct aria-labels", () => {
    render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        toggleRulesModal={() => {}}
        toggleGameScoresModal={() => {}}
      />
    );

    expect(
      screen.getByRole("button", { name: /reset button/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /see rules button/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /game scores button/i })
    ).toBeInTheDocument();
  });

  test("calls correct callbacks on button clicks", () => {
    const resetGameMock = vi.fn();
    const setPlayerGameWinsMock = vi.fn();
    const setComputerGameWinsMock = vi.fn();
    const toggleRulesModalMock = vi.fn();
    const toggleGameScoresModalMock = vi.fn();

    render(
      <NavigationButtons
        resetGame={resetGameMock}
        setPlayerGameWins={setPlayerGameWinsMock}
        setComputerGameWins={setComputerGameWinsMock}
        toggleRulesModal={toggleRulesModalMock}
        toggleGameScoresModal={toggleGameScoresModalMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /reset button/i }));
    expect(resetGameMock).toHaveBeenCalled();
    expect(setPlayerGameWinsMock).toHaveBeenCalledWith(0);
    expect(setComputerGameWinsMock).toHaveBeenCalledWith(0);

    fireEvent.click(screen.getByRole("button", { name: /see rules button/i }));
    expect(toggleRulesModalMock).toHaveBeenCalled();

    fireEvent.click(
      screen.getByRole("button", { name: /game scores button/i })
    );
    expect(toggleGameScoresModalMock).toHaveBeenCalled();
  });
});

describe("NavigationButtons reset behavior", () => {
  test("calls localStorage.removeItem on reset", () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

    render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        toggleRulesModal={() => {}}
        toggleGameScoresModal={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /reset button/i }));
    expect(removeItemSpy).toHaveBeenCalledWith("gameScores");

    removeItemSpy.mockRestore();
  });
});

describe("NavigationButtons ripple effect", () => {
  test("creates and removes ripple span on mousedown", () => {
    vi.useFakeTimers();

    render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        toggleRulesModal={() => {}}
        toggleGameScoresModal={() => {}}
      />
    );

    const resetBtn = screen.getByRole("button", { name: /reset button/i });
    fireEvent.mouseDown(resetBtn);

    const ripple = resetBtn.querySelector("span");
    expect(ripple).toBeInTheDocument();

    vi.advanceTimersByTime(500);
    expect(resetBtn.querySelector("span")).toBeNull();

    vi.useRealTimers();
  });
});
