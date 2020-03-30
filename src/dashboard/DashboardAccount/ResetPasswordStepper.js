/* eslint-disable default-case */
import React, { useState } from "react";
import ResetPasswordCode from "./ResetPasswordCode";
import ResetPasswordFinal from "./ResetPasswordFinal";
import { PasswordReset } from "../styledComponents/DashAccount";

const ResetPasswordStepper = () => {
  const [step, setStep] = useState("Step 1");

  const steps = {
    "Step 1": <ResetPasswordCode />,
    "Step 2": <ResetPasswordFinal />
  };

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

  return steps[step];
};

export default ResetPasswordStepper;
