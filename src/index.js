import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
if (module.hot) {
  module.hot.accept();
}

//save login users
localStorage.setItem("user1", "pass@123");
localStorage.setItem("user2", "pass@123");
localStorage.setItem("user3", "pass@123");
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
