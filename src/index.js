import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";

import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Routes />
    </Provider>
  </Router>,
  document.getElementById("root")
);
