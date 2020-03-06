import React from "react";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken } from "./auth/Auth";
import PaypalButton from "../Components/PaypalButton";

import styled from "styled-components";

function DashAccount(props) {
  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }

  const history = useHistory();

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

  return (
    <AccountPageDiv>
      <div>
        {/* top */}
        <TopContainerDiv>
          <div>
            <H1>Need more data?</H1>
            <p>Upgrade to our paid plan to access all material.</p>
          </div>
        </TopContainerDiv>
        {/* free */}
        <UserTypeContainerDiv>
          <div>
            <H1>Free Account</H1>
            <p>Continue straight to the app.</p>
            <H2>Free</H2>
          </div>
          <div>
            <p>Feature</p>
            <p>Feature</p>
            <p>Feature</p>
            <p>Feature</p>
          </div>
          <ButtonDiv>
            <ContinueButton type="submit" onClick={handleSubmit}>
              Continue
            </ContinueButton>
          </ButtonDiv>
        </UserTypeContainerDiv>
      </div>

      <div>
        {/* paid */}
        <UserTypeContainerDivLong>
          <div>
            <H1>Premium Account</H1>
            <p>Continue to the payment page to complete upgrade.</p>
            <H2>$9.99/month</H2>
          </div>
          <div>
            <p>Feature</p>
            <p>Feature</p>
            <p>Feature</p>
            <p>Feature</p>
          </div>
          <ButtonDiv>
            <ContinueButton type="submit" onClick={handleSubmit}>
              Continue to Payment
            </ContinueButton>
          </ButtonDiv>
        </UserTypeContainerDivLong>
      </div>
    </AccountPageDiv>
  );
}

export default DashAccount;

const AccountPageDiv = styled.div`
  font-size: 1.8rem;
  font-weight: normal;
  display: flex;
  justify-content: center;
`;
const TopContainerDiv = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
  border: 2px solid grey;
  border-radius: 5px;
  height: 200px;
`;
const UserTypeContainerDiv = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  border-radius: 5px;
  height: 350px;
`;
const UserTypeContainerDivLong = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  border-radius: 5px;
  height: 569px;
`;
const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase
  margin-top: 10px;
  margin-bottom: 10px;
  color: #eb5e52;
`;
const ButtonDiv = styled.div`
  width: 100%;
  text-align: center;
`;
const ContinueButton = styled.button`
  background: transparent;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  transition: 0.5s ease;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 2%;
  &:hover {
    color: white;
    background-color: #eb5e52;
    cursor: pointer;
  }
`;
