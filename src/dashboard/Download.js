import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ContentContainer } from "./styledComponents/Index";
import styled from "styled-components";

const LoginButton = styled.button`
  background-color: transparent;
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  padding: 3%;
  transition: 0.5s ease;
  width: 45%;
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  border: 2px solid #eb5e52;
  font-weight: bold;
  &:hover {
    background-color: #eb5e52;
    cursor: pointer;
    color: white;
  }
`;
export const Div = styled.div`
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;
  border-radius: 10px;
`;
export const FormTitle = styled.h1`
  font-weight: 500;
  font-size: 3rem;
`;
export const DownloadText = styled.p`
  border: 0;
  display: block;
  margin: 20px auto;
  width: 65%;
  font-size: 1.6rem;
  color: grey;
`;
const BigX = styled.big`
  margin-left: 490px;
  font-size: 2.5rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
const BigContinue = styled.big`
  font-weight: bold;
  color: black;
`;

function Download(props) {
  const history = useHistory();

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    props.handleClose();
    history.push("/");
  };

  return (
    <ContentContainer>
      <div>
        <Div>
          <BigX onClick={props.handleClose}>X</BigX>
          <FormTitle>Want to see this feature?</FormTitle>
          <DownloadText>
            Click <BigContinue>Continue</BigContinue> if you'd like to upgrade
            your account to premium.
          </DownloadText>
          <LoginButton type="submit" onClick={handleSubmit}>
            Continue
          </LoginButton>
        </Div>
      </div>
    </ContentContainer>
  );
}

export default Download;
