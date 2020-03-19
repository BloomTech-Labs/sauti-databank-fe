import React, { useEffect } from "react";
import CheckMarkSVG from "./Images/CheckMarkSVG";
import CrossSVG from "./Images/CrossSVG";
import { urlPageView } from "./GoogleAnalytics/index";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "./auth/Auth";
import MonthlyButton from "../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../Components/Paypal/BiannuallyButton";
import YearlyButton from "../Components/Paypal/YearlyButton";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";

import swal from "sweetalert";

import styled from "styled-components";
import "../index.css";

const CANCEL_USER_SUB = gql`
  mutation updateUserToFree(
    $newUpdateUserToFreeInput: newUpdateUserToFreeInput!
  ) {
    updateUserToFree(input: $newUpdateUserToFreeInput) {
      ... on DatabankUser {
        email
        subscription_id
      }
      ... on Error {
        message
      }
    }
  }
`;

function DashAccount(props) {
  // GA
  useEffect(() => {
    urlPageView("/account");
  });

  const history = useHistory();

  const token = getToken();
  let tier;
  if (token) {
    tier = decodeToken(token);
    tier = tier.tier;
  }
  let userEmail;
  if (token) {
    userEmail = decodeToken(token);
    userEmail = userEmail.email;
  }
  const newSub = getSubscription();
  let sub;
  if (newSub) {
    sub = newSub;
  }

  const GET_SUBSCRIPTION_ID = gql`
    query($userEmail: String!) {
      databankUser(input: { email: $userEmail }) {
        id
        email
        subscription_id
        p_next_billing_time
        paypal_plan
      }
    }
  `;

  const { loading: fetching, error: err, data, refetch } = useQuery(
    GET_SUBSCRIPTION_ID,
    {
      variables: { userEmail: userEmail }
    }
  );

  if (data) console.log("data billing time", data.databankUser);
  const [cancelSub, { loading, error }] = useMutation(CANCEL_USER_SUB);

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

  if (fetching) {
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

  if (err) {
    return <h1>ERROR!</h1>;
  }

  const handleSubscriptionCancellation = async e => {
    // TODO: grab user's subscription_id with a query to DatabankUsers

    // newSub should be null unless the user has JUST signed up for premium through paypal.
    // Once a user has signed out and returned to the app, the users sub ID is tracked by GET_SUBSCRIPTION_ID.
    if (newSub === null) {
      await cancelSub({
        variables: {
          newUpdateUserToFreeInput: {
            email: userEmail,
            subscription_id: data.databankUser.subscription_id
          }
        }
      });
      // Refetch to get the p_next_billing_time and subscription_id
      refetch();
      // Set the subscription id to null after a user cancels their subscription.
      // data.databankUser.subscription_id = null;
      history.push("/data");
      swal({
        title: "",
        text: "Subscription cancellation has been processed.",
        icon: "success"
      });
    } else {
      swal({
        title: "",
        text: "Please re-log into your account to perform this action",
        icon: "warning"
      });
    }
  };

  const Monthly = data.databankUser.paypal_plan === "Monthly Plan - $9.99";
  const BiAnnually =
    data.databankUser.paypal_plan === "Bi-annually Plan - $49.99";
  const Yearly = data.databankUser.paypal_plan === "Yearly Plan - $89.99";

  console.log(BiAnnually);

  return (
    <>
      {tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
        <AccountPageDiv>
          {tier === "PAID" || newSub ? (
            Monthly ? (
              <React.Fragment>
                <Div>
                  <h1>Hello, </h1>
                  <p>Your current and active plan is below</p>
                </Div>
                <Div2>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Monthly</h2>
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
                      {console.log("DATA", data)}
                      {console.log(
                        "Next Billing Time",
                        data.databankUser.p_next_billing_time
                      )}
                      {data && data.databankUser.p_next_billing_time ? (
                        <p>
                          Your subscription will expire on{" "}
                          {new Date(
                            parseInt(data.databankUser.p_next_billing_time)
                          ).toDateString()}
                        </p>
                      ) : (
                        <ContinueButton2
                          onClick={handleSubscriptionCancellation}
                        >
                          Cancel Subscription
                        </ContinueButton2>
                      )}
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                </Div2>
              </React.Fragment>
            ) : null
          ) : (
            <React.Fragment>
              <Div>
                <h1>Need More Data?</h1>
                <P>Upgrade to our paid plan to access all material.</P>
              </Div>
              <Div2>
                <UserTypeContainerDiv>
                  <div>
                    <h1>Premium Account</h1>
                  </div>
                  <ul className="features-list">
                    <li className="features-item">Create an account</li>
                    <li className="features-item">Change data filters</li>
                    <li className="features-item">Download data into csv</li>
                    <li className="features-item">Additional filter options</li>
                    <li className="features-item">Filter data by date</li>
                  </ul>
                </UserTypeContainerDiv>
              </Div2>
            </React.Fragment>
          )}
          {tier === "PAID" || newSub ? (
            BiAnnually ? (
              <React.Fragment>
                <Div>
                  <h1>Hello, </h1>
                  <p>Your current and active plan is below</p>
                </Div>
                <Div2>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Bi-Annually</h2>
                      <h3>
                        <span>$49.99</span> every 6 months
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
                      {console.log("DATA", data)}
                      {console.log(
                        "Next Billing Time",
                        data.databankUser.p_next_billing_time
                      )}
                      {data && data.databankUser.p_next_billing_time ? (
                        <p>
                          Your subscription will expire on{" "}
                          {new Date(
                            parseInt(data.databankUser.p_next_billing_time)
                          ).toDateString()}
                        </p>
                      ) : (
                        <ContinueButton2
                          onClick={handleSubscriptionCancellation}
                        >
                          Cancel Subscription
                        </ContinueButton2>
                      )}
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                </Div2>
              </React.Fragment>
            ) : null
          ) : (
            <React.Fragment>
              <Div>
                <h1>Need More Data?</h1>
                <P>Upgrade to our paid plan to access all material.</P>
              </Div>
              <Div2>
                <UserTypeContainerDiv>
                  <div>
                    <h1>Premium Account</h1>
                  </div>
                  <ul className="features-list">
                    <li className="features-item">Create an account</li>
                    <li className="features-item">Change data filters</li>
                    <li className="features-item">Download data into csv</li>
                    <li className="features-item">Additional filter options</li>
                    <li className="features-item">Filter data by date</li>
                  </ul>
                </UserTypeContainerDiv>
              </Div2>
            </React.Fragment>
          )}
          {tier === "PAID" || newSub ? (
            Yearly ? (
              <React.Fragment>
                <Div>
                  <h1>Hello, </h1>
                  <p>Your current and active plan is below</p>
                </Div>
                <Div2>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Anually</h2>
                      <h3>
                        <span>$89.99</span> every year
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
                      {console.log("DATA", data)}
                      {console.log(
                        "Next Billing Time",
                        data.databankUser.p_next_billing_time
                      )}
                      {data && data.databankUser.p_next_billing_time ? (
                        <p>
                          Your subscription will expire on{" "}
                          {new Date(
                            parseInt(data.databankUser.p_next_billing_time)
                          ).toDateString()}
                        </p>
                      ) : (
                        <ContinueButton2
                          onClick={handleSubscriptionCancellation}
                        >
                          Cancel Subscription
                        </ContinueButton2>
                      )}
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                </Div2>
              </React.Fragment>
            ) : null
          ) : (
            <React.Fragment>
              <Div>
                <h1>Need More Data?</h1>
                <P>Upgrade to our paid plan to access all material.</P>
              </Div>
              <Div2>
                <UserTypeContainerDiv>
                  <div>
                    <h1>Premium Account</h1>
                  </div>
                  <ul className="features-list">
                    <li className="features-item">Create an account</li>
                    <li className="features-item">Change data filters</li>
                    <li className="features-item">Download data into csv</li>
                    <li className="features-item">Additional filter options</li>
                    <li className="features-item">Filter data by date</li>
                  </ul>
                </UserTypeContainerDiv>
              </Div2>
            </React.Fragment>
          )}
        </AccountPageDiv>
      ) : (
        (tier === "FREE") | (tier === "ADMIN") && (
          <AccountPageDiv>
            {tier === "FREE" ? (
              <>
                <Div>
                  <h1>Need more data?</h1>
                  <p>
                    Upgrade to one of our paid payment plans to access all
                    material
                  </p>
                </Div>
                <Div2>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Free Account</h1>
                      <span>Free</span>
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
                          <CrossSVG />
                          Download Data into Excel
                        </li>
                        <li className="features-item">
                          <CrossSVG />
                          Additional Filter Options
                        </li>
                        <li className="features-item">
                          <CrossSVG />
                          Filter Data by date
                        </li>
                      </ul>
                    </FeaturedItems>
                    <ButtonDiv>
                      <ContinueButton2 type="submit" onClick={handleSubmit}>
                        Continue
                      </ContinueButton2>
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Monthly</h2>
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
                      <MonthlyButton />
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Bi-Annually</h2>
                      <h3>
                        <span>$49.99</span> every 6 months
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
                      <BiAnnuallyButton />
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Anually</h2>
                      <h3>
                        <span>$89.99</span> every year
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
                      <YearlyButton />
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                </Div2>
              </>
            ) : (
              <>
                <Div>
                  <h1>Sauti Databank Admin</h1>
                  <P>Current user type offerings.</P>
                </Div>
                <Div2>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Free Account</h1>
                      <span>Free</span>
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
                          <CrossSVG />
                          Download Data into Excel
                        </li>
                        <li className="features-item">
                          <CrossSVG />
                          Additional Filter Options
                        </li>
                        <li className="features-item">
                          <CrossSVG />
                          Filter Data by date
                        </li>
                      </ul>
                    </FeaturedItems>
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Monthly</h2>
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
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Bi-Annually</h2>
                      <h3>
                        <span>$49.99</span> every 6 months
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
                  </UserTypeContainerDiv>
                  <UserTypeContainerDiv>
                    <PlanHeader>
                      <h1>Premium</h1>
                      <h2>Anually</h2>
                      <h3>
                        <span>$89.99</span> every year
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
                  </UserTypeContainerDiv>
                </Div2>
              </>
            )}
          </AccountPageDiv>
        )
      )}
    </>
  );
}

export default DashAccount;

function formatDate(date) {
  return new Date(date).toDateString();
}

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
