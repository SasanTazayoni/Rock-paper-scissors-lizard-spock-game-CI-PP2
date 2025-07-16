import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import RulesModal from "./RulesModal";

describe("RulesModal", () => {
  test("renders when showRulesModal is true", () => {
    const { getByText } = render(
      <RulesModal showRulesModal={true} closeRulesModal={() => {}} />
    );

    expect(getByText(/how it works/i)).toBeInTheDocument();
    expect(getByText(/play game/i)).toBeInTheDocument();
  });

  test("does not render when showRulesModal is false", () => {
    const { container } = render(
      <RulesModal showRulesModal={false} closeRulesModal={() => {}} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("calls closeRulesModal when Play game button is clicked", () => {
    const closeMock = vi.fn();
    const { getByText } = render(
      <RulesModal showRulesModal={true} closeRulesModal={closeMock} />
    );

    const button = getByText(/play game/i);
    fireEvent.click(button);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test("renders deployed image when hostname is not 'localhost'", () => {
    Object.defineProperty(window, "location", {
      value: { hostname: "example.com" },
      writable: true,
    });

    const { getByAltText } = render(
      <RulesModal showRulesModal={true} closeRulesModal={() => {}} />
    );

    const image = getByAltText("Rock-paper-lizard-Spock game rules diagram");
    expect(image).toHaveAttribute(
      "src",
      "/Rock-paper-scissors-lizard-spock-game-CI-PP2/images/rules.png"
    );
  });
});
