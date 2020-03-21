import React, { useEffect } from "react";
import MonthlyAccount from "./MonthlyAccount";
import BiAnnuallyAccount from "./BiAnnuallyAccount";
import YearlyAccount from "./YearlyAccount";
import { device } from "./styledComponents/responsive";
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
    <>
      {tier === "PAID" || tier === "GOV_ROLE" || newSub ? (
        <AccountPageDiv>
          <div>{tier}</div>
        </AccountPageDiv>
      ) : (
        (tier === "FREE") | (tier === "ADMIN") && (
          <AccountPageDiv>
            {tier === "FREE" ? (
              <>
                <Container>
                  <div className="header-container">
                    <div className="header-row">
                      <div className="header-row-col">
                        <UndrawOptionsSVG />
                      </div>
                      <div className="header-row-col">
                        <h1>Need more data?</h1>
                        <span>
                          We know how important data filtering is to your
                          research
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
                            {/* <MonthlyButton /> */}
                            <StandAloneButton />
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
                </Container>
              </>
            ) : (
              <>
                <Container>
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
                </Container>
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
  height: 100%;

  @media ${device.laptop} {
    height: 80%;
  }

  .header-container {
    padding: 2rem;
    height: 30%;

    @media ${device.laptopL} {
      height: 25%;
    }

    .header-row {
      display: flex;
      flex-direction: row;
      height: 100%;

      .header-row-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33.33%;
        height: 100%;
        box-sizing: border-box;

        h1 {
          color: #000000;
          letter-spacing: 0.01em;
          line-height: 8rem;
          font-size: 4vw;
          font-weight: bold;
        }

        span {
          color: #000000;
          line-height: 3.4rem;
          font-size: 1.4vw;
          font-weight: normal;
        }
      }

      .admin {
        width: 100%;
      }
    }
  }

  .account-container {
    margin-top: 3rem;
    height: 50rem;

    @media ${device.laptopL} {
      margin-top: 2rem;
      height: 45rem;
    }

    .account-row {
      display: flex;
      flex-direction: row;
      height: 100%;

      .account-row-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 100%;

        .account-type {
          width: 35rem;
          height: 100%;
          padding: 2%;
          box-sizing: border-box;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 5px;

          @media ${device.laptop} {
            width: 33rem;
          }

          @media ${device.laptopL} {
            width: 35rem;
          }

          .account-header {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 1rem;
            height: 20%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);

            h2 {
              font-size: 1.3vw;
              line-height: 2rem;
              font-weight: bold;
            }

            h1 {
              font-size: 2vw;
              line-height: 2rem;
              font-weight: normal;
            }
          }
          .account-features {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 50%;

            .account-features-items {
              display: flex;
              flex-direction: column;
              justify-content: center;

              span {
                font-size: 2rem;
                line-height: 5rem;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.5);
              }
            }
          }
          .account-bottom {
            text-align: center;
            height: 30%;

            .account-bottom-btn-ctn {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100%;
              button {
                height: 4rem;
                width: 12rem;
                font-size: 1.5rem;
                line-height: 1rem;
                font-weight: bold;
                color: #000000;
                background: #ffffff;
                border: 2px solid #11736c;
                box-sizing: border-box;
                border-radius: 2px;

                &:hover {
                  background-color: #11736c;
                  transition: 0.3s ease;
                  color: #ffffff;
                  cursor: pointer;
                }
              }
            }
          }
        }
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

const AccountPageDiv = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
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
`;

const P = styled.p`
  font-size: 3rem;
  opacity: 0.75;
`;
