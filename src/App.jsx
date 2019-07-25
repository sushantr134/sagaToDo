import React, { useState } from "react";
import styles from "./app.global.scss";

import { ApolloProvider, Query } from "react-apollo";
import ApolloClient, { gql } from "apollo-boost";

const client = new ApolloClient({ uri: process.env.GraphQL_SERVER_ENDPOINT });

const App = () => {
  const [countState, setCount] = useState({ count: 0 });

  const handleCount = () => {
    setCount({ count: countState.count + 1 });
  };
  const query = gql`
    query {
      me {
        name
        email
      }
    }
  `;
  return (
    <ApolloProvider client={client}>
      <Query query={query}>
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
      </Query>
      <button className={styles.buttonDefault} onClick={handleCount}>
        Click Me
      </button>
      <h1>count: {countState.count}</h1>
    </ApolloProvider>
  );
};

export default App;
