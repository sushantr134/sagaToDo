import React, { useState } from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";

import LoginPanel from "./MainScreen/loginWindow";

const client = new ApolloClient({ uri: process.env.GraphQL_SERVER_ENDPOINT });

const App = () => {
  const query = gql`
    query {
      me {
        name
        email
      }
    }
  `;

  const handleOnSubmit = ({ userName, password, isChecked }) => {
    const users = new Array();
    users.push(
      { username: "user1", password: localStorage.getItem("user1") },
      { username: "user2", password: localStorage.getItem("user2") },
      { username: "user3", password: localStorage.getItem("user3") }
    );
    //  alert(users);
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
      } else {
        alert("login failed");
      }
    }
  };

  return (
    <ApolloProvider client={client}>
      {/* <Query query={query}>
        {({ loading, err, data }) => {
          if (loading) {
            return <h3>Loading... </h3>;
          }
          if (err) {
            return err;
          }
          return (
            <h2>
              Data from Graphql:- {data.me[0].name} {data.me[0].email}
            </h2>
          );
        }}
      </Query> */}
      <LoginPanel onSubmitForm={handleOnSubmit} />
    </ApolloProvider>
  );
};

export default App;
