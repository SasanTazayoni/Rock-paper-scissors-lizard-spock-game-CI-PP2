import { render, fireEvent } from "@testing-library/react";
import { describe, test, vi, expect } from "vitest";
import RulesModal from "./RulesModal";

describe("RulesModal", () => {
  test("renders when showRulesModal is true", () => {
    const { getByText } = render(
      <RulesModal showRulesModal={true} toggleRulesModal={() => {}} />
    );

    expect(getByText(/how it works/i)).toBeInTheDocument();
    expect(getByText(/play game/i)).toBeInTheDocument();
  });

  test("does not render when showRulesModal is false", () => {
    const { container } = render(
      <RulesModal showRulesModal={false} toggleRulesModal={() => {}} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("calls toggleRulesModal when Play game button is clicked", () => {
    const toggleMock = vi.fn();
    const { getByText } = render(
      <RulesModal showRulesModal={true} toggleRulesModal={toggleMock} />
    );

    const button = getByText(/play game/i);
    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
