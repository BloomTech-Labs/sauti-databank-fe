import React, { useState } from "react";
import { ResetPasswordCodeStyles } from "../styledComponents/DashAccount";
import { ThemeConsumer } from "styled-components";

// Code Verification
// Numbers entered into input adds onto the finalCode state, if deleted it removes them
// Verify button checks finalCode only
// If code doesnt match, isn't 5 numbers, etc, it pops up an error.

const ResetPasswordCode = () => {
  const [input, setInput] = useState([]);
  const [fullCode, setFullCode] = useState([]);

  const handleChange = event => {
    event.preventDefault();
    const validateNumber = event.target.validity.valid
      ? event.target.value
      : input;
    setInput(validateNumber);
    setFullCode(prev => [prev, validateNumber]);
  };

  console.log(fullCode, "full code");

  //   const handleChange = event => {
  //     event.preventDefault();
  //     setUser({
  //       ...user,
  //       [event.target.name]: event.target.value
  //     });
  //   };

  return (
    <ResetPasswordCodeStyles>
      <div className="code-container">
        <div className="code-container-header">
          <h1>Code Verifcation</h1>
        </div>
        <div className="code-container-number-container">
          <input
            minLength="1"
            maxLength="1"
            value={input}
            onInput={handleChange}
            type="text"
            pattern="[0-9]*"
            className="code-number-box"
          />
          <input
            minLength="1"
            maxLength="1"
            value={input}
            onInput={handleChange}
            type="text"
            pattern="[0-9]*"
            className="code-number-box"
          />
        </div>
      </div>
    </ResetPasswordCodeStyles>
  );
};

export default ResetPasswordCode;
