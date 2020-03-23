import React, { useEffect, useState } from "react";
import { urlPageView } from "./GoogleAnalytics/index";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "./auth/Auth";
import PaypalButton from "../Components/PaypalButton";
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

  const [cancelledSub, setCancelledSub] = useState(false);
  useEffect(() => {
    if (cancelledSub) {
      // reload the page to show the user their subscription expiration date.
      window.location.reload();
    }
  }, [cancelledSub]);

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
      }
    }
  `;

  const { loading: fetching, error: err, data, refetch } = useQuery(
    GET_SUBSCRIPTION_ID,
    {
      variables: { userEmail: userEmail }
    }
  );

  if (data) {
    console.log("data billing time", data.databankUser);
  }
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
      // trigger a refresh of the page in a useEffect. This is to display to the user their subscription expiration date.
      setCancelledSub(true);
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

  return (
    <>
      {tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
        <AccountPageDiv>
          {tier === "PAID" || newSub ? (
            <>
              <Div>
                <H1>Need More Data?</H1>
                <P>Upgrade to our paid plan to access all material.</P>
              </Div>
              <Div2>
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
                    {console.log("DATA", data)}
                    {console.log(
                      "Next Billing Time",
                      data.databankUser.p_next_billing_time
                    )}
                    {data && data.databankUser.p_next_billing_time ? (
                      <p>
                        Your subscription will expire on{" "}
                        <Big>
                          {new Date(
                            parseInt(data.databankUser.p_next_billing_time)
                          ).toDateString()}
                        </Big>
                      </p>
                    ) : (
                      <ContinueButton2 onClick={handleSubscriptionCancellation}>
                        Cancel Subscription
                      </ContinueButton2>
                    )}
                  </ButtonDiv>
                </UserTypeContainerDiv>
              </Div2>
            </>
          ) : (
            <>
              <Div>
                <H1>Need More Data?</H1>
                <P>Upgrade to our paid plan to access all material.</P>
              </Div>
              <Div2>
                <UserTypeContainerDiv>
                  <div>
                    <H1>Premium Account</H1>
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
            </>
          )}
        </AccountPageDiv>
      ) : (
        (tier === "FREE") | (tier === "ADMIN") && (
          <AccountPageDiv>
            {tier === "FREE" ? (
              <>
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
                      <li className="features-item">
                        Additional filter options
                      </li>
                      <li className="features-item">Filter data by date</li>
                    </ul>
                    <ButtonDiv>
                      <PaypalButton />
                    </ButtonDiv>
                  </UserTypeContainerDiv>
                </Div2>
              </>
            ) : (
              <>
                <Div>
                  <H1>Sauti Databank Admin</H1>
                  <P>Current user type offerings.</P>
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
                      <li className="features-item">
                        Additional filter options
                      </li>
                      <li className="features-item">Filter data by date</li>
                    </ul>
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

export function formatDate(date) {
  return new Date(date).toDateString();
}

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
  height: 600px;
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
const Big = styled.big`
  color: #eb5e52;
  font-size: 2rem;
`;
