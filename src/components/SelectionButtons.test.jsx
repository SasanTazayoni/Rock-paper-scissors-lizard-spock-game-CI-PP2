import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import SelectionButtons from "./SelectionButtons";

describe("SelectionButtons", () => {
  test("renders all selection buttons with correct aria-labels", () => {
    const { getByRole } = render(
      <SelectionButtons handleSelection={() => {}} />
    );

    expect(getByRole("button", { name: /rock icon/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /paper icon/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /scissors icon/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /lizard icon/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /spock icon/i })).toBeInTheDocument();
  });

  test.each([
    ["rock", "Rock icon: A fist raised in a rock gesture"],
    ["paper", "Paper icon: An open hand with fingers spread"],
    ["scissors", "Scissors icon: A hand showing the scissors gesture"],
    ["lizard", "Lizard icon: A hand showing the lizard gesture"],
    ["spock", "Spock icon: A hand showing the Spock gesture"],
  ])(
    "calls handleSelection with '%s' when %s button is clicked",
    (choice, ariaLabel) => {
      const handleSelection = vi.fn();
      const { getByRole } = render(
        <SelectionButtons handleSelection={handleSelection} />
      );

      fireEvent.click(getByRole("button", { name: ariaLabel }));

      expect(handleSelection).toHaveBeenCalledWith(choice);
    }
  );
});
