import React from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  return <Redirect to="/" />;
}

export default Logout;
