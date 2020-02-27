import React, { useState } from "react";
import styled from "styled-components";

const ErrorDiv = styled.div`
  background-color: red;
  color: white;
  margin-bottom: 1rem;
`;

const SuccessDiv = styled.div`
  background-color: green;
  color: white;
  margin-bottom: 1rem;
`;

function ValidationMessage(props) {
  const { message } = props;

  const [visible, setVisible] = useState(false);

  return (
    <div>
      {message === "✔︎" ? (
        <SuccessDiv>{message}</SuccessDiv>
      ) : (
        <ErrorDiv isOpen={visible}>{message}</ErrorDiv>
      )}
    </div>
  );
}

export default ValidationMessage;
