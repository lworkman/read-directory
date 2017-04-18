require("../sass/main.scss");
import React from "react";
import ReactDOM from "react-dom";
import CodePanel from "./containers/code-panel.jsx";
 
ReactDOM.render(
  <CodePanel />,
  document.querySelector("#container")
);