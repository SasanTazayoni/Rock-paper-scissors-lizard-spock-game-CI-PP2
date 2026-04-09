import { render, cleanup } from "@testing-library/react";
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import Footer from "./Footer";

function addFooterRoot() {
  const div = document.createElement("div");
  div.id = "footer-root";
  document.body.appendChild(div);
}

describe("Footer", () => {
  beforeEach(() => {
    addFooterRoot();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  test("renders copyright text", () => {
    const { getByText } = render(<Footer />);
    expect(
      getByText(/rock paper scissors lizard spock game 2025/i)
    ).toBeInTheDocument();
  });

  test("contains a link to the GitHub profile", () => {
    const { getByRole } = render(<Footer />);
    const link = getByRole("link", { name: /github profile link/i });
    expect(link).toHaveAttribute("href", "https://github.com/SasanTazayoni");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
