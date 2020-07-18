import React from "react";
import { useHistory } from "react-router-dom";
import { ContentContainer } from "../../dashboard/styledComponents/Index";
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
  margin-left: 420px;
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

function AddFilterModal({ closeAddFilterModal }) {
  const history = useHistory();

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    closeAddFilterModal();
    //if logged in push to account page
    //if not logged in push you to signup
    if (localStorage.getItem("token")) {
      history.push("/myaccount");
    } else {
      history.push("/noaccount");
    }
  };

  const handleSignIn = async (e, input) => {
    e.preventDefault();
    closeAddFilterModal();
    history.push("/signup");
  };

  return (
    <ContentContainer>
      <div>
        <Div>
          <BigX onClick={closeAddFilterModal}>X</BigX>
          <FormTitle>Would you like to add additional filters?</FormTitle>
          <DownloadText>
            Click <BigContinue>Continue</BigContinue> if you'd like to upgrade
            your account to premium.
          </DownloadText>
          <LoginButton type="submit" onClick={handleSubmit}>
            Continue
          </LoginButton>
          <h1>Already have an account.</h1>
          <LoginButton type="submit" onClick={handleSignIn}>
            Sign in
          </LoginButton>
        </Div>
      </div>
    </ContentContainer>
  );
}
export default AddFilterModal;
