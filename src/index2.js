// import dotenv from "dotenv";
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./dashboard/App";
// import { BrowserRouter as Router } from "react-router-dom";
// // import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import reducer from "./redux/reducers/index";
// import { ApolloClient } from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";
// dotenv.config();

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "ignore"
//   },
//   query: {
//     fetchPolicy: "no-cache",
//     errorPolicy: "all"
//   }
// };

// const store = createStore(reducer, applyMiddleware(thunk));

// const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.forEach(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     new HttpLink({
//       uri: `${process.env.REACT_APP_BACKEND_URL}`,
//       credentials: "same-origin"
//     })
//   ]),
//   cache: new InMemoryCache(),
//   defaultOptions: defaultOptions
// });

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </ApolloProvider>,
//   document.getElementById("root")
// );

//old boost way of doing things
// const store = createStore(reducer, applyMiddleware(thunk));
// const client = new ApolloClient({
//   uri: `${process.env.REACT_APP_BACKEND_URL}`,
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log("graphQLErrors", graphQLErrors);
//     console.log("networkErrors", networkError);
//   },
//   connectToDevTools: true
// });

// import dotenv from "dotenv";
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./dashboard/App";
// import { BrowserRouter as Router } from "react-router-dom";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";
// import reducer from "./redux/reducers/index";
// dotenv.config();

// const store = createStore(reducer, applyMiddleware(thunk));
// const client = new ApolloClient({
//   uri: `${process.env.REACT_APP_BACKEND_URL}`,
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log("graphQLErrors", graphQLErrors);
//     console.log("networkErrors", networkError);
//   }
// });
// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </ApolloProvider>,
//   document.getElementById("root")
// );
