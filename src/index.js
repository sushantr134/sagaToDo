import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (module.hot) {
  module.hot.accept();
}

//save login users
localStorage.setItem("user1", "pass@123");
localStorage.setItem("user2", "pass@123");
localStorage.setItem("user3", "pass@123");

ReactDOM.render(<App />, document.getElementById("root"));
