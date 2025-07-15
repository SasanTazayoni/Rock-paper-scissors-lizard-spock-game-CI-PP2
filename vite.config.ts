import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Rock-paper-scissors-lizard-spock-game-CI-PP2/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text"],
    },
  },
});
