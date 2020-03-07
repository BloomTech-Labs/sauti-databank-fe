import React from "react";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken } from "./auth/Auth";
import PaypalButton from "../Components/PaypalButton";

import styled from "styled-components";
import "../index.css";

function DashAccount(props) {
  // const token = getToken();
  // let tier;
  // if (token) {
  //   tier = decodeToken(token);
  //   tier = tier.tier;
  // }

  const history = useHistory();

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

  return (
    <>
      <AccountPageDiv>
        <Div>
          <H1>Need more data?</H1>
          <P>Upgrade to our paid plan to access all material.</P>
        </Div>
        <Div2>
          <UserTypeContainerDiv>
            <div>
              <H1>Free Account</H1>
              <H2>Free</H2>
            </div>
            <ul className="features-list">
              <li className="features-item">Create an account</li>
              <li className="features-item">Change data filters</li>
              <li className="features-item">X</li>
              <li className="features-item">X</li>
              <li className="features-item">X</li>
            </ul>
            <ButtonDiv>
              <ContinueButton2 type="submit" onClick={handleSubmit}>
                Continue
              </ContinueButton2>
            </ButtonDiv>
          </UserTypeContainerDiv>
          <UserTypeContainerDiv>
            <div>
              <H1>Premium Account</H1>
              <H2>$9.99/month</H2>
            </div>
            <ul className="features-list">
              <li className="features-item">Create an account</li>
              <li className="features-item">Change data filters</li>
              <li className="features-item">Download data into csv</li>
              <li className="features-item">Additional filter options</li>
              <li className="features-item">Filter data by date</li>
            </ul>
            <ButtonDiv>
              {/* This button will open a modal with the paypal button on it */}
              <ContinueButton2 type="submit" onClick={handleSubmit}>
                Continue to Payment
              </ContinueButton2>
            </ButtonDiv>
            {/* <PaypalButton /> */}
          </UserTypeContainerDiv>
        </Div2>
      </AccountPageDiv>
    </>
  );
}

export default DashAccount;

const Div = styled.div`
  text-align: center;
  margin: 5rem 0;
`;
const Div2 = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ContinueButton2 = styled.div`
  display: inline-block;
  text-decoration: none;
  color: black;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  padding: 1rem 3rem;
  margin-top: 2rem;
  transition: 0.5s ease;
  &:hover {
    color: white;
    background-color: #eb5e52;
    cursor: pointer;
  }
`;
const AccountPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 15%;
`;
const UserTypeContainerDiv = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  border-radius: 5px;
  width: 35%;
  height: 550px;
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;
const P = styled.p`
  font-size: 3rem;
  opacity: 0.75;
`;
const H2 = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase
  margin-top: 10px;
  margin-bottom: 10px;
  color: green;
`;
const ButtonDiv = styled.div`
  width: 100%;
  text-align: center;
`;
