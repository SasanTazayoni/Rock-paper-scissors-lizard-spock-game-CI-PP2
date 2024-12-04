import React from "react";
import ReactDOM from "react-dom/client";
import GameComponent from "./GameComponent";
import "./assets/css/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameComponent />
  </React.StrictMode>
);
