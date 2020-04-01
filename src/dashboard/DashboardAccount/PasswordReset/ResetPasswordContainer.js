import React, { useState } from "react";
import { PasswordReset } from "../../styledComponents/DashAccount";
import ResetPasswordStepper from "./ResetPasswordStepper";
import { decodeToken } from "../../auth/Auth";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const ResetPasswordContainer = () => {
  const history = useHistory();
  let getToken = localStorage.getItem("resetToken");
  let decodedToken = decodeToken(getToken);

  let decodeTokenEXP = new Date(decodedToken.exp * 1000);

  if (decodeTokenEXP <= new Date()) {
    swal({
      title: "Error",
      text: "Password Reset Link Has Expired. Please get a new code.",
      icon: "warning",
      dangerMode: true
    });
    history.push("/passwordreset");
  }

  return (
    <PasswordReset>
      <div className="container">
        <div className="container-header">
          <h1>Hello</h1>
          <h2>{decodedToken.email}</h2>
        </div>
        <div className="container-stepper">
          <ResetPasswordStepper decodedToken={decodedToken} />
        </div>
      </div>
    </PasswordReset>
  );
};

export default ResetPasswordContainer;
