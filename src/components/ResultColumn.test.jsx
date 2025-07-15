import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ResultColumn from "./ResultColumn";

describe("ResultColumn component", () => {
  test("should render the label and score", () => {
    render(<ResultColumn label="Player" score={3} results={[]} />);
    expect(screen.getByText(/Player/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});

describe("ResultColumn results rendering", () => {
  test("renders results with winner class when isWinner is true", () => {
    const results = [
      { symbol: "✊", isWinner: false },
      { symbol: "✋", isWinner: true },
    ];

    render(<ResultColumn label="Computer" score={1} results={results} />);

    expect(screen.getByText("✊")).toBeInTheDocument();
    expect(screen.getByText("✋")).toBeInTheDocument();

    const nonWinnerDiv = screen.getByText("✊").closest(".result");
    expect(nonWinnerDiv).not.toHaveClass("winner");

    const winnerDiv = screen.getByText("✋").closest(".result");
    expect(winnerDiv).toHaveClass("winner");
  });
});

describe("ResultColumn score color styling", () => {
  test("applies green color when label is 'Player'", () => {
    render(<ResultColumn label="Player" score={0} results={[]} />);
    const playerScore = screen.getByText("0");
    expect(playerScore).toHaveStyle({ color: "rgb(1, 207, 1)" });
  });

  test("applies red color when label is not 'Player'", () => {
    render(<ResultColumn label="Computer" score={0} results={[]} />);
    const computerScore = screen.getByText("0");
    expect(computerScore).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
