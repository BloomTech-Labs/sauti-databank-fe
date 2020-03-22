import React, { useEffect } from "react";
import MonthlyAccount from "./MonthlyAccount";
import BiAnnuallyAccount from "./BiAnnuallyAccount";
import YearlyAccount from "./YearlyAccount";
import { AccountPage } from "./styledComponents/DashAccount";
import CheckMarkSVG from "./Images/CheckMarkSVG";
import CrossSVG from "./Images/CrossSVG";
import { urlPageView } from "./GoogleAnalytics/index";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "./auth/Auth";
import MonthlyButton from "../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../Components/Paypal/BiannuallyButton";
import YearlyButton from "../Components/Paypal/YearlyButton";
import StandAloneButton from "../Components/Paypal/Standalone";
import UndrawOptionsSVG from "./Images/undrawOptionsSVG";
import UndrawInvestmentSVG from "./Images/undrawInvestmentSVG";
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

  // const renderAccounts = () => {
  //   if (Monthly) {
  //     return (
  //       <div>
  //         <MonthlyAccount
  //           data={data}
  //           handleSubscriptionCancellation={handleSubscriptionCancellation}
  //         />
  //       </div>
  //     );
  //   } else if (BiAnnually) {
  //     return (
  //       <BiAnnuallyAccount
  //         data={data}
  //         handleSubscriptionCancellation={handleSubscriptionCancellation}
  //       />
  //     );
  //   } else if (Yearly) {
  //     return (
  //       <YearlyAccount
  //         data={data}
  //         handleSubscriptionCancellation={handleSubscriptionCancellation}
  //       />
  //     );
  //   }
  // };

  //   <React.Fragment>
  //   <Div>
  //     <h1>Need More Data?</h1>
  //     <P>Upgrade to our paid plan to access all material.</P>
  //   </Div>
  //   <Div2>
  //     <UserTypeContainerDiv>
  //       <div>
  //         <h1>Premium Account</h1>
  //       </div>
  //       <ul className="features-list">
  //         <li className="features-item">Create an account</li>
  //         <li className="features-item">Change data filters</li>
  //         <li className="features-item">Download data into csv</li>
  //         <li className="features-item">Additional filter options</li>
  //         <li className="features-item">Filter data by date</li>
  //       </ul>
  //     </UserTypeContainerDiv>
  //   </Div2>
  // </React.Fragment>

  // {tier === "PAID" || newSub

  return (
    <AccountPage>
      {tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
        <div>{tier}</div>
      ) : (
        (tier === "FREE") | (tier === "ADMIN") && (
          <>
            {tier === "FREE" ? (
              <div className="container">
                <div className="header-container">
                  <div className="header-row">
                    <div className="header-row-col">
                      <UndrawOptionsSVG />
                    </div>
                    <div className="header-row-col">
                      <h1>Need more data?</h1>
                      <span>
                        We know how important data filtering is to your research
                      </span>
                      <span>
                        Upgrade to our paid plan to access all material
                      </span>
                    </div>
                    <div className="header-row-col">
                      <UndrawInvestmentSVG />
                    </div>
                  </div>
                </div>
                <div className="account-container">
                  <div className="account-row">
                    <div className="account-row-col">
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Free Account</h2>
                          <h1>Free</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Can create an account</span>
                            <span>Access base app</span>
                            <span>Cross-filter data</span>
                          </div>
                        </div>
                        <div className="account-bottom">
                          <div className="account-bottom-btn-ctn">
                            <button type="submit" onClick={handleSubmit}>
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$10/monthly</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                        <div className="account-bottom">
                          <MonthlyButton />
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      {" "}
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$49.99/bi-anually</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                        <div className="account-bottom">
                          <BiAnnuallyButton />
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      {" "}
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$89.99/yearly</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                        <div className="account-bottom">
                          <YearlyButton />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="header-container">
                  <div className="header-row">
                    <div className="header-row-col admin">
                      <h1>Sauti Databank Admin</h1>
                      <span>Below is the current user offerings</span>
                    </div>
                  </div>
                </div>
                <div className="account-container">
                  <div className="account-row">
                    <div className="account-row-col">
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Free Account</h2>
                          <h1>Free</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Can create an account</span>
                            <span>Access base app</span>
                            <span>Cross-filter data</span>
                          </div>
                        </div>
                        <div className="account-bottom">
                          <div className="account-bottom-btn-ctn"></div>
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$10/monthly</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      {" "}
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$49.99/bi-anually</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="account-row-col">
                      {" "}
                      <div className="account-type">
                        <div className="account-header">
                          <h2>Premium Account</h2>
                          <h1>$89.99/yearly</h1>
                        </div>
                        <div className="account-features">
                          <div className="account-features-items">
                            <span>Download data into an excel file</span>
                            <span>Cross-Filter data by date</span>
                            <span>Additional filtering</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}
    </AccountPage>
  );
}

export default DashAccount;

function formatDate(date) {
  return new Date(date).toDateString();
}
