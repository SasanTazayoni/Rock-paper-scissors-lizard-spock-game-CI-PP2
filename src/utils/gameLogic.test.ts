import { beforeEach, describe, expect, test, vi } from "vitest";
import { playGameRound } from "./gameLogic";
import * as playerChoiceModule from "./playerChoice";
import type { Rule } from "./rules";

describe("playGameRound", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("returns DRAW when player and computer choices are the same", () => {
    const mockRule: Rule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };
    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(mockRule);

    const result = playGameRound("rock", mockRule);
    expect(result).toBe("DRAW");
  });

  test("returns WIN when player beats computer", () => {
    const playerRule: Rule = {
      name: "paper",
      beats: ["rock", "spock"],
      symbol: "🖐",
    };
    const computerRule: Rule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };

    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(playerRule);

    const result = playGameRound("paper", computerRule);
    expect(result).toBe("WIN");
  });

  test("returns LOSE when computer beats player", () => {
    const playerRule: Rule = {
      name: "rock",
      beats: ["scissors", "lizard"],
      symbol: "✊",
    };
    const computerRule: Rule = {
      name: "paper",
      beats: ["rock", "spock"],
      symbol: "🖐",
    };

    vi.spyOn(playerChoiceModule, "getPlayerChoice").mockReturnValue(playerRule);

    const result = playGameRound("rock", computerRule);
    expect(result).toBe("LOSE");
  });
});
