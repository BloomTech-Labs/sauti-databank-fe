import React, { useState } from "react";
import { PasswordReset } from "../styledComponents/DashAccount";
import ResetPasswordStepper from "./ResetPasswordStepper";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// 1. User hits forgot password
// 2. User enters in their email
// 3. If user exists we attach a random code to their account (DB) + send them that email with the code
// 4. User enters in code, if it matches then use can change their password

const ResetPasswordContainer = () => {
  const [step, setStep] = useState(null);

  const handleNextStep = () => {
    setStep({
      step: step + 1
    });
  };

  const handlePrevStep = () => {
    setStep({
      step: step - 1
    });
  };

  return (
    <PasswordReset>
      <div className="container">
        <div className="container-header">
          <h1>Sauti Databank</h1>
          <h2>Reset Password</h2>
        </div>
        <div className="container-stepper">
          <ResetPasswordStepper />
        </div>
      </div>
    </PasswordReset>
  );
};

export default ResetPasswordContainer;
