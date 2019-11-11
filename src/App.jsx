import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";
import LoginPanel from "./MainScreen/loginWindow";
import Dashboard from "./MainScreen/dashboard";

import { Route, Switch, useHistory, Redirect, withRouter } from "react-router-dom";
const client = new ApolloClient({ uri: process.env.GraphQL_SERVER_ENDPOINT });

const App = props => {
  // const query = gql`
  //   query {
  //     me {
  //       name
  //       email
  //     }
  //   }
  // `;

  const ProtectedRoute = ({ path, Component: Comp, loggedIn, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={props => {
          return loggedIn ? (
            <Comp {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { prevLocation: path, error: "You Need to loggedIn first" } }} />
          );
        }}
      />
    );
  };
  const handleOnSubmit = ({ userName, password, isChecked }, history) => {
    const users = new Array();
    users.push(
      { username: "user1", password: localStorage.getItem("user1") },
      { username: "user2", password: localStorage.getItem("user2") },
      { username: "user3", password: localStorage.getItem("user3") }
    );
    //const history = useHistory();
    const userToBeLoggedIn = users.filter(data => data.username === userName);
    if (userToBeLoggedIn.length === 0) {
      alert("No Such User Exist");
    } else {
      if (isChecked) {
        localStorage.setItem("savedUserName", userName);
        localStorage.setItem("savedUserPassword", password);
      } else {
        localStorage.removeItem("savedUserName");
        localStorage.removeItem("savedUserPassword");
      }
      if (password === userToBeLoggedIn[0].password) {
        alert("login Success");
        localStorage.setItem("loggedIn", true);
        history.push("/dashboard");
      } else {
        localStorage.removeItem("loggedIn");
        alert("login failed");
      }
    }
  };

  const logoutFunction = history => {
    localStorage.removeItem("loggedIn");
    // <Redirect to={{ pathname: "/" }} />;
    alert("logged out");
    history.push("/");
  };

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact={true} path='/'>
          <LoginPanel onSubmitForm={handleOnSubmit} />
        </Route>
        } />
        <ProtectedRoute
          path='/dashboard'
          loggedIn={localStorage.getItem("loggedIn")}
          Component={() => <Dashboard handleLogout={logoutFunction} />}
        />
        <Route render={() => <h1>Error, Page not Found</h1>} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
