import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  localStorage.removeItem("token");
  localStorage.removeItem("__paypal_storage__");
  localStorage.removeItem("xyz");
  return <Redirect to="/" />;
}

export default Logout;
