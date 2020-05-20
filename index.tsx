import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./App";

const rootElem = document.createElement("div");
document.body.appendChild(rootElem);
ReactDOM.render(<App></App>, rootElem);
