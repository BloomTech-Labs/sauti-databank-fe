import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({ 
    uri: "http://localhost:4000/graphql"
  });  

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>
, document.getElementById('root'));
