import React from "react";
import styled from "styled-components";
import CheckMarkSVG from "./Images/CheckMarkSVG";

const Container = styled.div`
  padding: 2%;
  height: 60rem;

  .container-row {
    display: flex;
    height: 100%;
    flex-direction: row;
  }

  .row-column-one {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
  }
  .row-column-two {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
  }
  .row-column-three {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
  }
  .row-column-four {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
  }
  .row-column-five {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
  }

  .feature-container {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;

    .feature-list {
      span {
        font-size: 2.2rem;
      }
    }
  }
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  background: #252625;
  padding: 1rem;
  color: #d9d9d9;

  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
    letter-spacing: 1px;
  }

  h2 {
    letter-spacing: 1px;
    font-weight: 600;
    font-size: 2.3rem;
  }

  h3 {
    font-size: 2rem;
  }

  span {
    letter-spacing: 1px;
    font-size: 2.1rem;
    color: yellow;
  }
`;

const FeaturedItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

const Div = styled.div`
  text-align: center;
  margin: 5rem 0;

  h1 {
    line-height: 1.5;
    font-size: 3rem;
  }

  p {
    font-size: 2.5rem;
  }
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
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid grey;
  border-radius: 5px;
  width: 35%;
  height: 600px;
  background: #3d3e40;
  color: #d9d9d9;

  &:nth-child(4) {
  }
`;

const P = styled.p`
  font-size: 3rem;
  opacity: 0.75;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;
  width: 100%;
`;

const Big = styled.big`
  color: #eb5e52;
`;

const FreeAccount = props => {
  const { data } = props.data;
  const { handleSubscriptionCancellation } = props;

  return (
    <React.Fragment>
      <Div>
        <h1>Hello, </h1>
        <p>Your current and active plan is below</p>
      </Div>
      <Div2>
        <UserTypeContainerDiv>
          <PlanHeader>
            <h1>Free</h1>
            <h3>
              <span>$9.99</span> every month
            </h3>
          </PlanHeader>
          <FeaturedItems>
            <ul className="features-list">
              <li className="features-item">
                <CheckMarkSVG />
                Create an account
              </li>
              <li className="features-item">
                <CheckMarkSVG />
                Change data filters
              </li>
              <li className="features-item">
                <CheckMarkSVG />
                Download Data into Excel
              </li>
              <li className="features-item">
                <CheckMarkSVG />
                Additional Filter Options
              </li>
              <li className="features-item">
                <CheckMarkSVG />
                Filter Data by date
              </li>
            </ul>
          </FeaturedItems>
          <ButtonDiv>
            {data && data.databankUser.p_next_billing_time ? (
              <p>
                Your subscription will expire on{" "}
                {new Date(
                  parseInt(data.databankUser.p_next_billing_time)
                ).toDateString()}
              </p>
            ) : (
              <ContinueButton2 onClick={handleSubscriptionCancellation}>
                Cancel Subscription
              </ContinueButton2>
            )}
          </ButtonDiv>
        </UserTypeContainerDiv>
      </Div2>
    </React.Fragment>
  );
};

export default FreeAccount;
