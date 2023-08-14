import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

import App from "./app.js";

class Main extends React.Component {
  render() {
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
