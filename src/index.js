import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Welcome from "./Welcome";
import registerServiceWorker from "./registerServiceWorker";

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Welcome />, document.getElementById("root"));

registerServiceWorker();
