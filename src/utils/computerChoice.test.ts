import { describe, test, expect } from "vitest";
import { getComputerChoice } from "./computerChoice";
import { rules } from "./rules";

describe("getComputerChoice", () => {
  test("returns a valid choice from the rules array", () => {
    const choice = getComputerChoice();
    expect(rules).toContain(choice);
  });
});
