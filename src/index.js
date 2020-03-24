import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import App from "./dashboard/App";
import { BrowserRouter as Router } from "react-router-dom";
import { initGA } from "./dashboard/GoogleAnalytics/index";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// (function initAnalytics() {
//   initGA("UA-158701427-1");
// })();

const client = new ApolloClient({
  uri: `https://sauti-marketplace-p.herokuapp.com/graphql`,
  // uri: "https://sauti-databank.herokuapp.com/graphql",
  // uri: "http://localhost:2500/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkErrors", networkError);
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
