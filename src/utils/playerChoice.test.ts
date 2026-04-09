import { describe, test, expect } from "vitest";
import { getPlayerChoice } from "./playerChoice";
import { rules } from "./rules";
import type { Selection } from "./rules";

describe("getPlayerChoice", () => {
  test.each<[Selection]>([["rock"], ["paper"], ["scissors"], ["lizard"], ["spock"]])(
    "returns correct rule object for %s",
    (selection) => {
      const result = getPlayerChoice(selection);
      expect(result).toEqual(rules.find((rule) => rule.name === selection));
    }
  );
});
