import { renderHook, act } from "@testing-library/react";
import { beforeEach, test, expect, describe } from "vitest";
import { useGameWins } from "./useGameWins";

describe("useGameWins hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loads stored game scores from localStorage", () => {
    localStorage.setItem(
      "gameScores",
      JSON.stringify({ player: 3, computer: 7 })
    );
    const { result } = renderHook(() => useGameWins());
    expect(result.current.playerGameWins).toBe(3);
    expect(result.current.computerGameWins).toBe(7);
  });

  test("defaults to 0 if no localStorage data", () => {
    const { result } = renderHook(() => useGameWins());
    expect(result.current.playerGameWins).toBe(0);
    expect(result.current.computerGameWins).toBe(0);
  });

  test("handles missing or falsy player/computer values in localStorage", () => {
    localStorage.setItem("gameScores", JSON.stringify({ player: 0 }));
    const { result } = renderHook(() => useGameWins());
    expect(result.current.playerGameWins).toBe(0);
    expect(result.current.computerGameWins).toBe(0);
  });
});
