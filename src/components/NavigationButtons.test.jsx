import { render, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import NavigationButtons from "./NavigationsButtons";

describe("NavigationButtons component", () => {
  test("renders all buttons with correct aria-labels", () => {
    const { getByRole } = render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        openRulesModal={() => {}}
        openGameScoresModal={() => {}}
      />
    );

    expect(getByRole("button", { name: /reset button/i })).toBeInTheDocument();
    expect(
      getByRole("button", { name: /see rules button/i })
    ).toBeInTheDocument();
    expect(
      getByRole("button", { name: /game scores button/i })
    ).toBeInTheDocument();
  });

  test("calls correct callbacks on button clicks", () => {
    const resetGameMock = vi.fn();
    const setPlayerGameWinsMock = vi.fn();
    const setComputerGameWinsMock = vi.fn();
    const openRulesModalMock = vi.fn();
    const openGameScoresModalMock = vi.fn();

    const { getByRole } = render(
      <NavigationButtons
        resetGame={resetGameMock}
        setPlayerGameWins={setPlayerGameWinsMock}
        setComputerGameWins={setComputerGameWinsMock}
        openRulesModal={openRulesModalMock}
        openGameScoresModal={openGameScoresModalMock}
      />
    );

    fireEvent.click(getByRole("button", { name: /reset button/i }));
    expect(resetGameMock).toHaveBeenCalled();
    expect(setPlayerGameWinsMock).toHaveBeenCalledWith(0);
    expect(setComputerGameWinsMock).toHaveBeenCalledWith(0);

    fireEvent.click(getByRole("button", { name: /see rules button/i }));
    expect(openRulesModalMock).toHaveBeenCalled();

    fireEvent.click(getByRole("button", { name: /game scores button/i }));
    expect(openGameScoresModalMock).toHaveBeenCalled();
  });
});

describe("NavigationButtons reset behavior", () => {
  test("calls localStorage.removeItem on reset", () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

    const { getByRole } = render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        openRulesModal={() => {}}
        openGameScoresModal={() => {}}
      />
    );

    fireEvent.click(getByRole("button", { name: /reset button/i }));
    expect(removeItemSpy).toHaveBeenCalledWith("gameScores");

    removeItemSpy.mockRestore();
  });
});

describe("NavigationButtons ripple effect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("creates and removes ripple span on mousedown", () => {
    const { getByRole } = render(
      <NavigationButtons
        resetGame={() => {}}
        setPlayerGameWins={() => {}}
        setComputerGameWins={() => {}}
        openRulesModal={() => {}}
        openGameScoresModal={() => {}}
      />
    );

    const resetBtn = getByRole("button", { name: /reset button/i });
    fireEvent.mouseDown(resetBtn);

    const ripple = resetBtn.querySelector("span");
    expect(ripple).toBeInTheDocument();

    vi.advanceTimersByTime(500);
    expect(resetBtn.querySelector("span")).toBeNull();
  });
});
