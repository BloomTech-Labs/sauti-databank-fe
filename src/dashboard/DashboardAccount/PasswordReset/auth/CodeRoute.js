import React from "react";
import { Route, Redirect } from "react-router-dom";

function CodeRoute(props) {
  const { component: Component, ...rest } = props;

  // Grabbing the token part
  const resetToken = new URLSearchParams(window.location.search).get(
    "resetToken"
  );

  // setting the token into localstorage
  localStorage.setItem("resetToken", resetToken);

  return (
    <Route
      {...rest}
      render={renderProps => {
        if (localStorage.getItem("resetToken")) {
          return <Component {...renderProps} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default CodeRoute;
