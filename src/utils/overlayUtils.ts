export const adjustOverlayHeight = () => {
  const bodyHeight = document.body.scrollHeight;
  const overlay = document.querySelector(".overlay") as HTMLElement;
  if (overlay) {
    overlay.style.height = `${bodyHeight}px`;
  }
};

export const resetOverlayHeight = () => {
  const overlay = document.querySelector(".overlay") as HTMLElement;
  if (overlay) {
    overlay.style.height = "";
  }
};
