import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { useOverlayHeight } from "./useOverlayHeight";

describe("useOverlayHeight", () => {
  let overlay;

  beforeEach(() => {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    overlay.style.height = "";
  });

  afterEach(() => {
    document.body.removeChild(overlay);
    vi.clearAllMocks();
  });

  test("sets overlay height to document.body.scrollHeight when isOverlayOpen is true", () => {
    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      value: 1234,
    });

    renderHook(() => useOverlayHeight(true));

    expect(overlay.style.height).toBe("1234px");
  });

  test("resets overlay height when isOverlayOpen is false", () => {
    overlay.style.height = "999px";

    renderHook(() => useOverlayHeight(false));

    expect(overlay.style.height).toBe("");
  });

  test("adds window resize event listener", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => useOverlayHeight(true));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  test("removes window resize event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useOverlayHeight(true));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  test("window resize event triggers overlay height adjustment", () => {
    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      value: 2000,
    });

    const { rerender } = renderHook(({ isOpen }) => useOverlayHeight(isOpen), {
      initialProps: { isOpen: true },
    });

    expect(overlay.style.height).toBe("2000px");

    Object.defineProperty(document.body, "scrollHeight", {
      configurable: true,
      value: 3000,
    });

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(overlay.style.height).toBe("3000px");

    rerender({ isOpen: false });

    expect(overlay.style.height).toBe("");
  });
});
