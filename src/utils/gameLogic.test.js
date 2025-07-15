import { beforeEach, describe, expect, test, vi } from "vitest";
import { playGameRound } from "./gameLogic";
import * as playerChoiceModule from "./playerChoice";

describe("playGameRound", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("returns DRAW when player and computer choices are the same", () => {
    const mockRule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };
    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(mockRule);

    const result = playGameRound("rock", mockRule);
    expect(result).toBe("DRAW");
  });

  test("returns WIN when player beats computer", () => {
    const playerRule = {
      name: "paper",
      beats: ["rock", "spock"],
      symbol: "🖐",
    };
    const computerRule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };

    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(playerRule);

    const result = playGameRound("paper", computerRule);
    expect(result).toBe("WIN");
  });

  test("returns LOSE when computer beats player", () => {
    const playerRule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };
    const computerRule = {
      name: "paper",
      beats: ["rock", "spock"],
      symbol: "🖐",
    };

    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(playerRule);

    const result = playGameRound("rock", computerRule);
    expect(result).toBe("LOSE");
  });
});
