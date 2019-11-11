import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.scss";

const LoginPanel = props => {
  const [panelState, setPanelState] = useState({
    userName: localStorage.getItem("savedUserName"),
    password: localStorage.getItem("savedUserPassword"),
    isChecked: localStorage.getItem("savedUserName") != null ? true : false
  });

  const handleChange = (event, type) => {
    if (type === "username") {
      event.preventDefault();
      setPanelState({ ...panelState, userName: event.target.value });
    } else if (type === "password") {
      event.preventDefault();
      setPanelState({ ...panelState, password: event.target.value });
    } else if (type === "rememberMe") {
      setPanelState({ ...panelState, isChecked: !panelState.isChecked });
    }
  };
  return (
    <section className={styles.userLoginPanel}>
      <h1>User Login Panel</h1>
      <form onSubmit={event => props.onSubmitForm(panelState, props.history)}>
        <div>
          <label>Username:</label>
          <br />
          <input
            type='text'
            name='username'
            autoComplete='false'
            defaultValue={localStorage.getItem("savedUserName") != null ? localStorage.getItem("savedUserName") : ""}
            onChange={event => handleChange(event, "username")}
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type='password'
            name='password'
            autoComplete='false'
            defaultValue={localStorage.getItem("savedUserPassword") != null ? localStorage.getItem("savedUserPassword") : ""}
            onChange={event => handleChange(event, "password")}
          />
        </div>
        <div>
          <input type='checkbox' name='rememberMe' checked={panelState.isChecked} onChange={() => handleChange(null, "rememberMe")}></input>
          <label>Remember Me</label>
        </div>
        <button className={styles.btnLogin} type='submit' name='loginBtn'>
          Login
        </button>
      </form>
    </section>
  );
};

export default withRouter(LoginPanel);
