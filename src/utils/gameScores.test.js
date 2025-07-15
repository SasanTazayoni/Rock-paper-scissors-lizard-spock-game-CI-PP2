import { beforeEach, test, expect, describe, vi } from "vitest";
import { updateGameScores } from "./gameScores";

describe("updateGameScores", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("increments player score on WIN and updates localStorage", () => {
    localStorage.setItem(
      "gameScores",
      JSON.stringify({ player: 2, computer: 3 })
    );
    const setPlayerGameWins = vi.fn();
    const setComputerGameWins = vi.fn();

    updateGameScores("WIN", setPlayerGameWins, setComputerGameWins);

    expect(setPlayerGameWins).toHaveBeenCalledWith(3);
    expect(setComputerGameWins).not.toHaveBeenCalled();

    const stored = JSON.parse(localStorage.getItem("gameScores"));
    expect(stored).toEqual({ player: 3, computer: 3 });
  });

  test("increments computer score on LOSE and updates localStorage", () => {
    localStorage.setItem(
      "gameScores",
      JSON.stringify({ player: 4, computer: 1 })
    );
    const setPlayerGameWins = vi.fn();
    const setComputerGameWins = vi.fn();

    updateGameScores("LOSE", setPlayerGameWins, setComputerGameWins);

    expect(setComputerGameWins).toHaveBeenCalledWith(2);
    expect(setPlayerGameWins).not.toHaveBeenCalled();

    const stored = JSON.parse(localStorage.getItem("gameScores"));
    expect(stored).toEqual({ player: 4, computer: 2 });
  });

  test("handles empty localStorage gracefully", () => {
    const setPlayerGameWins = vi.fn();
    const setComputerGameWins = vi.fn();

    updateGameScores("WIN", setPlayerGameWins, setComputerGameWins);

    expect(setPlayerGameWins).toHaveBeenCalledWith(1);
    expect(setComputerGameWins).not.toHaveBeenCalled();

    const stored = JSON.parse(localStorage.getItem("gameScores"));
    expect(stored).toEqual({ player: 1, computer: 0 });
  });
});
