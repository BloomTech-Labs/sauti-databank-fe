import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./dashboard/App";
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducers/index";
dotenv.config();

const store = createStore(reducer, applyMiddleware(thunk));
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}`,
  // uri: "localhost:2500/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkErrors", networkError);
  }
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
