import { useEffect } from "react";

export function useOverlayHeight(isOverlayOpen: boolean) {
  useEffect(() => {
    const overlay = document.querySelector(".overlay") as HTMLElement;

    const adjustOverlayHeight = () => {
      if (overlay) {
        overlay.style.height = `${document.body.scrollHeight}px`;
      }
    };

    const resetOverlayHeight = () => {
      if (overlay) {
        overlay.style.height = "";
      }
    };

    if (isOverlayOpen) {
      adjustOverlayHeight();
    } else {
      resetOverlayHeight();
    }

    window.addEventListener("resize", adjustOverlayHeight);

    return () => {
      window.removeEventListener("resize", adjustOverlayHeight);
    };
  }, [isOverlayOpen]);
}
