import React from "react";
import { AccountPage } from "../styledComponents/DashAccount";
import MonthlyButton from "../../Components/Paypal/MonthlyButton";
import BiAnnuallyButton from "../../Components/Paypal/BiannuallyButton";
import YearlyButton from "../../Components/Paypal/YearlyButton";
import UndrawOptionsSVG from "../Images/undrawOptionsSVG";
import UndrawInvestmentSVG from "../Images/undrawInvestmentSVG";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { getToken, decodeToken, getSubscription } from "../auth/Auth";
import EditAccount from "./EditAccount";

// This components purpose is to potentially turn free users into paid users, capture the subscription ID, and push them to /data

const DashAccountFree = props => {
  const token = getToken();
  const history = useHistory();

  const tokenId = decodeToken(token);

  let tier;
  if (token) {
    tier = decodeToken(token);
    console.log(`token info:`, tier);
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

  const handleSubmit = async (e, input) => {
    e.preventDefault();
    history.push("/data");
  };

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

  return (
    <AccountPage>
      <div className="page-row">
        <div className="page-row-col-top">
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
                <span>Upgrade to our paid plan to access all material</span>
              </div>

              <div className="header-row-col">
                <UndrawInvestmentSVG />
              </div>
              <EditAccount data={tokenId} />
            </div>
          </div>
        </div>
        <div className="page-row-col-bottom">
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
                      <span>Can Create an Account</span>
                      <span>Access Base App</span>
                      <span>Change Data Filters</span>
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
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
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
                    <h1>$49.99/bi-annually</h1>
                  </div>
                  <div className="account-features">
                    <div className="account-features-items">
                      <span>Download data into an excel file</span>
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
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
                      <span>Change Data Filters</span>
                      <span>Cross-Filter Data by Date</span>
                      <span>Additional Filtering Options</span>
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
      </div>
      <EditAccount data={tokenId} />
    </AccountPage>
  );
};

export default DashAccountFree;
