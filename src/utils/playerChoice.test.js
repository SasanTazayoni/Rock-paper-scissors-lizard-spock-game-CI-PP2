import { getPlayerChoice } from "./playerChoice";
import { describe, test, expect } from "vitest";
import { rules } from "./rules";

describe("getPlayerChoice", () => {
  test.each([["rock"], ["paper"], ["scissors"], ["lizard"], ["spock"]])(
    "returns correct rule object for %s",
    (selection) => {
      const result = getPlayerChoice(selection);
      expect(result).toEqual(rules.find((rule) => rule.name === selection));
    }
  );
});
