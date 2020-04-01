/* eslint-disable default-case */
import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ResetPasswordCode from "./ResetPasswordCode";
import ResetPasswordFinal from "./ResetPasswordFinal";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

const USER_QUERY = gql`
  query getUser($existingEmail: Email!) {
    User: databankUser(input: $existingEmail) {
      verification_code
    }
  }
`;

const ResetPasswordStepper = props => {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { existingEmail: { email: props.decodedToken.email } }
  });

  const [step, setStep] = useState("Step 1");

  if (loading) {
    return (
      <div className="loader-container">
        <Loader
          className="loader"
          type="Oval"
          color="#708090"
          width={100}
          timeout={12000}
        />
      </div>
    );
  }

  const steps = {
    "Step 1": (
      <ResetPasswordCode
        length={5}
        label="Please enter in your code below"
        onComplete={code => {
          if (code == data.User.verification_code) {
            swal({ title: "", text: "Success!", icon: "success" });
            setStep("Step 2");
          } else {
            swal({
              title: "Error",
              text: "Incorrect Code",
              icon: "warning",
              dangerMode: true
            });
          }
        }}
      />
    ),
    "Step 2": <ResetPasswordFinal props={props.decodedToken} />
  };

  return steps[step];
};

export default ResetPasswordStepper;
